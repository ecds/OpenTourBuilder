import EmberRouter from '@ember/routing/router';
import { computed } from '@ember/object';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  /** This is a little too complicated, but here we go.
    We set the root url to '/' if:
    1) The path is 'admin'
    2) There is no path - meaning going to public tenant
    3) The path is a number - meaning tour on public tenant
  */
  rootURL: computed('', () => {
    let path = window.location.pathname.replace(/\/$/, '').split('/')[1];
    if (path === 'admin' || path === 'login' || !path || parseInt(path)) {
      return '/';
    } else if (path) {
      return `/${path}/`;
    }
  })
});

Router.map(function() {
  this.route('index', {
    path: '/'
  });
  this.route(
    'tour',
    {
      path: '/:tour_id'
    },
    function() {
      this.route(
        'overview',
        {
          path: '/'
        },
        function() {
          this.route('stops');
          this.route('map');
        }
      );
      this.route(
        'stop',
        {
          path: ':stop_id'
        },
        function() {
          this.route('map');
        }
      );
    }
  );
  this.route(
    'admin',
    {
      path: '/admin/'
    },
    function() {
      this.route(
        'tours',
        {
          path: '*/tours'
        },
        function() {
          this.route('new');
          this.route('edit', {
            path: 'edit/:tour_id'
          });
        }
      );
      this.route('stops', function() {
        this.route('new');
        this.route('edit', {
          path: 'edit/:stop_id'
        });
      });
      this.route('users');
    }
  );

  this.route('login', {
    path: '/login/'
  });
});

export default Router;
