import Component from '@ember/component';
import { get, set } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({
  classNames: ['desktop-tour-list', 'uk-overflow-hidden'],
  lastOffset: 0,
  currentStop: null,

  initScrollEventListener() {
    this._scrollListener = () => this.updatePosition();
    this.element.firstElementChild.addEventListener(
      'scroll',
      this._scrollListener
    );
  },

  debouncedScroll() {
    // this.updatePosition();
    debounce(this, this.updatePosition, 1000, true);
  },

  getScrollDirection() {
    let newPosition = document.getElementById(this.elementId).firstElementChild
      .scrollTop;
    if (this.lastOffset < newPosition) {
      set(this, 'lastOffset', newPosition);
      return 'down';
    } else if (this.lastOffset > newPosition) {
      set(this, 'lastOffset', newPosition);
      return 'up';
    }
  },

  updatePosition() {
    let direction = this.getScrollDirection();
    this.element.firstElementChild.addEventListener('scroll', () => {
      get(this, 'tourStops').forEach(tourStop => {
        let stop = get(tourStop, 'stop');
        let stopEl = document.getElementById(
          `${get(stop, 'slug')}-${stop.get('id')}`
        );

        if (direction === 'down') {
          // The next stop takes up 2/3 of viewport offset by the heights of
          // the navbar and the title.
          if (
            stopEl.getBoundingClientRect().top <=
              parseInt(window.innerHeight / 3 + 160) &&
            stopEl.getBoundingClientRect().top > 0 &&
            // stopEl.getBoundingClientRect().bottom > window.innerHeight &&
            get(tourStop, 'active') === false
          ) {
            this.setActiveStop(get(this, 'tourStops'), tourStop);
          }
        } else if (direction === 'up') {
          if (
            stopEl.getBoundingClientRect().bottom >=
              parseInt(window.innerHeight / 2) &&
            stopEl.getBoundingClientRect().top < 0 &&
            get(tourStop, 'active') === false
          ) {
            this.setActiveStop(get(this, 'tourStops'), tourStop);
          }
        }
      });
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.initScrollEventListener();
  }
});
