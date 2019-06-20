/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV['simply-ssh'] = {
      connection: {
        // parameter hash accepted by SSH2, see https://github.com/mscdex/ssh2 for details
        host: process.env.SSH_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        privateKey: process.env.SSH_KEY
      },
      dir: '/data/fastboot2',
      keep: 10
    };
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV['simply-ssh'] = {
      connection: {
        // parameter hash accepted by SSH2, see https://github.com/mscdex/ssh2 for details
        host: process.env.SSH_HOST,
        port: process.env.SSH_PORT,
        username: process.env.SSH_USER,
        privateKey: process.env.SSH_KEY
      },
      dir: '/data/opentour',
      keep: 5
    };
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
