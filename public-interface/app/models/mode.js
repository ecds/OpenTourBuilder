import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;

export default class ModeModel extends Model {
  @attr('string') title;
  @attr('string') icon;
  @belongsTo('tour') tour;
  @hasMany('tour', {
    async: true,
    inverse: null
  }) tours;
}
