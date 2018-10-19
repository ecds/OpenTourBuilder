import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  tenant: service(),

  beforeModel(transisition) {
    if (transisition.intent.hasOwnProperty('contexts')) {
      get(this, 'tenant').setTenantFromContext(transisition.intent.contexts);
    } else {
      get(this, 'tenant').setTenant(transisition.intent.url);
    }
  },

  model() {
    return this.store.findAll('tour');
  },

  actions: {
    delete(model) {
      this.store
        .findRecord('tour', model.id, { backgroundReload: false })
        .then(tour => {
          tour.destroyRecord();
        });
      // this.store.destroyRecord('tour', model);
    }
  }
});
