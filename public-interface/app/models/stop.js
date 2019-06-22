import DS from 'ember-data';
import ENV from '../config/environment';
import { sort } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
const { Model, attr, hasMany } = DS;

export default class StopModel extends Model {
  @attr('string') title;
  @attr('string') slug;
  @attr('number', { defaultValue: 0.0 }) lat;
  @attr('number', { defaultValue: 0.0 }) lng;
  @attr('number', { defaultValue: 0.0 }) parking_lat;
  @attr('number', { defaultValue: 0.0 }) parking_lng;
  @attr('string') sanitized_description;
  @attr('string') sanitized_direction_notes;
  @attr('string') description;
  @attr('string') metadescription;
  @attr('string') article_link;
  @attr('string') article_link;
  @attr('string') video_embed;
  @attr('string') video_poster;
  @attr('string') directionIntro;
  @attr('string') direction_notes;
  @hasMany('tour_stop', { async: true }) tourStops;
  @hasMany('stop_medium', { async: true }) stopMedia;
  @hasMany('medium', { async: true }) media;
  @attr() splash;
  @attr('string') insecureSplash;
  @attr('number') splashHeight;
  @attr('number') splashWidth;

  get splashUrl() {
    if (this.get('splash')) {
      return `${ENV.APP.API_HOST}${this.get('splash.original_image.desktop.url')}`
    }
    return '/assets/images/otb-bg.png'
  }

  get safeDescription() {
    return new htmlSafe(
      this.get('description')
    );
  }

  _positionSort = Object.freeze(['position:asc']);

  @sort('stopMedia', '_positionSort')
  sortedMedia;
}
