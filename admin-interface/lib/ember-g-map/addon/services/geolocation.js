import { reads } from '@ember/object/computed';
import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Service.extend({
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  clientLat: null,
  clientLng: null,
  clientPositionError: null,

  init() {
    this._super(...arguments);
    if (this.get('isFastBoot')) {
      return;
    }

    // if (get(this))
  },

  clientPosition: computed('clientLat', 'clientLng', 'clientPositionError', function() {
    if (this.get('isFastBoot')) {
      return;
    }
    return {
      lat: get(this, 'clientLat'),
      lng: get(this, 'clientLng'),
      error: get(this, 'clientPositionError')
    };
  }),

  getClientPosition() {
    if (this.get('isFastBoot')) {
      return;
    }
    if (isPresent(navigator.geolocation) && (typeof FastBoot === 'undefined')) {
      navigator.geolocation.getCurrentPosition((location) => {
        set(this, 'clientLat', location.coords.latitude);
        set(this, 'clientLng', location.coords.longitude);
      }, (error) => {
        debug(`GMap Location ERROR: ${error.message}`);
        set(this, 'clientPositionError', error.message);
      }, { enableHighAccuracy: true, timeout: 50000, maximumAge: 0 });
    } else if (isPresent(navigator.geolocation) === false) {
      debug('GMap Location EROOR: Your browser doesn\'t support geolocation.');
      set(this, 'clientPositionError', 'GMap Location EROOR: Your browser doesn\'t support geolocation.');
    }
  }
});
