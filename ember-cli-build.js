/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },

    // customEvents: {
    //   // add support for the paste event
    //   paste: 'stop',
    //   scroll: 'scroll'
    // },

    sassOptions: {
      includePaths: [
        // 'bower_components/animatewithsass'
      ]
    },

    'ember-composable-helpers': {
      only: ['toggle', 'next']
    },

    emberCliDropzonejs: {
      includeDropzoneCss: false
    }
  });

  app.import('node_modules/scrollama/build/scrollama.min.js');

  return app.toTree();
};
