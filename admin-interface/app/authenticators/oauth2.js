import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from '../config/environment';
import { inject as service } from '@ember/service';

export default OAuth2PasswordGrant.extend({
  tenant: service(),
  serverTokenEndpoint: `${ENV.APP.API_HOST}/token`,
  serverTokenRevocationEndpoint: `${ENV.APP.API_HOST}/revoke`
});
