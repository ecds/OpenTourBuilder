/**
 * Theme initializer
 *
 * Supports auto injecting theme service app-wide.
 */
export function initialize() {
  const application = arguments[1] || arguments[0];

  application.inject('controller', 'theme', 'service:theme');
  application.inject('component', 'theme', 'service:theme');
  application.inject('route', 'theme', 'service:theme');
  application.inject('view', 'theme', 'service:theme');
}

export default {
  name: 'theme',
  initialize
};
