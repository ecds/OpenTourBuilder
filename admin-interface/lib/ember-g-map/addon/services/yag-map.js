import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  map: null,
  setMap(map) {
    set(this, 'map', map);
  }
});
