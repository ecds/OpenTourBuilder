import Ember from 'ember';
import ENV from '../config/environment';

const { Service, computed, get, inject: { service } } = Ember;

export default Service.extend({
    fastboot: service(),
    init() {
        this._super(...arguments);
        this.setProperties({
            domain: get(this, 'fastboot.isFastBoot')
                    ? computed(() => get(this, 'fastboot.request.host').split('.').shift())
                    : ENV.sub
                        ? computed(() => ENV.sub)
                        : computed(() => location.hostname.split('.').shift())
        });
    }
});
