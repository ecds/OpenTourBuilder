import GoogleOauth2BearerV2Provider from 'torii/providers/google-oauth2-bearer-v2';

export default GoogleOauth2BearerV2Provider.extend({
  fetch(data) {
    return data;
  }
});
