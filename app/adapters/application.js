import { inject as service } from '@ember/service';
import DS from 'ember-data';
import ENV from '../config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
  tenant: service(),
  fastboot: service(),
  host: function host() {
    return `https://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`;
  }.property()
});
