import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  tenant: service(),

  beforeModel() {
    return this.get('currentUser').load();
  },

  actions: {
    didTransition() {
      get(this, 'tenant').setTenant();
    }
  }
});
