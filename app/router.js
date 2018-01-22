import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tour', {
    path: '/tour/:tour_id'
  }, function() {
    this.route('overview', {
      path: '/'
    }, function() {
      this.route('stops');
      this.route('map');
    });

    this.route('stop', {
      path: 'stop/:stop_id'
    }, function() {
      this.route('map');
    });
  });
  this.route('upload');
});

export default Router;
