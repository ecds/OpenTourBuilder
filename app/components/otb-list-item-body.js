import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';
import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  classNames: ['otb-list-body'],
  collapseVideo: false,
  collapseMap: false,
  windoc: service(),

  init() {
    this._super(...arguments);
    if (this.get('parentView') &&
            this.get('parentView')._setupChildComponent) {
      this.get('parentView')._setupChildComponent(this);
    }
  },

  _scrollTop() {
    debug(this.element.scrollTop);
    if(this.element.scrollTop >= 315) {
      this.set('collapseVideo', true);
      this.set('collapseMap', true);
    }
  },

  scrollTop() {
    this.element.onscroll = () => {
      run.debounce(this, '_scrollTop', 100);
    };
  },

  didReceiveAttrs() {
    // run.scheduleOnce('afterRender', this, 'scrollTop');
  },

  _collapseVideo() {
    this.toggleProperty('collapseVideo');
  },

  _collapseMap() {
    this.toggleProperty('collapseMap');
  }
});
