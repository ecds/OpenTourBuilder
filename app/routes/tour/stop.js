import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('tour_stop', params.stop_id)
    }

});
