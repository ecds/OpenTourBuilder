import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TourOverviewStopsController extends Controller {
  @action
  goToStop(stopSlug) {
    this.transitionToRoute('tour.stop', stopSlug)
  }
}
