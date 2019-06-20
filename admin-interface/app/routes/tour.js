import Route from '@ember/routing/route';
/* global UIkit */

export default Route.extend({
  model(params) {
    return this.store.queryRecord('tour', { slug: params.tour_slug });
  },

  afterModel(tour) {
    this.get('theme').setTour(tour);
  },

  actions: {
    closeOffCanvas(event) {
      UIkit.offcanvas(event.target).hide();
    }
  }
});
