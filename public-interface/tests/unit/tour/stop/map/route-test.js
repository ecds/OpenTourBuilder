import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tour/stop/map', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tour/stop/map');
    assert.ok(route);
  });
});
