import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default Controller.extend({
  tenant: service(),
  baseUrl: ENV.APP.API_HOST,

  actions: {
    newTourSet() {
      this.store.createRecord('tour-set', { name: 'foo' });
    }
  }
});
