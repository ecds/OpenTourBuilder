import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  session: service(),
  currentUser: service(),
  classNames: ['login-form'],

  authenticating: false,

  actions: {
    authenticateWithFacebook() {
      this.set('authenticating', true);
      this.get('session.torii')
        .authenticate('authenticator:torii', 'facebook')
        .then(
          () => {
            this.set('authenticating', false);
            this.get('currentUser').load();
          },
          e => {
            this.set('authenticating', false);
            this.set('errorMessage', e.error || e);
          }
        );
    },

    authenticateWithGoogle() {
      this.set('authenticating', true);
      this.get('session')
        .authenticate('authenticator:torii', 'google-oauth2-bearer-v2')
        .then(
          () => {
            this.set('authenticating', false);
            this.get('currentUser').load();
          },
          e => {
            this.set('authenticating', false);
            this.set('errorMessage', e.error || e);
          }
        );
    }
  }
});
