import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import { get } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Route.extend({
  model() {
    return  this.store.findAll('tour');
  },

  afterModel(model) {
    if (model.content.length === 1) {
      this.transitionTo('tour.overview', model.content[0].id)
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('index').set('toursSorting', ['position']);
    if (get(this.controller, 'sortedTours') === undefined) {
      this.controllerFor('index').set('sortedTours', sort('model', 'toursSorting'));
    }
  },

  actions: {
    didTransition() {
      let sortedTours = get(this.controller, 'sortedTours');
      sortedTours.forEach( (tour, index) => {
        tour.setProperties({
          show: false
        });
        run.later(this, () => {
          if (!tour.isDestroyed) {
            tour.setProperties({
              show: true
            });
          }
        }, 300 * index);
      });
    }
  }
});
