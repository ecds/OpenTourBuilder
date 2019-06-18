import Component from '@ember/component';
import { get, set } from '@ember/object';
import { debug } from '@ember/debug';
/* global google */

const locator = new google.maps.Geocoder();

export default Component.extend({
  tagName: '',
  stopAddress: null,
  parkingAddress: null,

  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'model.lat') && !get(this, 'model.address')) {
      this.getAddress();
    }
  },

  willDestroyElement() {
    set(this, 'locator', null);
    // set(this, 'stopAddress', null);
    set(this, 'parkingAddress', null);
  },

  getAddress() {
    let stopLatLng = {
        lat: get(this, 'model.lat'),
        lng: get(this, 'model.lng')
      },
      parkingLatLng = {
        lat: get(this, 'model.parking_lat'),
        lng: get(this, 'model.parking_lng')
      };

    if (stopLatLng) {
      locator.geocode(
        {
          location: stopLatLng
        },
        (results, status) => {
          if (status === 'OK') {
            get(this, 'model').setProperties({
              address: results[0].formatted_address
            });
          } else {
            debug(status);
          }
        }
      );
    }

    if (get(this, 'model.parking_lat')) {
      locator.geocode(
        {
          location: parkingLatLng
        },
        (results, status) => {
          if (status === 'OK') {
            set(this, 'parkingAddress', results[0].formatted_address);
          } else {
            debug(status);
          }
        }
      );
    }
  },

  parkingIcon() {
    return {
      url: '/admin/assets/icons/parking.svg',
      size: new google.maps.Size(90, 90),
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(15, 15),
      origin: new google.maps.Point(0, 0)
    };
  },

  actions: {
    locateAddress() {
      if (get(this, 'model.address')) {
        locator.geocode(
          {
            address: get(this, 'model.address')
          },
          (result, status) => {
            if (status === 'OK') {
              let location = result[0].geometry.location;
              // console.log(location);
              get(this, 'model').setProperties({
                lat: location.lat(),
                lng: location.lng()
              });
            } else {
              debug(status);
            }
          }
        );
      }

      if (this.parkingAddress) {
        locator.geocode(
          {
            address: this.parkingAddress
          },
          (result, status) => {
            if (status === 'OK') {
              let location = result[0].geometry.location;
              get(this, 'model').setProperties({
                parking_lat: location.lat(),
                parking_lng: location.lng()
              });
            } else {
              debug(status);
            }
          }
        );
      }
    },

    reLocate(newLat, newLng) {
      get(this, 'model').setProperties({
        lat: newLat,
        lng: newLng
      });
      this.getAddress();
    },

    reLocateParking(newLat, newLng) {
      get(this, 'model').setProperties({
        parking_lat: newLat,
        parking_lng: newLng
      });
      this.getAddress();
    }
  }
});
