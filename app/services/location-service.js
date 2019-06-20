import Service from '@ember/service';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Service.extend({
  cookies: service(),
  geoLocation: service(),
  tour: null,

  init() {
    this._super(...arguments);
  },

  allowed: computed('Declined', 'Acknowledged', function() {
    let cookie = get(this, 'cookies').read(`${get(this, 'tour')}-Allowed`);
    if (cookie === 'yup') {
      get(this, 'geoLocation').getLocation();
      return true;
    } else if (cookie === 'nope') {
      return false;
    }
    return undefined;
  }),

  setAllowed(title) {
    get(this, 'cookies').write(`${title}-Allowed`, 'yup');
  }
});
