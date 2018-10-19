import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  fastboot: service(),
  tenant: service(),

  host: function host() {
    // const currentUrl = window.location.pathname.replace(/\/$/, '').split('/');
    // const firstSubDir = currentUrl[1];
    // // alert(currentUrl[2])
    // if (
    //   (firstSubDir === 'admin' && currentUrl.length === 2) ||
    //   firstSubDir === 'tour' ||
    //   firstSubDir === 'tours' ||
    //   firstSubDir == 'login' ||
    //   firstSubDir.length === 0
    // ) {
    //   return `${ENV.APP.API_HOST}/public`;
    // } else if (firstSubDir === 'admin' && currentUrl.length > 2) {
    //   return `${ENV.APP.API_HOST}/${currentUrl[2]}`;
    // } else {
    //   return `${ENV.APP.API_HOST}/${firstSubDir}`;
    // }
    return `${ENV.APP.API_HOST}/${get(this, 'tenant.tenant')}`;
  }
    .property()
    .volatile(),

  authorize(xhr) {
    let { access_token } = this.get('session.data.authenticated');
    xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
  }
});
