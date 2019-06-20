import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | tour/overview/stops', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:tour/overview/stops');
    assert.ok(controller);
  });
});
