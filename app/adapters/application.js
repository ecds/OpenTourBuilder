import DS from 'ember-data';
import Ember from 'ember';
import ENV from '../config/environment';

const { inject: { service } } = Ember;

const { JSONAPIAdapter } = DS;
// const { get, inject: { service } } = Ember;

export default JSONAPIAdapter.extend({
    tenant: service(),
    host: function host() {
        return `http://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`;
        // return 'http://jay.otb.org:3000'
    }.property()
});
