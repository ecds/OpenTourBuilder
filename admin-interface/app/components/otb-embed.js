import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  loadEmbed: false,
  willDestroy() {
    this.setProperties({ loadEmbed: false });
  }
});
