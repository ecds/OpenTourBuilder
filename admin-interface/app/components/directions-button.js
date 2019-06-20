import Component from '@ember/component';
import { get } from '@ember/object';
import { ChildMixin } from 'ember-composability-tools';
/* global google */

export default Component.extend(ChildMixin, {
  tagName: 'button',
  classNames: [
    'uk-button',
    'uk-button-primary',
    'otb-map-control',
    'otb-directions-control'
  ],

  didInsertParent() {
    this._super(...arguments);

    this.element.index = 1;
    const map = get(this, 'parentComponent').feature;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.element);
  },

  click() {
    this.map.toggleProperty('showDirections');
  }
});
