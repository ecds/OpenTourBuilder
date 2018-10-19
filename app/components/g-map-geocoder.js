import Component from '@ember/component';
import layout from '../templates/components/g-map-geocoder';
import { get, set } from '@ember/object';

/* global google */

export default Component.extend({
  layout,
  location: null,

  didInsertElement() {
    set(this, 'locator', new google.maps.Geocoder)
  },

  didUpadteAttrs() {
    get(this, 'locator').geocode(
      {
        address: get(this, 'address')
      },
      function(result, status) {
        if (status === 'OK') {
          set(this, 'location', result[0].geometry.location);
        } else {
          // console.log(status)
        }
      }
    );
  }

});
