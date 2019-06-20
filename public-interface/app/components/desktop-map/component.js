import Component from '@glimmer/component';
import { action } from '@ember/object'; 
import { inject as service } from '@ember/service';
import MapUtil from '../../utils/google-maps';

export default class DesktopMapComponent extends Component {
  @service maps;

  mapUtil = MapUtil.create();

  @action
  creatDesktopMap() {
    const mapOptions = { type: this.args.tour.mapType };
    this.mapUtil.createMap(mapOptions);
  }

  @action
  fitBounds(map) {
    const bounds = new this.gMaps.LatLngBounds();
    this.args.tour.stops.forEach(stop => {
      bounds.extend({ lat: stop.lat, lng: stop.lng });
    })
    map.map.fitBounds(bounds);
  }
}
