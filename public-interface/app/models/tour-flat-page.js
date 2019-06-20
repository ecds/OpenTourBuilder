import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class TourFlatPageModel extends Model {
  @belongsTo('tour') tour;
  @belongsTo('flat-page') flatPage;
  @attr('number') position;
}
