import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import MapUtil from '../../utils/google-maps';

export default class MobileStopRouteComponent extends Component {
  @service location;
  @service maps;

  mapUtil = MapUtil.create();

  directionsService = this.mapUtil.directionsService();
  directionsDisplay = this.mapUtil.directionsDisplay();

  @computed('location.clientLocation')
  get calcRoute() {
    this.directionsService.route(this.route, (response, status) => {
      if (status == 'OK') {
        return this.setDirections(response);
      }
      return false;
    });
    return true;
  }

  setDirections(response) {
    this.directionsDisplay.setDirections(response);
    this.directionsDisplay.setMap(this.maps.map);
    this.maps.set('route', this.directionsDisplay);
  }

  @computed('location.clientLocation')
  get route() {
    const parking = {
      location: {lat: this.args.stop.get('parking_lat'), lng: this.args.stop.get('parking_lng')},
      stopover: true
    };

    return {
      origin: this.location.clientLocation,
      destination: {lat: this.args.stop.get('lat'), lng: this.args.stop.get('lng')},
      travelMode: this.args.tour.mode.get('title'),
      waypoints: [parking]
    }

  }

  @action
  drawRoute() {
    this.mapUtil.clearFeatures(this.maps.features);
    let cords = this.args.stop.getProperties(['lat', 'lng', 'parking_lat', 'parking_lng']);
    this.maps.set('destination', {lat: cords.lat, lng: cords.lng});
    if (cords.parking_lat && cords.parking_lng) {
      this.maps.set('waypoints', [
        {
          location: { lat: cords.parking_lat, lng: cords.parking_lng },
          stopover: true
        }
      ])
    }
    this.maps.calcRoute();
  }
}
