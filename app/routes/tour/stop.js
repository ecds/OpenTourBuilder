import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    if (this.store.hasRecordForId('tour-stop', params.stop_id)) {
      return this.store.peekRecord('tour-stop', params.stop_id);
    }
    return this.store.findRecord('tour-stop', params.stop_id)
  }

});
