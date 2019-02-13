import Component from '@ember/component';
import { set } from '@ember/object';
import layout from '../templates/components/g-map-select-travel-mode';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { A } from '@ember/array';

export default Component.extend({
  layout,
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  defaultModes: A(['DRIVING', 'BICYCLING', 'TRANSIT', 'WALKING']),

  change(event) {
    set(this, 'travelMode', event.target.value);
  }
});
