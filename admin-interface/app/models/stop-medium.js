import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  stop: belongsTo('stop'),
  medium: belongsTo('medium'),
  position: attr('number')
});
