import Service, {
  inject as service
} from '@ember/service';

export default Service.extend({
  fastboot: service(),
  // tenant() {
  //   return new Promise(this.setTenant(window.location.href.split('/')[3]));
  // },
  init() {
    this._super(...arguments);
    // this.setProperties({ tenant: 'public' });
    // this.setTenant(window.location.href.split('/')[3]);
  },

  tenant: 'public',

  setTenant() {
    const path = window.location.pathname;
    const pathParts = path.replace(/\/$/, '').split('/');
    const firstSubDir = pathParts[1];
    /*
       Like the router, this is complicated and should be given more thought.
       Reasons we want to switch to the public tenant/scheme:
       1) Not going to a multi-site instance
       2) Super user going to the admin interface
       3) User trying to login
    */
    if (
      !firstSubDir ||
      parseInt(firstSubDir) ||
      (firstSubDir === 'admin' && pathParts.length === 2) ||
      // Reverse pathParts without modifying it.
      (firstSubDir === 'admin' && [...pathParts].reverse()[0] === 'users') ||
      firstSubDir === 'tour' ||
      firstSubDir === 'tours' ||
      firstSubDir === 'login' ||
      firstSubDir.length === 0
    ) {
      this.setProperties({
        tenant: 'public'
      });
    } else if (firstSubDir === 'admin' && pathParts.length > 2) {
      this.setProperties({
        tenant: pathParts[2]
      });
    } else {
      this.setProperties({
        tenant: firstSubDir
      });
    }
  },

  setTenantFromContext(context) {
    this.setProperties({
      tenant: context
    });
  }
});
