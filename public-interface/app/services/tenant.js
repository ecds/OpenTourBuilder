import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default class TenantService extends Service {
  @service fastboot;

  @computed('path')
  get currentTenant() {
    if (ENV.APP.TENANT) {
      return ENV.APP.TENANT
    }
    else if (this.fastboot.isFastBoot) {
      return this.fastboot.request.path.split('/')[1];
    }
    return window.location.pathname.split('/')[1];
  }
}
