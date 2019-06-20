import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tour/flat-page', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tour/flat-page');
    assert.ok(route);
  });
});
