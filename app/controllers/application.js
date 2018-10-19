import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  tenant: service(),
  orientation: service(),
  session: service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
