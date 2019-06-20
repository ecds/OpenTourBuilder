import GMapBase from 'ember-g-map/components/g-map-base';
import { get } from '@ember/object';
import { RenderBlockMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map-overlay';
/* global google */

export default GMapBase.extend(RenderBlockMixin, {
  layout,
  tagName: 'article',
  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    let infowindow = new google.maps.InfoWindow({
      content: get(this, 'element')
    });

    let marker = get(this, 'parentComponent').feature;
    let map = get(this, 'parentComponent').map;
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });

    return infowindow;
  }
});
