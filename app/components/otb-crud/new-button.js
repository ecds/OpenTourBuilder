import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['uk-button', 'uk-button-primary'],
  click() {
    this.dataTask();
  }
});
