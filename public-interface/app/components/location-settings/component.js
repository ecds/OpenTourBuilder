import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LocationSettingsComponent extends Component {
  @service cookies;
  @service location;
  @service locationPermissions;
  @service maps;

  @action
  locationPermissionsOn() {
    this.locationPermissions.setLocationAllowed(true);
  }

  @action
  locationPermissionsOff() {
    this.locationPermissions.setLocationAllowed(false);
    this.locationPermissions.setUpdateLocationAllowed(false);
    this.maps.removeRoute();
  }

  @action
  updateLocationPermissionsOn() {
    this.locationPermissions.setUpdateLocationAllowed(true);
  }

  @action
  updateLocationPermissionsOff() {
    this.locationPermissions.setUpdateLocationAllowed(false);
  }
}
