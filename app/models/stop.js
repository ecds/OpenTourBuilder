import DS from 'ember-data';
import { sort } from '@ember/object/computed';
import { computed, get } from '@ember/object';
import ENV from '../config/environment';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  slug: attr('string'),
  lat: attr('number', {
    defaultValue: 0.0
  }),
  lng: attr('number', {
    defaultValue: 0.0
  }),
  parking_lat: attr('number'),
  parking_lng: attr('number'),
  address: attr('string'),
  description: attr('string'),
  sanitized_description: attr('string'),
  sanitized_direction_notes: attr('string'),
  metadescription: attr('string'),
  article_link: attr('string'),
  video_embed: attr('string'),
  video_poster: attr('string'),
  direction_intro: attr('string'),
  direction_notes: attr('string'),
  tours: hasMany('tour'),
  tour_stops: hasMany('tour_stop', {
    async: true
  }),
  stop_media: hasMany('stop_medium', {
    async: true
  }),
  media: hasMany('medium', {
    async: true
  }),
  splash: attr(),

  mobileThumbUrl: computed('original_image', function() {
    return `${
      ENV.APP.API_HOST
    }${get(this, 'splash.original_image.mobile_list_thumb.url')}`;
  }),

  sortedMedia: sort('stop_media', '_mediumPositionSort'),
  _mediumPositionSort: ['position:asc']
});
