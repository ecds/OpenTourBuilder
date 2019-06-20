import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import MapUtil from '../utils/google-maps';

export default class TourController extends Controller {
  @service deviceContext;
  @service theme;

  showStopGrid = false;

  mapUtil = MapUtil.create();

  @action
  toggleStopGrid(value) {
    this.set('showStopGrid', value);
  }

  @restartableTask
  setActiveStop = function*(stops, stop, scrollTo) {
    yield timeout(500);
    if (!this.deviceContext.isDesktop) return;
    stops.forEach(stop => {
      stop.setProperties({
        active: false
      });
      if (stop.marker) {
        this.mapUtil.deactivateMarker(stop);
      }
    });
    if (stop) {
      stop.setProperties({
        active: 'true'
      });
      if (stop.marker) {
        this.mapUtil.activateMarker(stop);
      }
    }
    if (scrollTo) {
      const stopEl = document.getElementById(
        `${stop.get('stop.slug')}-${stop.get('stop.id')}`
      );
      stopEl.firstElementChild.scrollIntoView();
      window.scrollBy(0, -80)
    }
    this.transitionToRoute('tour.stop', stop.slug)
    yield timeout(300);
  };
}
