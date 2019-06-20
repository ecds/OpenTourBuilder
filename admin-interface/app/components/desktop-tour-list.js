import Component from '@ember/component';
import 'intersection-observer';

/* global scrollama */

const SCROLLER = scrollama();

export default Component.extend({
  classNames: ['desktop-tour-list', 'uk-overflow-hidden'],
  lastOffset: 0,
  currentStop: null,

  initScrollEventListener() {
    SCROLLER.setup({
      step: '.stop-list-stop',
      container: '#stop-list'
    })
      .onStepEnter(event => {
        const stop = this.tourStops[event.index];
        this.setActiveStop(this.tourStops, stop);
      })
      .onStepExit()
      .onContainerEnter()
      .onContainerExit();
  },

  didInsertElement() {
    this._super(...arguments);
    this.initScrollEventListener();
  }
});
