import { inject as service } from '@ember/service';
import DS from 'ember-data';
import ENV from '../config/environment';

const { JSONAPIAdapter } = DS;
// const { get, inject: { service } } = Ember;

export default JSONAPIAdapter.extend({
  tenant: service(),
  host: function host() {
    return `http://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`;
    // return 'http://jay.otb.org:3000'
  }.property()
});
