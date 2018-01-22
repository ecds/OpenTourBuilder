import Service from '@ember/service';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Service.extend({
  cookies: service(),
  gMap: service(),
  tour: null,

  init() {
    this._super(...arguments);
  },

  Allowed: computed('Declined', 'Acknowledged', function() {
    const cookieService = get(this, 'cookies');
    if (cookieService.read(`${get(this, 'tour')}-Allowed`) === 'yup') {
      get(this, 'gMap').getLocation();
      return true;
    }

    return false;
  }),

  Declined: computed('Allowed', 'Acknowledged', function() {
    const cookieService = get(this, 'cookies');
    if (cookieService.read(`${get(this, 'tour')}-Allowed`) === 'nope') {
      return true;
    }

    return false;
  }),

  Acknowledged: computed.or('Allowed', 'Declined')

});
