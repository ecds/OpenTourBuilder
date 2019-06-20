import Route from '@ember/routing/route';
// import { get } from '@ember/object';
import { inject as service } from '@ember/service';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  currentUser: service(),

  sessionAuthenticated() {
    this._super(...arguments);
    return this.get('currentUser').load();
  }
});
