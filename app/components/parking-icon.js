import Component from '@ember/component';
/* global google */

export default Component.extend({
  tagName: '',

  myIcon: {
    url: '/assets/icons/parking.svg',
    size: new google.maps.Size(30, 30),
    scaledSize: new google.maps.Size(20, 20)
  }
});
