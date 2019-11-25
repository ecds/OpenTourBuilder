import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  tour: belongsTo('tour'),
  flat_page: belongsTo('flat-page'),
  position: attr('number')
});
