import { get, computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  slug: attr('string'),
  description: attr('string'),
  sanitized_description: attr('string'),
  meta_description: attr('string'),
  sanitized_direction_notes: attr('string'),
  video: attr('string'),
  position: attr('number'),
  theme_title: attr('string'),
  // modes: hasMany('tour-modes'),
  splash: attr(),
  mode: belongsTo('mode', {
    async: true
  }),
  theme: belongsTo('theme', {
    async: true
  }),
  published: attr('boolean'),
  tour_stops: hasMany('tour-stop', {
    async: true
  }),
  tour_media: hasMany('tour-medium'),
  media: hasMany('medium'),
  stops: hasMany('stop'),
  flat_pages: hasMany('flat-page', {
    async: true
  }),
  users: hasMany('user'),
  safeDescription: computed('description', function safeDescription() {
    return new htmlSafe(get(this, 'description'));
  }).property('description'),

  sortedTourStops: sort('tour_stops', '_positionSort'),
  _positionSort: ['position:asc'],

  sortedMedia: sort('tour_media', '_mediumPositionSort'),
  _mediumPositionSort: ['position:asc']
});
