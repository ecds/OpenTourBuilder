import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  name: attr('string'),
  tours: hasMany('tour'),
  subdir: attr('string'),
  users: hasMany('user')
});
