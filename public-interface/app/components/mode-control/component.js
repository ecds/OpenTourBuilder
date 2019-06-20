import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import UIkit from 'uikit';
import MapUtil from '../../utils/google-maps';

export default class ModeControlComponent extends Component {
  @service cookies;
  @service store;
  @service tenant;
  @service maps;

  mapUtil = MapUtil.create();

  @action
  setMode(mode) {
    if (mode.constructor == HTMLButtonElement) {
      mode = this.tourModeFromCookie;
      if (this.args.parentId == 'map-mode-control') {
        this.mapUtil.addControl(this.maps.map, 'map-mode-control', 'TOP_LEFT');
        this.maps.controlElements.push(document.getElementById('map-mode-control'));
      }
    } else {
      this.maps.set('travelMode', mode.get('title'));
      UIkit.dropdown(document.getElementById('mode-options')).hide();
      this.cookies.write(this.tourModeCookieName, mode.get('id'), { path: `/${this.tenant.currentTenant}/${this.args.tour.slug}` });
      this.maps.calcRoute();
    }
    this.args.tour.set('mode', mode);
    this.maps.set('travelMode', mode.get('title'));
  }

  get tourModeFromCookie() {
    const preferredMode = this.cookies.read(this.tourModeCookieName);
    if (preferredMode) {
      let modeFromCookie = this.store.peekRecord('mode', preferredMode);
      return modeFromCookie;
    }
    // Fall back to default for Tour.
    return this.args.tour.mode;
  }
  
  get tourModeCookieName() {
    const tour = this.args.tour;
    return `${tour.slug}-${tour.id}-travel-mode`
  }
}
