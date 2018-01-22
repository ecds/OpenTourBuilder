import Component from '@ember/component';

export default Component.extend({
  classNames: ['uk-panel-scrollable', 'otb-stop-directions-container'],
  classNameBindings: ['show'],
  show: false,

  didInsertElement() {
    this.set('show', true);
  },

  willDestroy() {
    this.set('show', false);
  }
});
