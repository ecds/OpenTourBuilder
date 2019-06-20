import EmberRouter from "@ember/routing/router";
import config from "./config/environment";
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend({
  fastboot: service(),
  location: config.locationType,
  rootURL: '/'
});

Router.map(function() {
  this.route('tours', {
    path: ':tenant/'
  })
  this.route('tour', {
   path: ':tenant/:tour_slug'
  }, function() {
    this.route('stop', {
      path: ':stop_slug'
    }, function() {
      this.route('map');
    });
    this.route('flat-page', {
      path: 'page/:page_id'
    });
    this.route('overview', {
      path: '/'
    }, function() {
      this.route('map');
      this.route('stops');
    });
  })
  this.route('tours');

  this.route('controller', function() {});
});

export default Router;
