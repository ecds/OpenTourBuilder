import Component from '@ember/component';
import { get, set } from '@ember/object';
import layout from '../templates/components/select-travel-mode';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { ChildMixin } from 'ember-composability-tools';
import { A } from '@ember/array';
/* global google */

export default Component.extend(ChildMixin, {
  layout,
  classNames: ['otb-map-control'],
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  defaultModes: A([
    {
      mode: 'DRIVING',
      icon: 'car'
    },
    {
      mode: 'BICYCLING',
      icon: 'bicycle'
    },
    {
      mode: 'TRANSIT',
      icon: 'bus'
    },
    {
      mode: 'WALKING',
      icon: 'question'
    }
  ]),

  didInsertParent() {
    this._super(...arguments);
    if (this.get('isFastBoot')) {
      return;
    }
    this.element.index = 1;
    const map = get(this, 'parentComponent').feature;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.element);
  },

  // willDestroyParent() {
  //   this.change = null;
  // },

  // change(event) {
  //   set(this, 'travelMode', event.target.value);
  // },

  actions: {
    setMode(tour, mode) {
      set(tour, 'mode', mode);
    }
  }
});
