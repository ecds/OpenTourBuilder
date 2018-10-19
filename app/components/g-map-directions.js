import GMapBase from 'ember-g-map/components/g-map-base';
import { get, set } from '@ember/object';
/* global google */

export default GMapBase.extend({
  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    let route = {
      origin: { lat: get(this, 'origin_lat'), lng: get(this, 'origin_lng') },
      destination: { lat: get(this, 'destination_lat'), lng: get(this, 'destination_lng') },
      travelMode: get(this, 'travelMode') || 'WALKING'
    }

    if (get(this, 'waypoint_lat') && get(this, 'waypoint_lng') && get(this, 'travelMode') === 'DRIVING') {
      route['waypoints'] = [ { location: { lat: get(this, 'waypoint_lat'), lng: get(this, 'waypoint_lng') }, stopover: true } ];
    }
    let map = get(this, 'parentComponent').feature;
    set(this, 'feature', directionsDisplay);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    directionsService.route(route, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        //
      }
    });

    return get(this, 'feature');

  },

  didUpdateAttrs() {
    this.feature.setMap(null);
    this.feature.setPanel(null);
    this.createFeature();
    return get(this, 'travelMode');
  },

  updateRoute() {
    // console.log(get(this, 'travelMode'));
  }
});
