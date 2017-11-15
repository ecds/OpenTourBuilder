import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr, belongsTo, hasMany } = DS;

const {
    computed,
    get,
    String: {
        htmlSafe
    }
} = Ember;

export default Model.extend({
    title: attr('string'),
    description: attr('string'),
    sanitized_description: attr('string'),
    splash_image: attr('string'),
    video: attr('string'),
    modes: hasMany('tour-modes'),
    mode: belongsTo('mode', {
        async: true
    }),
    theme: belongsTo('theme', {
        async: true
    }),
    published: attr('boolean'),
    tour_stops: hasMany('tour_stop', {
        async: false
    }),
    stops: hasMany('stop', {
        async: true
    }),
    classList: attr('string', {
        defaultValue: 'bounceInUp'
    }),
    safeBackgroundImage: computed('splash_imange', function safeBackgroundPhoto() {
        return new htmlSafe(`background-image: url("${get(this, 'splash_image')}");`);
    }).property('splash_image'),
    safeDescription: computed('description', function safeDescription() {
        return new htmlSafe(get(this, 'description'));
    }).property('description')
});
