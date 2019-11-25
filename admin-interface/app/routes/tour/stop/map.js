import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  geoLocation: service(),
  cookies: service(),

  actions: {
    // didTransition() {
    //   let cookieService = get(this, 'cookies');
    //   if (cookieService.read(`${get(this, 'tour')}-Allowed`) === 'yup') {
    //     get(this, 'gMap').getLocation();
    //     set(this, 'geoLocation.allowed', true);
    //   } else if (cookieService.read(`${get(this, 'tour')}-Allowed`) === 'nope') {
    //     set(this, 'geoLocation.allowed', false);
    //   } else {
    //     set(this, 'geoLocation.allowed', undefined);
    //   }
    // },

    pesudoDrag(model) {
      this.transitionTo('tour.stop.map', model);
    }
  }
});
