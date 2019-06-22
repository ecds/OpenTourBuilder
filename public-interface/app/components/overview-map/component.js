import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import MapUtil from '../../utils/google-maps';

export default class OverviewMapComponent extends Component {
  @service deviceContext;
  
  mapUtil = MapUtil.create();

  infoWindow(tourStop) {
    const tour = tourStop.tour.getProperties(['tenant', 'slug']);
    const stop = tourStop.stop.getProperties(['slug', 'title']);
    return htmlSafe(`
      <header class='uk-text-large'>${stop.title}</header>
      <a href='/${tour.tenant}/${tour.slug}/${stop.slug}'>
        Go to stop.
      </a>
    `).toString();
  }

  @action
  createMap() {
    const bounds = this.mapUtil.latLngBounds();
    this.args.tour.sortedStops.forEach(tourStop => {
      bounds.extend({ lat: tourStop.stop.get('lat'), lng: tourStop.stop.get('lng') });
    });
    
    const mapOptions = {
      mapTypeId: this.args.tour.mapType,
      zoom: 12,
      center: {lat: 0, lng: 0},
      disableDefaultUI: true
    }

    const map = this.mapUtil.createMap(mapOptions);
    map.fitBounds(bounds);

    // TODO make the options a hash to be destructured.
    this.args.tour.sortedStops.forEach(tourStop => {
      tourStop.setProperties(
        {
          marker: this.mapUtil.addMarker(
            map,
            {
              lat: tourStop.stop.get('lat'),
              lng: tourStop.stop.get('lng')
            },
            false,
            true
          )
        }
        
      );
    });

    this.args.tour.sortedStops.forEach(tourStop => {
      this.mapUtil.setLabel(tourStop.marker, `${tourStop.position}`);
      if (this.deviceContext.isDesktop) {
        tourStop.marker.addListener('click', () => {
          this.args.setActiveStop.perform(this.args.tour.tourStops, tourStop, true); 
        })
      } else if (this.deviceContext.isMobile) {
        this.mapUtil.addInfoWindow(this.infoWindow(tourStop), tourStop.marker, map);
      }
    });
  }
}
