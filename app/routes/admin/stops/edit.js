import OtbCrudRoute from '../../otb-crud';

export default OtbCrudRoute.extend({
  model(params) {
    return this.store.findRecord('stop', params.stop_id);
  }
});
