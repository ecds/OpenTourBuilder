import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed /* observer */ } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  store: service(),
  tour: null,
  base: 'default',
  theme: 'dark',

  init() {
    this.store.findAll('theme');
  },

  // the property used as a reference for styles
  name: computed('base', function() {
    const base = this.get('base');
    const theme = this.get('theme');
    return `${base}-${theme}`;
  }),

  // set the base theme for the application
  setBase: function(base) {
    this.set('base', isEmpty(base) ? 'default' : base);
  },

  // set theme to use within base theme
  setTheme: function(theme) {
    this.set('theme', isEmpty(theme) ? 'first' : theme);
  },

  setTour: function(tour) {
    this.set('tour', tour);
  }
});
