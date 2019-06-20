import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';
export default class AllowLocationComponent extends Component {
  @service location;
  @service locationPermissions;
  @service cookies;
  @service fastboot;

  @action
  checkPermissions() {
    if (this.fastboot.isFastBoot) return;
    if (this.locationPermissions.getLocationSet && this.locationPermissions.locationAllowed) {
      this.location.getLocation();
      this.checkLocationUpdatePermissions();
    } else if (!this.locationPermissions.getLocationSet) {
      UIkit.modal(document.getElementById('set-loc-perms-modal')).show();
    }
  }

  checkLocationUpdatePermissions() {
    if (this.locationPermissions.updateLocationSet && this.locationPermissions.updateLocationAllowed) {
      this.location.startLocationWatcher();
    } else if (!this.locationPermissions.updateLocationSet) {
      UIkit.modal(document.getElementById('set-update-loc-perms-modal')).show();
    }
  }

  @action
  allowLocation() {
    this.locationPermissions.setLocationAllowed(true);
    this.checkLocationUpdatePermissions();
    this.location.getLocation();
  }

  @action
  declineLocation() {
    this.locationPermissions.setLocationAllowed(false);
  }

  @action
  allowUpdateLocation() {
    this.locationPermissions.setUpdateLocationAllowed(true);
  }

  @action
  declineUpdateLocation() {
    this.locationPermissions.setUpdateLocationAllowed(false);
  }
}
