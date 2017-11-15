import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route('tours');
    this.route('tour', {
        path: '/tour/:tour_id'
    }, function() {
        this.route('stop', {
            path: '/stop/:stop_id'
        });
    });
});

export default Router;
