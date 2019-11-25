import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import UIkit from 'uikit';

export default Component.extend({
  classNameBindings: [
    'parent.center:uk-flex-top',
    'parent.container:uk-modal-container',
    'parent.full:uk-moldal-full'
  ],

  attributeBindings: [
    'parent.modalName:id',
    'parent.escClose:esc-close',
    'parent.bgClose:bg-close',
    'parent.stack:stack',
    'parent.container:container',
    'parent.clsPage:cls-page',
    'parent.clsPanel:cls-panel',
    'parent.selClose:sel-close'
  ],

  ukModal: '',

  modalName: computed('parent.modalName', function() {
    return get(this, 'parent.modalName');
  }),

  setEvents() {
    let events = get(this, 'parent').collectEvents();
    for (let event in events) {
      UIkit.util.on(this.element, event, events[event]);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    set(this, 'ukModal', UIkit.modal(this.element));
    this.setEvents();
  }
});
