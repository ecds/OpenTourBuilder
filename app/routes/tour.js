import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
/* global UIkit */

export default Route.extend({
  theme: service(),

  model(params) {
    return this.store.findRecord('tour', params.tour_id)
  },

  afterModel(tour) {
    get(this, 'theme').setTheme(get(tour, 'theme.title'));
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // // Implement your custom setup after
    // this.controllerFor('tour').set('expandMap', true);
    // this.controllerFor('tour').set('expandVideo', true);
    // Ember.debug(this)
  },

  actions: {
    closeOffCanvas(event) {
      UIkit.offcanvas(event.target).hide();
    }
  }
});
