import { test } from 'qunit';
import moduleForAcceptance from 'open-tour-builder/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list tours');

test('visiting /', function(assert) {
  server.createList('tour', 10);
  visit('/');

  andThen(function() {
    // return pauseTest();
    assert.equal(currentURL(), '/');
    assert.equal( find('li').length, 10 );
    // assert.equal( find('p').length, 10);
  });
});
