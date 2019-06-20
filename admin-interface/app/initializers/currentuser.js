export default {
  name: 'currentUser',
  initialize(application) {
    application.inject('route', 'currentUser', 'service:currentUser');
    application.inject('controller', 'currentUser', 'service:currentUser');
    application.inject('component', 'currentUser', 'service:currentUser');
  }
};
