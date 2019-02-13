import Route from '@ember/routing/route';
import { get } from '@ember/object';
/* global UIkit */

export default Route.extend({
  model(params) {
    return this.store.findRecord('tour', params.tour_id);
  },

  afterModel(tour) {
    get(this, 'theme').setTheme(get(tour, 'theme_title'));
  },

  actions: {
    closeOffCanvas(event) {
      UIkit.offcanvas(event.target).hide();
    }
  }
});
