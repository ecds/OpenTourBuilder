import { helper } from '@ember/component/helper';
/* global google */

export function parkingIcon(/*params, hash*/) {
  return {
    url: '/admin/assets/icons/parking.svg',
    size: new google.maps.Size(90, 90),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(15, 15),
    origin: new google.maps.Point(0, 0)
  };
}

export default helper(parkingIcon);
