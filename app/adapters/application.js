import { inject as service } from '@ember/service';
import DS from 'ember-data';
import ENV from '../config/environment';
import AdminAdapterMixin from 'ember-admin/mixins/admin-adapter-mixin'

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(AdminAdapterMixin, {
  tenant: service(),
  fastboot: service(),
  host: function host() {
    return `https://${this.get('tenant.domain')}.${ENV.APP.API_HOST}`;
  }.property()
});
