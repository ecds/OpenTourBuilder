import DS from 'ember-data';
import ENV from '../config/environment';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
const { Model, attr, hasMany } = DS;

export default class MediumModel extends Model {
  @attr('string') title;
  @attr('string') caption;
  @attr('string') video;
  @attr() originalImage;
  @attr('string') embed;
  @attr('string') desktop;
  @attr('string') tablet;
  @attr('string') mobile;
  @attr('string') srcset;
  @attr('string') srcset_sizes;
  @attr('string') insecure;
  @attr('number') desktop_height; 
  @attr('number') desktop_width; 
  @hasMany('tour') tours;
  @hasMany('stop') stops;
  @attr('boolean', { defaultValue: false }) loadEmbed;
  
  get baseUrl() {
    return `${ENV.APP.API_HOST}`;
  }

  @computed('embed')
  get safeEmbed() {
    return htmlSafe(this.get('embed'));
  }
}
