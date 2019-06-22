'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'otb-public',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
        EMBER_NATIVE_DECORATOR_SUPPORT: true,
        EMBER_METAL_TRACKED_PROPERTIES: true,
        EMBER_GLIMMER_ANGLE_BRACKET_NESTED_LOOKUP: true,
        EMBER_GLIMMER_ANGLE_BRACKET_BUILT_INS: true,
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: ['opentour.emory.edu']
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['production'],
        config: {
          id: 'UA-51682905-15'
        }
      }
    ],

    contentSecurityPolicy: {
      'default-src': "'self'",
      'script-src': "'self' *",
      'font-src': "'self' fonts.googleapis.com fonts.gstatic.com",
      'connect-src': "'self' www.google-analytics.com",
      'img-src': "self",
      'style-src': "self",
      'media-src': "self"
    },

    'ember-google-maps': {
      region: 'US',
      protocol: 'https',
      version: '3.35',
      libraries: ['places'],
      client: ''
    },

    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'angle-down',
          'bars',
          'bicycle',
          'car',
          'chevron-left',
          'chevron-right',
          'directions',
          'headphones',
          'info-circle',
          'list',
          'map',
          'pause',
          'play-circle',
          'subway',
          'toggle-off',
          'toggle-on',
          'walking'
        ]
      }
    }
  };


  if (environment === 'development') {
    ENV.APP.API_HOST = 'https://api.opentour.emory.edu'
    ENV.fastboot.hostWhitelist.push('lvh.me:4200');
    ENV['ember-google-maps'].key = 'AIzaSyD-G_lDtvChv-P3nchtQYHoCLfFzn9ylr8'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    ENV.APP.API_HOST = 'https://api.opentour.emory.edu'
    ENV.fastboot.hostWhitelist.push('https://opentour.emory.edu')
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://api.opentour.emory.edu'
    ENV.fastboot.hostWhitelist.push('https://opentour.emory.edu')
    ENV.APP.HOST = 'https://opentour.emory.edu'
    ENV.APP.GA_ID = 'UA-51682905-15'
    ENV.GOOGLE_MAPS_API_KEY = 'AIzaSyD-G_lDtvChv-P3nchtQYHoCLfFzn9ylr8'
    ENV.GOOGLE_MAPS_VERSION = 3.37
  }

  return ENV;
};