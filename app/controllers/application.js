import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  orientation: service(),
  session: service(),

  init() {
    this._super(...arguments);
    // this.get('tenant').setTenant();
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
