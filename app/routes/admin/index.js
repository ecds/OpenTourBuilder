import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  model() {
    if (this.get('currentUser.user.super')) {
      return RSVP.hash({
        tours: this.store.findAll('tour'),
        tourSets: this.store.findAll('tour-set')
      });
    } else {
      return RSVP.hash({
        tours: this.store.findAll('tour')
      });
    }
  }
});
