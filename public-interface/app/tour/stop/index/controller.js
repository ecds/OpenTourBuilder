import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class TourStopIndexController extends Controller {
  @service deviceOrientation;
  @service deviceContext;
  @service cookies;
}
