import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service tenant;

  beforeModel() {
    this.tenant.set('currentTenant', 'public');
  }
  model() {
    return this.store.findAll('tourSet');
  }
}
