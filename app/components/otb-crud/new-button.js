import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['uk-button', 'uk-button-primary'],
  attributeBindings: ['type'],
  type: 'button',
  click() {
    this.dataTask();
  }
});
