import Route from '@ember/routing/route';
import { get } from '@ember/object';
/* global UIkit */

export default Route.extend({
  afterModel(tour) {
    get(this, 'theme').setTheme(get(tour, 'theme_title'));
  },

  actions: {
    closeOffCanvas(event) {
      UIkit.offcanvas(event.target).hide();
    }
  }
});
