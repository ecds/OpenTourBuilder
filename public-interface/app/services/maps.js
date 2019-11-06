import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'; 
import MapUtil from '../utils/google-maps';

// import MapUtil from '../utils/google-maps';

export default class ReaderService extends Service {
  @service location;
  @service locationPermissions;

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
  errorMessage = null;

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
      let errorMesg = null;

      switch(status) {
        case 'OK':
          this.showControls();
          return this.setDirections(response);
        case 'NOT_FOUND':
          errorMesg = 'The location was not found.';
          break;
        case 'ZERO_RESULTS':
        case 'MAX_ROUTE_LENGTH_EXCEEDED':
          errorMesg = `No ${this.travelMode} route could be found to the stop. Try a different mode.`;
          break;
        case 'MAX_WAYPOINTS_EXCEEDED':
          errorMesg = 'Too many stops between here and your destination.';
          break;
        case 'INVALID_REQUEST':
          errorMesg = 'Something is wrong with the location of this stop.';
          break;
        case 'OVER_QUERY_LIMIT':
          errorMesg = 'This is a popular tour and we have reached the limit allowed by Google. Please try again later.';
          break;
        case 'REQUEST_DENIED':
          errorMesg = 'This tour does not have permission to access the Google directions service. Someone needs to check the API key.';
          break;
        case 'UNKNOWN_ERROR':
        default:
          errorMesg = 'Getting directions failed and we did not get a reason. Please try again.';
      }
      errorMesg = `There was an error that was not your fault. ${errorMesg}`;
      this.set('errorMessage', errorMesg);
      this.removeRoute();
      this.setDirections(response);
      return false;
    });
    return true;
  }

  setDirections(directions) {
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
  if (!this.locationPermissions.locationAllowed) return;
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