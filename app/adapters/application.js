import DS from 'ember-data';
import Ember from 'ember';
import ENV from '../config/environment';

const { JSONAPIAdapter } = DS;
const { get, inject: { service } } = Ember;

export default JSONAPIAdapter.extend({
    tenant: service(),
    fastboot: service(),
    host: function host() {
        return `http://${get(this, 'tenant.domain')}.${ENV.APP.API_HOST}`;
    }.property()
});
