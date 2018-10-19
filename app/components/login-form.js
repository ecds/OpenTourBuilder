import Component from '@ember/component';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import UIkit from 'uikit';

export default Component.extend({
  tagName: '',
  session: service(),
  currentUser: service(),
  ajax: service(),
  store: service(),
  tenant: service(),
  torii: service(),
  // flashMessage: service(),
  classNames: ['login-form'],

  newLogin: {},

  accountCreated: false,

  signUp: false,

  showingPassword: false,

  authenticating: false,

  actions: {
    authenticateWithOAuth2() {
      set(this, 'authenticating', true);
      const { identification, password } = this.getProperties(
        'identification',
        'password'
      );

      get(this, 'session')
        .authenticate('authenticator:oauth2', identification, password)
        .then(
          () => {
            set(this, 'authenticating', false);
            get(this, 'currentUser').load();
            UIkit.modal(document.getElementById('ecds-login')).hide();
          },
          e => {
            set(this, 'authenticating', false);
            set(this, 'errorMessage', e.error || e);
          }
        );
    },

    authenticateWithFacebook() {
      set(this, 'authenticating', true);
      this.get('session.torii')
        .authenticate('authenticator:torii', 'facebook')
        .then(
          () => {
            set(this, 'authenticating', false);
            get(this, 'currentUser').load();
          },
          e => {
            this.set('authenticating', false);
            this.set('errorMessage', e.error || e);
          }
        );
    },

    authenticateWithGoogle() {
      // set(this, 'authenticating', true);
      // get(this, 'session.torii')
      //   .open('google-oauth2')
      //   .then(
      //     response => {
      //       get(this, 'session')
      //         .authenticate(response)
      //         .then(() => {
      //           set(this, 'authenticating', false);
      //           get(this, 'currentUser').load();
      //         });
      //     },
      //     e => {
      //       this.set('authenticating', false);
      //       this.set('errorMessage', e.error || e);
      //     }
      //   );
      set(this, 'authenticating', true);
      this.get('session')
        .authenticate('authenticator:torii', 'google-oauth2')
        .then(
          () => {
            set(this, 'authenticating', false);
            get(this, 'currentUser').load();
          },
          e => {
            this.set('authenticating', false);
            this.set('errorMessage', e.error || e);
          }
        );
    },

    startSignUp() {
      set(this, 'signUp', true);
      set(this, 'newLogin', get(this, 'store').createRecord('login', {}));
    },

    abortSignUp() {
      set(this, 'signUp', false);
      get(this, 'store').unloadAll('login');
    },

    signUpSubmit() {
      get(this, 'newLogin')
        .save()
        .then(() => {
          set(this, 'accountCreated', true);
          later(
            this,
            () => {
              // maybe we can not redirect
            },
            () => {
              // Error callback
              later(
                this,
                () => {
                  // clear
                },
                3000
              );
            }
          );
        });
    },
    cancel() {
      this.setProperties({
        signUp: false,
        login: false
      });
    }
  }

  // athorize(authData) {
  //   const ajax = get(this, 'ajax');
  //   let grant_type = 'password';

  //   if (authData.provider.includes('google')) {
  //     grant_type = 'google_auth_code';
  //   } else if (authData.provider.includes('facebook')) {
  //     grant_type = 'facebood_auth_code';
  //   }

  //   ajax.request(`https://${ENV.APP.API_HOST}/token`, {
  //     type: 'POST',
  //     dataType: 'json',
  //     data: {
  //       grant_type,
  //       auth_code: authData.authorizationToken
  //     }
  //   });
  // }
});
