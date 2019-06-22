import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import MapUtil from '../../utils/google-maps';

export default class MobileStopMapComponent extends Component {
  @service maps;
  @service location;

  mapUtil = MapUtil.create();

  @action
  createMap() {
    const center = this.args.stop.getProperties(['lat', 'lng']);
    const mapOptions = {
      center: {lat: this.args.stop.get('lat'), lng: this.args.stop.get('lng')},
      mapTypeId: this.args.tour.mapType
    }
    let map = this.maps.map;
    if (map) {
      this.mapUtil.clearFeatures(this.maps.features, this.maps.map);
    }

    map = this.mapUtil.createMap(mapOptions);
    this.maps.set('map', map);
    
    const stopMarker = this.mapUtil.addMarker(map, center);
    this.maps.features.push(stopMarker);

    if (this.args.stop.get('address')) {
      this.mapUtil.addInfoWindow(this.args.stop.get('address'), stopMarker, map);
    }


    const parkingCords = this.args.stop.getProperties(['parking_lat', 'parking_lng']);
    if (parkingCords.parking_lat && parkingCords.parking_lng) {
      const parkingMarker = this.mapUtil.addMarker(
        map,
        {
          lat: parkingCords.parking_lat,
          lng: parkingCords.parking_lng
        },
        true
      );
      this.maps.features.push(parkingMarker);
    }
  }
  
}
