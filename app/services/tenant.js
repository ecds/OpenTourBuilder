import { get, computed } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default Service.extend({
  fastboot: service(),
  init() {
    this._super(...arguments);
    this.setProperties({
      domain: get(this, 'fastboot.isFastBoot')
        ? computed('domain', () => get(this, 'fastboot.request.host').split('.').shift())
        : ENV.sub
          ? computed('domain', () => ENV.sub)
          : computed('domain', () => location.hostname.split('.').shift())
    });
  }
});
