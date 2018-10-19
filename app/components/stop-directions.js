import Component from '@ember/component';

export default Component.extend({
  classNames: [
    'uk-panel-scrollable',
    'otb-stop-directions-container',
    'uk-width-1-1'
  ],
  classNameBindings: ['show'],
  show: false,

  didInsertElement() {
    this.set('show', true);
  },

  willDestroy() {
    this.set('show', false);
  }
});
