import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DS from 'ember-data';
import ENV from '../config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend({
  tenant: service(),
  fastboot: service(),
  host: function host() {
    console.log(`http://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`)
    return `https://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`;
    // return 'http://jay.otb.org:3000'
  }.property()
  // host: computed('tenent.domain', function() {
  //   return `https://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`;
  // })
});
