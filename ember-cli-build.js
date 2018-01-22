/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },

    sassOptions: {
      includePaths: [
        // 'bower_components/animatewithsass'
      ]
    },

    'ember-composable-helpers': {
      only: ['toggle']
    }
  });

  // app.import('');

  return app.toTree();
};
