import { get } from '@ember/object';

import { inject as service } from '@ember/service';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from '../config/environment';

export default Torii.extend({
  torii: service(),
  ajax: service(),
  session: service(),
  currentUser: service(),
  tenant: service(),

  authenticate() {
    const ajax = this.get('ajax');

    return this._super(...arguments).then(data => {
      console.log(data);
      let grantType = 'password';
      if (data.provider.includes('google')) {
        grantType = 'google_auth_code';
      } else if (data.provider.includes('facebook')) {
        grantType = 'facebook_auth_code';
      }
      return ajax
        .request(`${ENV.APP.API_HOST}/${this.get('tenant.tenant')}/token`, {
          type: 'POST',
          dataType: 'json',
          data: {
            grant_type: grantType,
            auth_code: data.access_token
          }
        })
        .then(response => {
          const authData = {
            access_token: response.access_token,
            provider: data.provider
          };
          get(this, 'currentUser').load();
          return authData;
        });
    });
  },

  logOut() {
    const ajax = get(this, 'ajax');

    return this._super(
      ...arguments.then(function dip() {
        return ajax.request(
          `${ENV.APP.API_HOST}/${this.get('tenant.tenant')}/revoke`,
          {
            type: 'POST',
            dataType: 'json',
            data: {
              token: get(this, 'session.content.authenticated.access_token')
            }
          }
        );
      })
    );
  }
});
