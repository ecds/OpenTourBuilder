import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  _setActiveStop: task(function*(stops, stop, scrollTo = false) {
    stops.forEach(tourStop => {
      tourStop.setProperties({
        active: false
      });
    });
    stop.setProperties({
      active: 'true'
    });
    if (scrollTo) {
      const stopEl = document.getElementById(
        `${stop.get('stop.slug')}-${stop.get('stop.id')}`
      );
      stopEl.scrollIntoView();
      document.getElementById('stop-list').scrollTop = stopEl.offsetTop - 10;
    }
    yield timeout(300);
  }).drop(),

  actions: {
    setActiveStop(stops, stop, scrollTo = false) {
      this.get('_setActiveStop').perform(stops, stop, scrollTo);
    }
  }
});
