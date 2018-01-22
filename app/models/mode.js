import DS from 'ember-data';
import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

const { Model, attr } = DS;

export default Model.extend({
  title: attr('string'),
  icon: attr('string'),
  safeIcon: computed('icon', function safeIcon() {
    return new htmlSafe(get(this, 'icon'));
  }).property('icon')
});
