import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
    title: attr('string'),
    description: attr('string'),
    splash_image: attr('string'),
    modes: hasMany('tour-modes'),
    mode: belongsTo('mode'),
    published: attr('boolean'),
    tour_stops: hasMany('tour_stops')
});
