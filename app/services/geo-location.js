import { reads } from '@ember/object/computed';
import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Service.extend({
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  clientLat: null,
  clientLng: null,
  setLat: null,
  setLng: null,
  watcherId: null,
  clientPositionError: null,
  location: null,
  diff: 0,

  distance(newPosition) {
    console.log(newPosition);
    /*
     Thanks: https://stackoverflow.com/a/21623206
    */
    let lat2 = newPosition.coords.latitude;
    let lng2 = newPosition.coords.longitude;
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - this.clientLat) * p) / 2 + c(this.clientLat * p) * c(lat2 * p) * (1 - c((lng2 - this.clientLng) * p)) / 2;

    return 7947.1854 * Math.asin(Math.sqrt(a));
  },

  geoOptions: {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: 30000
  },

  init() {
    this._super(...arguments);
    if (this.get('isFastBoot')) {
      return;
    }

    // if (get(this))
  },

  clientPosition: computed(
    'clientLat',
    'clientLng',
    'clientPositionError',
    function() {
      if (this.get('isFastBoot')) {
        return;
      }
      return {
        lat: get(this, 'clientLat'),
        lng: get(this, 'clientLng'),
        error: get(this, 'clientPositionError')
      };
    }
  ),

  updateLocation: task(function*(location) {
    console.log('update')
    yield timeout(5000);
    this.set('clientLat', location.coords.latitude);
    this.set('clientLng', location.coords.longitude);
  }),

  getClientPosition(mode) {
    this.set('mode', mode);
    // this.updateMode(mode);
    if (this.isFastBoot) return;
    if (isPresent(navigator.geolocation) && typeof FastBoot === 'undefined') {
      if (!this.watcherId) {
        this.set(
          'watcherId',
          navigator.geolocation.watchPosition(
            location => {
              this.get('updateLocation').perform(location);
            },
            error => {
              // TODO add "try again" button if it times out?
              // if error.message.toLowerCase().includes('timeout')
              debug(`Location ERROR: ${error.message}`);
              this.set('clientPositionError', error.message);
            },
            this.geoOptions
          )
        );
        console.log(this.watcherId)
      }
    } else if (isPresent(navigator.geolocation) === false) {
      debug("Location ERROR: Your browser doesn't support geolocation.");
      set(
        this,
        'clientPositionError',
        "Location ERROR: Your browser doesn't support geolocation."
      );
    }
  },

  clearLocation() {
    console.log('clear')
    this.set('clientLat', null);
    this.set('clientLng', null);
    // Order matters here. We have to call `clearWatch` before
    // setting the `watcherId` to `null`.
    navigator.geolocation.clearWatch(this.watcherId);
    this.set('watcherId', null);
  },

  updateMode(mode) {
    this.set('mode', mode);
  }
});
