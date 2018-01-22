import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Route.extend({
  gMap: service(),
  locationService: service(),
  cookies: service(),

  actions: {
    didTransition() {
      const cookieService = get(this, 'cookies');
      if (cookieService.read(`${get(this, 'tour')}-Allowed`) === 'yup') {
        get(this, 'gMap').getLocation();
        set(this, 'locationService.Allowed', true);
      } else if (cookieService.read(`${get(this, 'tour')}-Allowed`) === 'nope') {
        set(this, 'locationService.Allowed', false);
      } else {
        set(this, 'cookieService.Allowed', undefined);
      }
    },

    pesudoDrag(model) {
      this.transitionTo('tour.stop.map', model);
    },

    getLocation() {
      const cookieService = get(this, 'cookies');
      cookieService.write(`${get(this, 'model.tour.title')}-Allowed`, 'yup');
      get(this, 'gMap').getLocation();
      set(this, 'locationService.Allowed', true);
    },

    declineLocation() {
      const cookieService = get(this, 'cookies');
      cookieService.write(`${get(this, 'model.tour.title')}-Allowed`, 'nope');
      set(this, 'locationService.Allowed', false);
    }
  }
});
