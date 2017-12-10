import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

export default Route.extend({
  model() {
    return this.store.findAll('tour');
  },

  afterModel(stops /* , transition */ ) {
    stops.forEach( (stop, index) => {
      run.later(this, () => {
        if (!stop.isDestroyed) {
          stop.setProperties({
            show: true,
            classList: 'enter'
          });
        }
      }, 300 * index);
    });
  }
});
