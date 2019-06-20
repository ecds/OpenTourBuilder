import GoogleOauth2BearerV2 from 'torii/providers/google-oauth2-bearer-v2';

export default GoogleOauth2BearerV2.extend({
  fetch(data) {
    return data;
  }
});
