import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  model() {
    if (this.get('currentUser.user.super')) {
      return this.store.findAll('user');
    }
    return this.get('currentUser.user.tours');
  }
});
