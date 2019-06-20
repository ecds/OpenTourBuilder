import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tour/overview/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tour/overview/index');
    assert.ok(route);
  });
});
