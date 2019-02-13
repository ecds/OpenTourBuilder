import GMapBase from 'ember-g-map/components/g-map-base';
/* global google */

export default GMapBase.extend({
  start_address: null,
  firstStep: null,
  createFeature() {
    if (this.isFastBoot) return;

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();

    let route = this.routeRequest();
    route.waypoints = this.setWaypoints();

    let map = this.parentComponent.feature;
    this.set('feature', directionsDisplay);

    directionsService.route(route, (response, status) => {
      if (status === 'OK') {
        let firstStep =
          response.routes.firstObject.legs.firstObject.steps.firstObject
            .instructions;
        console.log('first', firstStep);
        if (this.nextStep !== firstStep) {
          this.set('nextStep', firstStep);
          this.set(
            'start_address',
            response.routes[0].legs.lastObject.start_address
          );
          directionsDisplay.setMap(map);
          document.getElementById('directions-panel').innerHTML = '';
          directionsDisplay.setPanel(
            document.getElementById('directions-panel')
          );
        } else {
          console.log('direction did not change');
        }
        directionsDisplay.setDirections(response);
      }
    });

    return this.get('feature');
  },

  routeRequest() {
    return {
      origin: { lat: this.origin_lat, lng: this.origin_lng },
      destination: {
        lat: this.destination_lat,
        lng: this.destination_lng
      },
      travelMode: this.travelMode || 'WALKING'
    };
  },

  setWaypoints() {
    if (
      this.waypoint_lat &&
      this.waypoint_lng &&
      this.travelMode === 'DRIVING'
    ) {
      return [
        {
          location: {
            lat: this.waypoint_lat,
            lng: this.waypoint_lng
          },
          stopover: true
        }
      ];
    }
  },

  didUpdateAttrs() {
    this.feature.setMap(null);
    this.feature.setPanel(null);
    this.createFeature();
    return this.travelMode;
  },

  updateRoute() {
    console.log(get(this, 'travelMode'));
  }
});
