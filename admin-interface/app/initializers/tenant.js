export default {
  name: 'tenant',
  initialize(application) {
    application.inject('route', 'tenant', 'service:tenant');
    application.inject('controller', 'tenant', 'service:tenant');
    application.inject('component', 'tenant', 'service:tenant');
  }
};
