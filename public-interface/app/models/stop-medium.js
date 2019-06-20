import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class StopMediumModel extends Model {
  @belongsTo('stop') stop;
  @belongsTo('medium') medium;
  @attr('number') position;
}
