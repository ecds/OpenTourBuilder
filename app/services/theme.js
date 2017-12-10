import Service from '@ember/service';
import { computed, observer } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  base: 'default',
  theme: 'first',

  // the property used as a reference for styles
  name: computed('base', function() {
    const base = this.get('base');
    const theme = this.get('theme');
    return `${base}-${theme}`;
  }),

  // update things that may be using data-theme
  themeChanged: observer('base', 'theme', function() {
    this.notifyPropertyChange('name');
  }),

  // set the base theme for the application
  setBase: function(base) {
    this.set('base', isEmpty(base) ? 'default' : base);
  },

  // set theme to use within base theme
  setTheme: function(theme) {
    this.set('theme', isEmpty(theme) ? 'first' : theme);
  }
});
