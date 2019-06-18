import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  tenant: service(),
  beforeModel() {
    this.tenant.setTenant();
  },



  model(params) {
    console.log(this.tenant.tenant, params)
    return this.store.queryRecord('tour-set',  { subdir: this.tenant.tenant });
  },
  // actions: {
  //   delete(model) {
  //     this.store
  //       .findRecord('tour', model.id, { backgroundReload: false })
  //       .then(tour => {
  //         tour.destroyRecord();
  //       });
  //     // this.store.destroyRecord('tour', model);
  //   }
  // }
});
