import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  tour: belongsTo('tour'),
  stop: belongsTo('stop', {
    async: false
  }),
  position: attr('number'),
  next: attr(),
  previous: attr()
});
