/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    hinting: false,
    'ember-cli-babel': {
      includePolyfill: true
    },

    'ember-composable-helpers': {
      only: ['toggle', 'next', 'pipe']
    },

    emberCliDropzonejs: {
      includeDropzoneCss: false
    }
  });

  app.import('node_modules/scrollama/build/scrollama.min.js');
  app.import('node_modules/jodit/build/jodit.min.js');

  return app.toTree();
};
