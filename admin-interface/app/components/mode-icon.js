import Component from '@ember/component';
import layout from '../templates/components/mode-icon';
import { get, set } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',
  icon: null,

  didInsertElement() {
    const mode = get(this, 'mode');
    if (mode === 'BICYCLING') {
      set(this, 'icon', 'bicycle');
    } else if (mode === 'DRIVING') {
      set(this, 'icon', 'car');
    } else if (mode === 'TRANSIT') {
      set(this, 'icon', 'bus');
    }
  }
});
