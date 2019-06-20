import Component from '@ember/component';
import layout from '../templates/components/uk-modal';

const noop = () => {};

export default Component.extend({
  layout,
  tagName: '',
  modalName: 'uk-dialog',

  // Component Options
  escClose: true,
  bgClose: true,
  stack: false,
  container: false,
  clsPage: null,
  clsPanel: null,
  selClose: null,
  center: false,
  full: false,
  overflowAuto: false,

  collectEvents() {
    return {
      beforeshow: this.getWithDefault('on-beforeshow', noop),
      show: this.getWithDefault('on-show', noop),
      shown: this.getWithDefault('on-shown', noop),
      beforehide: this.getWithDefault('on-beforehide', noop),
      hide: this.getWithDefault('on-hide', noop),
      hidden: this.getWithDefault('on-hidden', noop)
    };
  }
});
