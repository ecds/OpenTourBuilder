import Controller from '@ember/controller';
import { get, set } from '@ember/object';

export default Controller.extend({
  showDirections: false,
  modes: null,

  init() {
    this._super(...arguments);
    set(this, 'modes', get(this, 'store').peekAll('mode'));
  }
});
