/* eslint-env node */
'use strict';
const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;
const path = require('path');

const libPath = path.dirname(require.resolve('jodit/package.json'));

module.exports = {
  name: 'ember-jodit',

  // isDevelopingAddon() {
  //   return true;
  // },

  treeForVendor: function() {
    let joditJS = new Funnel(path.join(libPath, 'build'), {
      include: ['jodit.min.js']
    });

    joditJS = map(
      joditJS,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return new Merge([joditJS]);
  },

  included() {
    this._super.included.apply(this, arguments);
    this.app.import('vendor/jodit.min.js');
  }
};
