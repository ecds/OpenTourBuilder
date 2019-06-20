import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class ThemeService extends Service {
  @service store;

  tour = this.tour || null;
  base = this.base || 'default';
  // theme = this.theme || 'dark';

  // constructor() {
  //   super(...arguments);
  //   this.store.findAll('theme');
  // }

  @computed('tour', 'base')
  get name() {
    return `${this.base}-${this.theme}`
  }

  setTour(tour) {
    this.set('theme', tour.theme_title);
  }
}
