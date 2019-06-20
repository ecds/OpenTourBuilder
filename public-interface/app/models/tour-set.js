import DS from 'ember-data';
const { Model, attr } = DS;

export default class TourSetModel extends Model {
  @attr('string') name;
  @attr('string') subdir;
  @attr() publishedTours;
}
