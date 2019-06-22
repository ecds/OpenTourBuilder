import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'; 
import MapUtil from '../utils/google-maps';

// import MapUtil from '../utils/google-maps';

export default class ReaderService extends Service {
  @service location;

  mapUtil = MapUtil.create();

  directionsService = this.mapUtil.directionsService();
  directionsDisplay = this.mapUtil.directionsDisplay();

  map = null;
  features = [];
  destination = null;
  waypoints = [];
  controlElements = [];
  travelMode = 'WALKING';
  controls = [];

  @computed('destination', 'waypoints', 'origin', 'travelMode')
  get route() {
    let { travelMode, destination, waypoints } = this;
    if (travelMode != 'DRIVING') {
      waypoints = [];
    }
    return {
      origin: this.location.clientLocation,
      destination,
      waypoints,
      travelMode
    }
  }

  calcRoute() {
    this.directionsService.route(this.route, (response, status) => {
      if (status == 'OK') {
      this.showControls();
        return this.setDirections(response);
      }
      this.location.set('errorMessage', response.status);
      this.removeRoute();
      this.setDirections(response);
      return false;
    });
    return true;
  }

  setDirections(directions) {
    console.log(directions);
    this.directionsDisplay.setDirections(directions);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(document.getElementById('directions-panel'));
    this.map.addListener('idle', () => {
      this.directionsDisplay.setOptions({ preserveViewport: true });
    })
  }

  removeRoute() {
    this.directionsDisplay.setMap(null);
    this.addFeatures();
    this.hideControls();
    this.map.setCenter(this.features[0].position);
    this.map.setZoom(17);
  }

  addFeatures() {
    this.features.forEach(feature => {
      feature.setMap(this.map);
    });
  }

  showControls() {
    this.controlElements.forEach(control => {
      control.style.zIndex = 1;
    });
  }

  hideControls() {
    this.controlElements.forEach(control => {
      control.style.zIndex = -1;
    });
  }

  // constructor() {
  //   super(...arguments);
  // }


}