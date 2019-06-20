import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  tour: belongsTo('tour'),
  medium: belongsTo('medium'),
  position: attr('number')
});
