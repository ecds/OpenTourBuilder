import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
// import { inject as service } from '@ember/service';

export default Route.extend({
  // tenant: service(),

  // beforeModel() {
  //   this._super(...arguments);
  //   this.store.unloadAll('tour');
  // },

  model(params) {
    // return this.store.findRecord('tour', params.tour_id);
    return {
      modelId: params.tour_id
    };
  },

  getModel: task(function*(params) {
    try {
      return yield this.store.findRecord('tour', params.tour_id);
    } catch (nah) {
      return nah;
    }
  }),

  actions: {
    doNothing() {
      return true;
    }
  }
});
