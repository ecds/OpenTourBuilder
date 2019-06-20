import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  videoProviders: service(),
  videoCode: null,
  tagName: 'form',
  model: null,

  videoPreview: {},

  actions: {
    getVideo(code) {
      this.get('videoProviders').getEmbed(code);
    },

    addVideo() {
      this.save.perform(this.videoCode, this.model);
      this.set('videoCode', null);
      this.get('videoProviders').clear();
    }
  }
});
