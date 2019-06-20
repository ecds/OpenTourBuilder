import DS from 'ember-data';
import { htmlSafe } from '@ember/string';
import { sort } from '@ember/object/computed';
import ENV from '../config/environment';
const { Model, attr, belongsTo, hasMany } = DS;

export default class TourModel extends Model {
  @attr('string') title;
  @attr('string') slug;
  @attr('string', {
    defaultValue() { return ''; }
  }) description;
  @attr('string') sanitizedDescription;
  @attr('string') metaDescription;
  @attr('string') sanitizedDirectionNotes;
  @attr('string') video;
  @attr('number') position;
  @attr('number') stopCount;
  @attr('string') theme_title;
  @attr() splash;
  @attr('string') externalUrl;
  @hasMany('mode') modes;
  @belongsTo('mode', {
    async: true,
    inverse: null
  }) mode;
  @attr('string') title;
  @attr('string') tenantTitle;
  @attr('string') tenant;
  @hasMany('tour_stop') tourStops;
  @hasMany('stop') stops;
  @hasMany('flat-page') flatPages;
  @hasMany('tour-flat-page') tourFlatPages;
  @hasMany('medium') media;
  @hasMany('tour-medium') tourMedia;
  @attr('number') splashHeight;
  @attr('number') splashWidth;
  @attr('string', {
    defaultValue() { return 'hybrid'; }
  }) mapType;

  get splashUrl() {
    if (this.get('splash')) {
      return `${ENV.APP.API_HOST}/${this.get('splash.original_image.desktop.url')}`;
    }
    return '/assets/images/otb-bg.png'
  }

  get splashBackground() {
    return new htmlSafe(
      `background: url(${this.splashUrl}); background-size: cover;`
    );
  }

  get safeDescription() {
    return new htmlSafe(
      this.get('description')
    );
  }

  _positionSort = Object.freeze(['position:asc']);

  @sort('tourStops', '_positionSort')
  sortedStops;

  @sort('tourMedia', '_positionSort')
  sortedMedia;

  @sort('tourFlatPages', '_positionSort')
  sortedFlatPages;
}
