import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  geoLocation: service(),
  cookies: service(),
  tagName: '',

  didInsertElement() {
    this._super(...arguments);

    get(this, 'model.tour.slug');
    if (get(this, 'allowsLocation')) {
      this.send('getLocation');
    }
  },

  willDestroy() {
    console.log('destroy!!!!');
    this.get('geoLocation').clearLocation();
  },

  allowsLocation: computed('', function() {
    if (
      get(this, 'cookies').read(`${get(this, 'model.tour.slug')}-Allowed`) ===
      'yup'
    ) {
      return true;
    } else if (
      get(this, 'cookies').read(`${get(this, 'model.tour.slug')}-Allowed`) ===
      'nothanks'
    ) {
      return false;
    }
    return undefined;
  }),

  actions: {
    getLocation() {
      // get(this, 'geoLocation');
      get(this, 'cookies').write(
        `${get(this, 'model.tour.slug')}-Allowed`,
        'yup'
      );
      this.get('geoLocation').getClientPosition();
      set(this, 'allowsLocation', true);
    },

    declineLocation() {
      get(this, 'cookies').write(
        `${get(this, 'model.tour.slug')}-Allowed`,
        'nothanks'
      );
      get(this, 'allowsLocation');
      set(this, 'allowsLocation', false);
    }
  }
});
