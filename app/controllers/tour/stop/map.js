import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  locationService: service(),
  gMap: service(),
  showDirections: false,
  modes: null,

  init() {
    this._super(...arguments);
    set(this, 'modes', get(this, 'store').peekAll('mode'));
  }
});
