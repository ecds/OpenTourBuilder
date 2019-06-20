import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  session: service(),

  actions: {
    logOut() {
      get(this, 'session').invalidate();
    }
  }
});
