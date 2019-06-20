import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed, get } from '@ember/object';
import { dasherize } from '@ember/string';

export default Component.extend({
  tagName: 'section',

  classNames: ['uk-margin-bottom'],

  init() {
    this._super(...arguments);
    assert('Component form-section must be passed a label', get(this, 'label'));
  },

  inputId: computed('label', function() {
    return `${this.elementId}-${dasherize(get(this, 'label'))}`;
  })
});
