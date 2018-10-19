import Component from '@ember/component';
import layout from '../templates/components/g-map-directions-panel';
import { get } from '@ember/object';
/* global google */

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let origin = get(this, 'origin');
    let destination = get(this, 'destination');
    let travelMode = get(this, 'travelMode').toUpperCase() || 'WALKING';

    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    directionsService.route({
      origin,
      destination,
      travelMode
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        //
      }
    });
  }
});
