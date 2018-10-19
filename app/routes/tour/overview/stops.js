import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { later } from '@ember/runloop';

export default Route.extend({
  // model(params) {
  //   return this.store.findRecord('tour', params.tour_id);
  // },

  actions: {
    goToStop(stop) {
      this.transitionTo('tour.stop', stop);
    },

    didTransition() {
      let stops = get(this.currentModel, 'sortedTourStops');
      stops.forEach((stop, index) => {
        later(
          this,
          () => {
            if (!stop.isDestroyed) {
              get(stop, 'stop').setProperties({
                show: true,
                classList: 'enter'
              });
            }
          },
          300 * index
        );
      });
    },

    willTransition() {
      let stops = get(this.currentModel, 'stops');
      stops.forEach(stop => {
        stop.setProperties({
          show: false
        });
      });
    }
  }
});
