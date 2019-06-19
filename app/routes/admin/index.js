import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  tenant: service(),

  // beforeModel() {
  //   // this.get('tenant').setTenant();
  //   return this.get('currentUser').load();
  // },

  // model() {
  //   if (this.get('currentUser.user.super')) {
  //     return {
  //       tours: this.get('getTours').perform(),
  //       tourSets: this.get('getTourSets').perform()
  //     };
  //   } else {
  //     return {
  //       tours: this.get('getTours').perform()
  //     };
  //   }
  // },

  getTours: task(function*() {
    // if (!this.currentUser.user.current_tenant_admin) return;
    return yield this.store.findAll('tour');
  }),

  getTourSets: task(function*() {
    if (!this.currentUser.user.tour_sets && !this.currentUser.user.super) {
      return yield this.get('getTours').perform();
    }
    return yield this.store.findAll('tour-set');
  })
});
