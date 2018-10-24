import OtbCrudRoute from '../../otb-crud';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default OtbCrudRoute.extend({
  tenant: service(),

  beforeModel(transisition) {
    if (transisition.intent.hasOwnProperty('contexts')) {
      get(this, 'tenant').setTenantFromContext(transisition.intent.contexts);
    } else {
      get(this, 'tenant').setTenant(transisition.intent.url);
    }
  },

  model(params) {
    return this.store.findRecord('tour', params.tour_id);
  },

  actions: {
    doNothing() {
      return true;
    }
  }
});
