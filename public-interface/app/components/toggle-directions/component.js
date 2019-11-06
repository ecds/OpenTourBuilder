import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import MapUtil from '../../utils/google-maps';

export default class ToggleDirectionsComponent extends Component {
  @service maps;
  
  mapUtil = MapUtil.create();

  @action
  addControl() {
    if (this.maps.controls.length == 0) {
      let element = document.getElementById('directions-toggle');
      this.mapUtil.addControl(this.maps.map, 'directions-toggle', 'TOP_RIGHT');
      element.style.zIndex = 1;
      // this.maps.controlElements.push(element);
      // this.maps.set('directionsControl', element);
    }
  }
}
