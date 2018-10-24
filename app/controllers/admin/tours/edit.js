import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import CrudActionsMixin from '../../../mixins/crud-actions';
import UIkit from 'uikit';

export default Controller.extend(CrudActionsMixin, {
  store: service(),

  tenant: service(),


  geocoder: service(),

  taskMessage: null,

  screenBlocker: computed('taskMessage', () => {
    return UIkit.modal(document.getElementById('task-running'), {
      escClose: false,
      bgClose: false
    });
  }),

  newStop: task(function*() {
    this.set('taskMessage', 'Creating new stop...');
    const modal = this.get('screenBlocker');
    modal.show();
    const stopListElement = document.getElementById('stopList');
    const accordion = UIkit.accordion(stopListElement);
    // Close any open items in the accordion.
    accordion.toggle(-1);
    try {
      let newStop = yield this.get('createHasMany').perform({
        newType: 'stop',
        containerObj: this.model
      });
      this.set('taskMessage', 'Adding new stop to tour...');
      // Add a onetime event listener for when the new stop is opened.
      // Scroll it to the top and close the modal.
      UIkit.util.once(stopListElement, 'shown', () => {
        document
          .getElementById(`${newStop.slug}-${newStop.id}`)
          .scrollIntoView();
        window.scrollBy(0, -100);
        newStop.setProperties({
          title: ''
        });
        modal.hide();
      });
      // Watch for the new stop to be added to the list and open it.
      let checkExist = yield setInterval(() => {
        if (document.getElementById(`${newStop.slug}-${newStop.id}`)) {
          clearInterval(checkExist);
          let child = document.getElementById(`${newStop.slug}-${newStop.id}`);
          let parent = child.parentNode;
          accordion.toggle(
            Array.prototype.indexOf.call(parent.children, child)
          );
        }
      }, 300);
    } catch (error) {
      this.set('taskMessage', `ERROR: ${error.message}`);
    }
    // Destroy the modal but leave the element for next time.
    modal.$destroy;
  }),

  reorder: task(function*(event) {
    // Warn if person tries to leave page before everything has been saved.
    window.onbeforeunload = () => {
      return 'Not all updates have finished saving.';
    };
    // Wait a bit to make sure the DOM is settled.
    yield timeout(500);
    this.set(
      'taskMessage',
      `Saving new order 0 of ${event.target.children.length}`
    );
    const modal = this.get('screenBlocker');
    modal.show();
    let index = 1;
    let modelToReorder = '';
    for (let item of event.target.children) {
      modelToReorder = item.attributes['data-model'].value;
      let storeItem = this.store.peekRecord(
        modelToReorder,
        item.attributes['data-id'].value
      );
      storeItem.setProperties({
        position: index
      });
      this.set(
        'taskMessage',
        `Saving new order ${index} of ${event.target.children.length}`
      );
      index++;
      yield this.get('saveRecord').perform(storeItem);
    }
    this.set('taskMessage', 'ALL DONE!');
    yield timeout(300);
    modal.hide();
    modal.$destroy;
    window.onbeforeunload = null;
  }),

  addVideo: task(function*(videoCode, parentObj) {
    this.set('taskMessage', 'Adding video...');
    const modal = this.get('screenBlocker');
    modal.show();
    let options = {
      newType: 'medium',
      containerObj: parentObj,
      attrs: {
        video: videoCode
      }
    };
    yield this.get('createHasMany').perform(options);
    modal.hide();
    modal.$destroy;
  }),

  actions: {
    doNothing() {
      return true;
    }
  }
});
