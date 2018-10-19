import OtbCrudRoute from '../../otb-crud';

export default OtbCrudRoute.extend({
  model(params) {
    return this.store.findRecord('tour', params.tour_id);
  }
});
