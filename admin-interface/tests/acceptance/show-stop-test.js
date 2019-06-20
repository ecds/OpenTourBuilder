import { test } from 'qunit';
import moduleForAcceptance from 'open-tour-builder/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | show stop');

test('visiting /tour/1/stop', assert => {
  let tour = server.create('tours');
  let stop = server.create('tour_stop', {tour});
  visit(`/tour/${tour.id}/stop/${stop.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/tour/${tour.id}/stop/${stop.id}`);
  });
});
