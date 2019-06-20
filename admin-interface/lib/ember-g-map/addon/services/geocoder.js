import Service from '@ember/service';
import { debug } from '@ember/debug';
/* global google */

export default Service.extend({
  locateAddress(address) {
    let locator = new google.maps.Geocoder;
    let location = locator.geocode(
      {
        address: address
      },
      function(result, status) {
        if (status === 'OK') {
          return result[0].geometry.location;
        } else {
          debug(status)
        }
      }
    );
    return location;
  }
});
