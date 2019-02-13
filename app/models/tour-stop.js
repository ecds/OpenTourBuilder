import DS from 'ember-data';
import { computed, get } from '@ember/object';
/* globals google */

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  tour: belongsTo('tour'),
  stop: belongsTo('stop', {
    async: true
  }),
  position: attr('number', {
    defaultValue: 1
  }),
  next: attr(),
  next_slug: attr('string'),
  previous: attr(),
  active: attr('boolean', {
    defaultValue: false
  }),

  labelContent: computed('position', 'inView', function() {
    if (get(this, 'inView')) {
      return '!';
    } else {
      return get(this, 'position').toString();
    }
  }),

  icon: computed('color', function() {
    return {
      scaledSize: new google.maps.Size(35, 35),
      anchor: new google.maps.Point(20, 40),
      origin: new google.maps.Point(0, 0),
      labelOrigin: new google.maps.Point(18, 14),
      url: '/assets/icons/map-marker.svg'
    };
  }),

  activeIcon: computed('color', function() {
    return {
      scaledSize: new google.maps.Size(75, 75),
      labelOrigin: new google.maps.Point(36, 28),
      url: '/assets/icons/map-marker.svg'
    };
  }),

  label: computed('active', function() {
    return {
      color: 'white',
      text: get(this, 'labelContent')
    };
  }),

  activeLabel: computed('active', function() {
    let label = get(this, 'label');
    label.fontSize = '2.75em';
    // label.color = 'deeppink';
    return label;
  })
});
