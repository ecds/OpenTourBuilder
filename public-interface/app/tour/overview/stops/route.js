import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { timeout } from 'ember-concurrency';
import { enqueueTask } from 'ember-concurrency-decorators';

export default class TourOverviewStopsRoute extends Route {
  @service fastboot;

  @enqueueTask
  stopEnter = function*(stop) {
    stop.stop.setProperties({
      show: true
    });
    yield timeout(300);
  };

  @action
  goToStop(stop) {
    this.transitionTo('tour.stop', stop);
  }
  
  @action
  didTransition() {
    if (this.fastboot.isFastBoot) return;
    this.modelFor('tour').sortedStops.forEach((stop) => {
      if (!stop.isDestroyed) {
        this.stopEnter.perform(stop);
      }
    });
  }

  @action
  willTransition() {
    this.modelFor('tour').sortedStops.forEach((stop) => {
      if (!stop.isDestroyed) {
        stop.stop.setProperties({
          show: false
        })
      }
    });
  }

  @action
  gotToStop(stop) {
    this.transitionToRoute('stop', stop)
  }
}
