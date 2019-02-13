import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import UIkit from 'uikit';

export default Controller.extend({
  createTour: task(function*() {
    let newTour = this.store.createRecord('tour');
    yield newTour.save();
    return this.transitionToRoute(
      'admin.tours.edit',
      this.get('tenant.tenant'),
      newTour.id
    );
  }),

  actions: {
    togglePublish() {
      //
    },

    deleteTour(tour) {
      UIkit.modal.confirm(`Delete ${tour.title}?`).then(
        () => {
          tour.destroyRecord();
        },
        () => {
          console.log('Rejected.');
        }
      );
    }
  }
});
