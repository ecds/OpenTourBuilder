import DS from 'ember-data';

const { Model, belongsTo } = DS;

export default Model.extend({
  tour_id: belongsTo('tour'),
  mode_id: belongsTo('mode')
});
