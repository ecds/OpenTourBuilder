import Component from '@ember/component';
import UIkit from 'uikit';
import { get, set } from '@ember/object';
// import { later, cancel, debounce } from '@ember/runloop';
import { schedule } from '@ember/runloop';

export default Component.extend({
  // attributeBindings: [
  // //   'animation',
  //   'bottom',
  // //   'cls-active',
  // //   'media',
  //   'offset'
  //   // 'shwoUpOnUp:show-on-up'
  //   // 'style',
  // //   'target-offset',
  // //   'top',
  // //   'width-element'
  // // 'ukSticky:uk-sticky'
  // ],

  // ukSticky: true,
  // showUpOnUp: true,

  // style: computed('foo', function() {
  //   return `z-index: ${this.get('foo') + 980};`
  // }),

  /**
   * Add listener to update sticky element width on resize event
   * @method initResizeEventListener
   * @private
   */
  initResizeEventListener() {
    this._resizeListener = () => this.debouncedUpdateDimension();
    window.addEventListener('resize', this._resizeListener, false);
  },

  /**
   * @method removeResizeEventListener
   * @private
   */
  removeResizeEventListener() {
    window.removeEventListener('resize', this._resizeListener, false);
  },

  /**
   * @method debouncedUpdateDimension
   * @private
   */
  debouncedUpdateDimension() {
    debounce(this, this.updateDimension, 30);
  },

  /**
   * @method updateDimension
   * @private
   */
  updateDimension() {
    console.log('dimension');
    if (this.get('isDestroyed') || this.get('isDestroying')) {
      return false;
    }
  },

  // _pollTask() {
  //   this.updatePosition();
  //   this.initPollTask();
  // },

  // initPollTask() {
  //   this._pollTimer = later(this, this._pollTask, 500);
  // },

  // removePollTask() {
  //   if (this._pollTimer) {
  //     cancel(this._pollTimer);
  //   }
  // },

  updatePosition() {
    // let { topTriggerElement, bottomTriggerElement } = this;

    // if (topTriggerElement) {
    //   this.set('parentTop', elementPosition(topTriggerElement, this.get('top'), 0));
    // }
    // if (bottomTriggerElement) {
    //   this.set('parentBottom', elementPosition(bottomTriggerElement, 0, this.get('offsetBottom')));
    // }
    console.log('update!');
    // UIkit.sticky(this.element, {
    //   offset: this.get('offset'),
    //   bottom: this.get('bottom')
    // });
  },

  didInsertElement() {
    set(
      this,
      '_ukSticky',
      UIkit.sticky(this.element, {
        offset: 80,
        bottom: get(this, 'bottom')
      })
    );
  },

  didRender() {
    this._super(...arguments);
    console.log(this.elementId);
    // this.updateDimension();
    // scheduleOnce('afterRender', this, this.updateDimension);
    // this.initResizeEventListener();
    schedule('afterRender', () => {
      // get(this, '_ukSticky').update();
      get(this, '_ukSticky').$emit((event = 'update'));
    });
  }
});
