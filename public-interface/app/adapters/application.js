import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  fastboot: service(),
  tenant: service(),
  session: service(),
  cookies: service(),

  host: computed( function(){
    return `${ENV.APP.API_HOST}/${this.tenant.currentTenant}`;
  }),
  
  authorize(xhr) {
    let cookieService = this.get('cookies');
    let cookies = cookieService.read();
    let access_token = JSON.parse(cookies['ember_simple_auth-session']).authenticated.access_token;
    xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
  }
});
