import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  fastboot: service(),
  tenant: 'public',

  setTenant(path = window.location.pathname) {
    if (typeof path !== 'string') {
      return false;
    }
    const pathParts = path.replace(/\/$/, '').split('/');
    const firstSubDir = pathParts.length > 1 ? pathParts[1] : pathParts[0];
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
      (firstSubDir === 'admin' && pathParts.length <= 2) ||
      // Reverse pathParts without modifying it.
      (firstSubDir === 'admin' && [...pathParts].reverse()[0] === 'users') ||
      firstSubDir === 'tour' ||
      firstSubDir === 'tours' ||
      firstSubDir === 'login' ||
      firstSubDir === 'index' ||
      pathParts[2] === 'users' ||
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
    if (isEmpty(context)) {
      this.setTenant();
    } else if (typeof context === 'string') {
      this.setProperties({
        tenant: context
      });
    } else if (isNaN(context[0]) && typeof context[0] === 'string') {
      this.setProperties({
        tenant: context.firstObject
      });
    } else if (context.params[context.targetName].hasOwnProperty('tenant')) {
      this.setProperties({
        tenant: context.params[context.targetName].tenant
      });
    } else {
      this.setTenant();
    }
  }
});
