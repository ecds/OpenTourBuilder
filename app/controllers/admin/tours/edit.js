import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import CrudActionsMixin from '../../../mixins/crud-actions';
import UIkit from 'uikit';
import ENV from '../../../config/environment';

export default Controller.extend(CrudActionsMixin, {
  store: service(),
  tenant: service(),
  geocoder: service(),
  taskMessage: null,
  env: ENV,

  mapTypes: ['roadmap', 'satellite', 'hybrid', 'terrain'],

  screenBlocker: computed('taskMessage', () => {
    return UIkit.modal(document.getElementById('task-running'), {
      escClose: false,
      bgClose: false
    });
  }),

  waitForElement: task(function*(element, accordion) {
    // TODO: Use Ember Concurrency `waitForProperty`
    let checkExist = yield setInterval(() => {
      if (document.getElementById(element)) {
        clearInterval(checkExist);
        let child = document.getElementById(element);
        let parent = child.parentNode;
        accordion.toggle(Array.prototype.indexOf.call(parent.children, child));
      }
    }, 300);
    return checkExist;
  }),

  showTaskMessage: task(function*(message) {
    this.set('taskMessage', message);
    return yield this.get('screenBlocker').show();
  }),

  clearTaskMessage: task(function*() {
    this.set('taskMessage', null);
    return yield this.get('screenBlocker').hide();
  }),

  newStop: task(function*(tour) {
    yield this.get('showTaskMessage').perform({
      message: 'Creating new stop...',
      type: 'success'
    });
    const stopListElement = document.getElementById('stopList');
    const accordion = UIkit.accordion(stopListElement);
    // Close any open items in the accordion.
    accordion.toggle(-1);
    try {
      this.set('taskMessage', {
        message: 'Adding new stop to tour...',
        type: 'success'
      });
      let newStop = yield this.get('createHasMany').perform({
        relationType: 'stop',
        parentObj: tour
      });
      newStop.setProperties({
        title: new Date().getTime().toString()
      });
      yield this.get('clearTaskMessage').perform();
      yield this.get('waitForElement').perform(
        `${newStop.slug}-${newStop.id}`,
        accordion
      );
    } catch (error) {
      this.set('taskMessage', `ERROR: ${error.message}`);
    }
    // Destroy the modal but leave the element for next time.
    this.get('screenBlocker').$destroy;
  }),

  newPage: task(function*(tour) {
    yield this.get('showTaskMessage').perform({
      message: 'Creating new page...',
      type: 'success'
    });
    const pageListElement = document.getElementById('pageList');
    const accordion = UIkit.accordion(pageListElement);
    // Close any open items in the accordion.
    if (accordion.items.length > 1) {
      accordion.toggle(-1);
    }
    try {
      this.set('taskMessage', {
        message: 'Adding new page to tour...',
        type: 'success'
      });
      let newPage = yield this.get('createHasMany').perform({
        relationType: 'flat_page',
        parentObj: tour
      });
      newPage.setProperties({
        title: ''
      });
      yield this.get('clearTaskMessage').perform();
      yield this.get('waitForElement').perform(`page-${newPage.id}`, accordion);
    } catch (error) {
      this.set('taskMessage', `ERROR: ${error.message}`);
    }
    // Destroy the modal but leave the element for next time.
    this.get('screenBlocker').$destroy;
  }),

  addVideo: task(function*(videoCode, parentObj) {
    this.set('taskMessage', { message: 'Adding video...', type: 'success' });
    const modal = this.get('screenBlocker');
    modal.show();
    if (parentObj.hasOwnProperty('content')) {
      parentObj = parentObj.content;
    }
    let options = {
      relationType: 'medium',
      parentObj: parentObj,
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
    },

    scrollElementToTop(event) {
      let path = event.path || (event.composedPath && event.composedPath());
      path[2].scrollIntoView();
      window.scrollBy(0, -100);
    }
  }
});
