import Component from '@ember/component';

export default Component.extend({
  classBindings: [],
  attributeBindings: ['ukSlideshow:uk-slideshow', 'animation'],

  ukSlideshow: true,
  animation: 'push',
  loadEmbed: false
});
