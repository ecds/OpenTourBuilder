import Component from '@ember/component';
import ENV from '../config/environment';

export default Component.extend({
  classBindings: [],
  attributeBindings: ['ukSlideshow:uk-slideshow', 'animation'],
  imageBasePath: ENV.APP.API_HOST,

  ukSlideshow: true,
  animation: 'push',
  loadEmbed: false
});
