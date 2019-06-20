'use strict';

process.env.EMBER_VERSION = "OCTANE";

module.exports = {
  /**
    Ember CLI sends analytics information by default. The data is completely
    anonymous, but there are times when you might want to disable this behavior.

    Setting `disableAnalytics` to true will prevent any data from being sent.
  */
  "disableAnalytics": false,
  "ssl": true,
  "ssl-key": "/Users/jay/data/certs/jay.lvh.me.key",
  "ssl-cert": "/Users/jay/data/certs/jay.lvh.me.crt"
}
