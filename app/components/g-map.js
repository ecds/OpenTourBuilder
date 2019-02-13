import { reads } from '@ember/object/computed';
import { A } from '@ember/array';
import GMapBase from 'ember-g-map/components/g-map-base';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map';
/* global google */

export default GMapBase.extend(ParentMixin, {
  layout,
  tagName: 'div',
  classNames: ['map-map'],
  bounds: null,
  features: A(),
  fastboot: service(),
  yagMap: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  mapType: 'roadmap',

  init() {
    this._super(...arguments);
  },

  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    let options = get(this, 'options') || {};
    if (!options.mapTypeId) {
      options.mapTypeId = 'roadmap';
    }
    if (get(this, 'zoom') !== 'auto') {
      options.zoom = parseInt(get(this, 'zoom')) || 16;
    }

    if (!options.center) {
      set(this, 'bounds', new google.maps.LatLngBounds());
    }

    const map = new google.maps.Map(this.element, options);
    google.maps.event.addListenerOnce(map, 'idle', () => {
      if (Number.isInteger(options.zoom)) {
        map.setZoom(options.zoom);
      }
    });
    // get(this, 'yagMap').setMap(map);
    return map;
  },

  willDestroyParent() {
    if (this.get('isFastBoot')) {
      return;
    }
    let map = get(this, 'feature');

    google.maps.event.clearInstanceListeners(map);
    set(this, 'feature', null);
    map = null;
    this.element.remove();
    // set(this, 'feature', new google.maps.Map(this.element, {}));
  },

  willDestroy() {
    // console.log('destroying map');
  }
});
