import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  windoc: service(),
  tagName: '',
  markers() {
    return get(this, 'stops')
  }
});
