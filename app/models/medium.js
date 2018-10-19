import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

const { Model, attr } = DS;

export default Model.extend({
  tenant: service(),

  title: attr('string'),
  caption: attr('string'),
  video: attr('string'),
  original_image: attr('file'),
  embed: attr('string'),
  desktop: attr('string'),
  tablet: attr('string'),
  mobile: attr('string'),
  srcset: attr('string'),
  srcset_sizes: attr('string'),
  // stop: attr(),
  tours: hasMany('tour', { async: true }),
  stops: hasMany('stop', { async: true }),

  loadEmbed: attr('boolean', { defaultValue: false }),

  baseUrl: computed('original_image', function() {
    return `${ENV.APP.API_HOST}`;
  })
});
