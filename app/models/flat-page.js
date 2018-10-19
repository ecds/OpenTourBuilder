import DS from 'ember-data';
import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  title: attr('string'),
  content: attr('string'),
  tour: belongsTo('theme', {
    async: true
  }),
  safeContent: computed('content', function safeContent() {
    return new htmlSafe(get(this, 'content'));
  }).property('content')
});
