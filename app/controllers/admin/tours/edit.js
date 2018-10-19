import Controller from '@ember/controller';
import { A } from '@ember/array';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import UIkit from 'uikit';

export default Controller.extend({
  store: service(),

  tenant: service(),

  fileQueue: service(),

  geocoder: service(),

  videoCode: null,

  modelToReorder: null,

  newTourStop: null,

  // init() {
  //   this._super(...arguments);
  // },

  saveTask: task(function*(model) {
    yield model.save().then(() => {
      UIkit.notification({
        message: `${get(model, 'title')} SAVED!`,
        status: 'success'
      });
    });
    yield this.model.save();
  }).drop(),

  saveNewStop: task(function*(newTourStop) {
    try {
      yield get(newTourStop, 'stop').save();
      // yield newTourStop.save();
      // yield this.model.save();
      // yield newStop.save();
      // yield this.model.save().then(() => {
      //   const stopListElement = document.getElementById('stopList');
      //   UIkit.accordion(stopListElement).toggle(-1);
      // });
      // stopListElement.lastElementChild.scrollIntoView();
      // .then(() => {
      //   UIkit.notification({
      //     message: `added ${get(newStop, 'title')}`,
      //     status: 'success'
      //   });
      //   this.send('resetNewStop');
      //   const stopListElement = document.getElementById('stopList');
      //   UIkit.accordion(stopListElement).toggle(-1);
      //   stopListElement.lastElementChild.scrollIntoView();
      // });
    } catch (e) {
      UIkit.notification({
        message: `error: ${e}`,
        status: 'error'
      });
    }
  }),

  actions: {
    saveModel(model) {
      let isNew = model.id === null ? true : false;
      model.save().then(() => {
        if (isNew) {
          this.transitionToRoute('admin.tours.edit', model);
        }
        UIkit.notification({
          message: 'Media Saved!',
          status: 'success'
        });
      }),
      /* eslint-disable */
        // Prettier wants spaces, but then complains
        // about indentation
        error => {
          UIkit.notification({
            message: `ERROR: ${error.message}`,
            stauts: 'danger'
          });
        };
      /* eslint-enable */
    },

    deleteModel(item) {
      this.store
        .peekRecord('tour-medium', get(item, 'id'))
        .destroyRecord()
        .then(() => {
          UIkit.notification({
            message: 'Media Deleted!',
            status: 'success'
          });
        });
    },

    addVideo() {
      let medium = this.store.createRecord('medium', {
        video: get(this, 'videoCode'),
        tours: A([this.model])
      });

      medium.save().then(() => {
        this.model.save().then(() => {
          this.store.queryRecord('tour-medium', {
            medium_id: medium.id,
            tour_id: this.model.id
          });
          set(this, 'videoCode', null);
        });
      });
    },

    newStop() {
      let newStop = this.store.createRecord('stop', {
        title: '-'
      });
      let newTourStop = this.store.createRecord('tour-stop', {
        tour: this.model,
        stop: newStop
      });
      // this.setProperties({ newTourStop: stop });
      // get(this, 'saveNewStop').perform(stop);
      // get(this, 'model.sortedTourStops').pushObject(stop);
      const stopListElement = document.getElementById('stopList');
      UIkit.accordion(stopListElement).toggle(-1);
      get(this, 'saveNewStop').perform(newTourStop);
    },

    resetNewStop() {
      get(this, 'newTourStop').deleteRecord();
      // UIkit.accordion(document.getElementById('newStopForm')).toggle(0);
    },

    reordered(event) {
      let index = 1;
      for (let item of event.target.children) {
        console.log(item);
        set(this, 'modelToReorder', item.attributes['data-model'].value);
        let storeItem = this.store.peekRecord(
          get(this, 'modelToReorder'),
          item.attributes['data-id'].value
        );
        storeItem.setProperties({
          position: index
        });
        index++;
      }

      this.store
        .peekAll(get(this, 'modelToReorder'))
        .save()
        .then(() => {
          UIkit.notification({
            message: 'New order saved.',
            pos: 'top-right'
          });
        });
    },

    rollBackStop(tourStop) {
      // get(tourStop, 'stop').rollbackAttributes();
      // UIkit.accordion(document.getElementById('stopList')).toggle(
      //   get(tourStop, 'position') - 1
      // );
    }
  }
});
