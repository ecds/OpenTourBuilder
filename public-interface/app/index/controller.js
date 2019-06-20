import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default class IndexController extends Controller {
  @service deviceContext;

  remoteHost = ENV.APP.API_HOST;

  _tourSorting = Object.freeze(['position:asc']);

  @sort('model', '_tourSorting')
  sortedTours;

}
