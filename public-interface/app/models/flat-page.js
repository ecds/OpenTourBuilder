import DS from 'ember-data';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

const { Model, attr, hasMany } = DS;

export default class FlatPageModel extends Model {
  @attr('string') title;
  @attr('string') slug;
  @attr('string', { defaultValue: '' }) content; 
  @hasMany('tour') tours;
  @hasMany('tour-flat-pages') tourFlatPages;
  
  @computed('content')
  get safeContent() {
    return new htmlSafe(this.get('content'));
  }
}
