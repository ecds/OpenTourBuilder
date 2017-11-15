import { moduleFor, test } from 'ember-qunit';

moduleFor('service:tenant', 'Unit | Service | tenant', {
    // Specify the other units that are required for this test.
    needs: ['service:fastboot']
});

// Replace this with your real tests.
test('it exists', function(assert) {
    const service = this.subject();
    assert.ok(service);
    assert.equal(service.get('domain'), 'localhost');
});
