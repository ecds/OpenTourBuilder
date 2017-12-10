import Component from '@ember/component';

export default Component.extend({
  classNames: ['otb-list-header'],
  init() {
    this._super(...arguments);
    if (this.get('parentView') &&
        this.get('parentView')._setupChildComponent) {
      this.get('parentView')._setupChildComponent(this);
    }
  }
});
