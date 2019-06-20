import Service from '@ember/service';
import { get } from '@ember/object';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      utterance: null,
      synth: null,
      text: null,
      speaking: false
    });
  },

  read(content) {
    let _utterance = get(this, 'utterance');
    _utterance.text = content;
    _utterance.lang = navigator.language;
    get(this, 'synth').speak(_utterance);
  },

  resume() {
    get(this, 'synth').resume();
  },

  pause() {
    get(this, 'synth').pause();
  },

  cancel() {
    get(this, 'synth').cancel();
  }
});
