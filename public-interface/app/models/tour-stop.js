import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model, attr, belongsTo } = DS;

export default class TourStopModel extends Model {

  @belongsTo('tour') tour;
  @belongsTo('stop') stop;
  @attr('string') slug;
  @attr('number') position;
  @attr() next;
  @attr() previous;
  @attr('string') next_slug;
  @attr('string') previous_slug;
  @attr('boolean') active;

  @computed('position')
  get labelContent() {
    return this.get('position').toString();
  }

  @computed('active')
  get label() {
    return {
      color: 'white',
      text: this.get('labelContent')
    };
  }
}
