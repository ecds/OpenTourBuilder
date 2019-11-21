import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  tenant: service(),
  beforeModel() {
    this.tenant.setTenant();
  },

  model() {
    return this.store.queryRecord('tour-set', { subdir: this.tenant.tenant });
  }
});
