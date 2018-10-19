import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import ENV from '../config/environment';

export default Component.extend({
  stop: null,
  store: service(),
  tenant: service(),

  endpoint: computed('', function() {
    return `https://${this.get('tenant.domain')}.${ENV.APP.API_HOST}/media`;
  }),

  actions: {
    setStop(stop) {
      this.set('stop', stop);
    },

    uploadImage() {
      // let photo = get(this, 'store').createRecord('medium', {
      //   title: file.name,
      //   original_image: file
      // });
      // photo.save().then(() => {
      //   file.id = photo.id;
      // });
    },

    uploadSuccess(file) {
      let response = JSON.parse(file.xhr.response);
      let store = get(this, 'store');
      store
        .peekRecord('medium', response.data.id, {
          backgroundReload: false
        })
        .then(media => {
          media.setProperties({
            title: file.name,
            original_image: file
          });
          media.save();
        });
    },

    deleteImage(file) {
      const response = JSON.parse(file.xhr.response);
      const store = get(this, 'store');
      store
        .findRecord('medium', response.data.id, { backgroundReload: false })
        .then(function(image) {
          image.destroyRecord();
        });
    }
  }
});
