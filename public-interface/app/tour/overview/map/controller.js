import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TourOverviewMapController extends Controller {

  stopShowing = null;

  @action
  showInfo(tourStop) {
    this.set('stopShowing', tourStop);
  }
}
