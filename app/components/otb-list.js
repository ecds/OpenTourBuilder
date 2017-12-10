import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  classNames: ['otb-list'],
  classNameBindings: ['isScrolling:scrolled'],
  windoc: service(),
  childIds: {},
  expandMap: false,
  expandVideo: false,

  init() {
    this._super(...arguments);
  },

  isScrolling: function() {
    if (get(this, 'windoc.scrollTop') > 0) {
      return true;
    }
    return false;
  }.property('windoc.scrollTop'),

  _setupChildComponent(childComponent) {
    set(this, 'childIds', Object.assign(get(this, 'childIds'), {[childComponent.classNames[0]]: childComponent.elementId}));
  }
});
