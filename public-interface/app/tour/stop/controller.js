import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TourStopController extends Controller {
  @service deviceContext;
  @service theme;

  @action
  gotToStop(slug) {
    if (!slug) return;
    this.transitionToRoute('tour.stop.index', slug);
  }

  @action
  gotToStopMap(slug) {
    this.transitionToRoute('tour.stop.map', slug);
  }
}
