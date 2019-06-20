import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LocationPermissionsService extends Service {
  @service cookies;
  @service tenant;
  @service location;

  get locationAllowed() {
    return this.cookies.read(this.getLocationCookie) == 'yup' ? true : false;
  }

  get updateLocationAllowed() {
    return this.cookies.read(this.updateLocationCookie) == 'yup' ? true : false;
  }

  tour = this.tour || null;
  
  setTour(tour) {
    this.tour = tour;
  }

  @computed('tour')
  get getLocationCookie() {
    return this.tour != null ? `${this.tour.get('slug')}-${this.tour.get('id')}-Location-Allowed` : null;
  }

  @computed('tour')
  get updateLocationCookie() {
    return this.tour != null ? `${this.tour.get('slug')}-${this.tour.get('id')}-Update-Location-Allowed` : null;
  }

  get getLocationSet() {
    return this.cookies.read(this.getLocationCookie) ? true : false;
  }

  get updateLocationSet() {
    return this.cookies.read(this.updateLocationCookie) ? true : false;
  }

  setLocationAllowed(allow) {
    if (allow) {
      this.cookies.write(this.getLocationCookie, 'yup', { path: `/${this.tenant.currentTenant}` });
      this.location.getLocation();
    } else {
      this.cookies.write(this.getLocationCookie, 'nope', { path: `/${this.tenant.currentTenant}` });
      this.location.clearLocation();
    }
  } 

  setUpdateLocationAllowed(allow) {
    if (allow) {
      this.cookies.write(this.updateLocationCookie, 'yup', { path: `/${this.tenant.currentTenant}` });
      this.location.startLocationWatcher();
    } else {
      this.cookies.write(this.updateLocationCookie, 'nope', { path: `/${this.tenant.currentTenant}` });
      this.location.stopLocationWatcher();
    }
  }

}
