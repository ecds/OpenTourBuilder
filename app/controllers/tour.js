import Controller from '@ember/controller';
import {
  get
} from '@ember/object';

export default Controller.extend({
  actions: {
    setActiveStop(stops, stop, scrollTo = false) {
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
          `${get(stop, 'stop.slug')}-${stop.id}`
        );
        stopEl.scrollIntoView();
        document.getElementById('stop-list').scrollTop = stopEl.offsetTop - 10;
      }
    }
  }
});
