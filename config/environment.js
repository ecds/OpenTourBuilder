/* eslint-env node */

module.exports = (environment) => {
    const ENV = {
        modulePrefix: 'open-tour-builder',
        environment,
        rootURL: '/',
        locationType: 'auto',
        'ember-cli-mirage': { enabled: false },
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false
            }
        },

        fastboot: {
            hostWhitelist: [/^.*lvh.me:4200+$/]
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        ENV.APP.API_HOST = 'otb.org:3000';
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'mobile') {
        ENV.locationType = 'hash';
        ENV.rootURL = '';
        ENV.sub = 'jay';
        ENV.APP.API_HOST = 'otb.org:3000';

    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
