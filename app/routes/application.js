import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import { get } from '@ember/object';

export default Route.extend({
  // theme: service(),
  splashSreenService: service('ember-cordova/splash'),

  // setupController(controller, model) {
  //     this._super(controller, model);
  //     this.controllerFor('application').set('theme', this.get('theme'));
  // },

  afterModel() {
    // get(this, 'splashScreenService').hide();
  }
});
