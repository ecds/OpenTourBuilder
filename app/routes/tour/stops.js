import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { later } from '@ember/runloop';

export default Route.extend({
  actions: {
    goToStop(stop) {
      this.transitionTo('tour.stop', stop.stop.slug);
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
            stop.stop.setProperties({
              previous: stop.previous,
              next: stop.next
            });
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
