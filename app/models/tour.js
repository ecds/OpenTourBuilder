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
  splash_image: attr('string'),
  video: attr('string'),
  position: attr('number'),
  theme_title: attr('string'),
  modes: hasMany('tour-modes'),
  mode: belongsTo('mode', {
    async: true
  }),
  theme: belongsTo('theme', {
    async: true
  }),
  published: attr('boolean'),
  tour_stops: hasMany('tour_stop', {
    async: false
  }),
  stops: hasMany('stop', {
    async: true
  }),
  safeBackgroundImage: computed('splash_imange', function safeBackgroundPhoto() {
    return new htmlSafe(`background-image: url("${get(this, 'splash_image')}");`);
  }).property('splash_image'),
  safeDescription: computed('description', function safeDescription() {
    return new htmlSafe(get(this, 'description'));
  }).property('description'),
  sortedTourStops: sort('tour_stops', '_positionSort'),
  _positionSort: ['position:asc']
});
