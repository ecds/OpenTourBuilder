import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { timeout } from 'ember-concurrency';
import { dropTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
// import UIkit from 'uikit';

export default class LocationService extends Service {
  @service fastboot;
  @service cookies;
  @service locationPermissions;
  @service maps;

  @tracked clientLocation = null;
  @tracked watcherId = null;
  @tracked locationPermissionSet = false;
  @tracked isFastBoot = this.fastboot.isFastBoot;
  @tracked errorMessage = null;

  tour = this.tour || null;

  get geoOptions() {
    return {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 30000
    };
  }

  @computed('clientLocation', 'errorMessage')
  get status() {
    if (this.errorMessage) {
      return this.errorMessage;
    }
    else if (!this.clientLocation.lat) {
      return 'Locating...';
    }
    return false;
  }

  @dropTask
  updateLocation = function*(location) {
    if (this.isFastBoot || !this.locationPermissions.locationAllowed) return false;
    if (this.clientLocation && this.clientLocation.lat == location.coords.latitude && this.clientLocation.lng == location.coords.longitude) return;
    this.clientLocation = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    };
    this.errorMessage = null;
    yield timeout(5000);
    this.maps.calcRoute();
  }

  getLocation() {
    if (this.fastboot.isFastBoot || !this.locationPermissions.locationAllowed) return;
    navigator.geolocation.getCurrentPosition(
      location => {
        this.updateLocation.perform(location, true);
      }, error => {
        this.errorMessage = error.message;
      },
      this.geoOptions
    )
  }

  startLocationWatcher() {
    // TODO handel notSupported
    if (this.fastboot.isFastBoot) return false;
    if (!('geolocation' in navigator)) return this.notSupported();
    if (!this.watcherId) {
      this.watcherId = navigator.geolocation.watchPosition(
        location => {
          this.updateLocation.perform(location);
        }, error => {
          this.errorMessage = error.message
        },
        this.geoOptions
      )
    }
  }

  stopLocationWatcher() {
    navigator.geolocation.clearWatch(this.watcherId);
    this.watcherId = null;
  }

  clearLocation() {
    if (this.watcherId) this.stopLocationWatcher();
    this.clientLocation = null;
  }
}
