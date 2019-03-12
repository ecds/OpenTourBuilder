import DS from 'ember-data';
import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  slug: attr('string'),
  content: attr('string', {
    defaultValue: ''
  }),
  tour: hasMany('tour', {
    async: true
  }),
  tour_flat_pages: hasMany('tour-flat-pages', {
    async: true
  }),
  safeContent: computed('content', function safeContent() {
    return new htmlSafe(get(this, 'content'));
  }).property('content')
});
