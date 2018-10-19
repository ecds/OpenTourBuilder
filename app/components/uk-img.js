import Component from '@ember/component';

export default Component.extend({
  tagName: 'img',

  attributeBindings: [
    'alt',
    'dataSrc:data-src',
    'dataSrcset:data-srcset',
    'sizes',
    'target',
    'ukImage:uk-img',
    'ukToggle:uk-toggle',
    'target',
    'dataWidth:data-width',
    'dataHeight:data-height'
  ],

  ukImage: true,
  sizes: '(max-width: 620px) 680px, (max-width: 880px) 880px, 1000px',
  // width: 768,
  // height: 300,
  // ukToggle: true,

  // This prevents the a click firing after swipes.
  // Without this, the modal appears after person swipes
  // to next image.
  touchEnd(event) {
    event.stopPropagation();
  }
});
