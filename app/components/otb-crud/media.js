import Component from '@ember/component';
import { A } from '@ember/array';
import { computed, get, set } from '@ember/object';
import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import UIkit from 'uikit';

export default Component.extend({
  fileQueue: service(),
  store: service(),
  videoProviders: service(),
  videoPreview: {},
  //TODO: there should be a better way to get
  // if this is asking for tour or stop media.
  _modelName: computed(function() { //eslint-disable-line
    return get(this, 'model._internalModel.modelName');
  }),

  otherMedia: computed('', function() {
    return get(this, 'store').query('medium', {
      [`${this.model._internalModel.modelName}_id`]: this.model.id
    });
  }),

  uploadMedium: task(function*(file) {
    let medium = get(this, 'store').createRecord('medium', {
      [`${get(this, '_modelName')}s`]: A([this.model]),
      title: get(file, 'name'),
      original_image: file.blob
    });

    try {
      yield medium.save();
      let newRel = get(this, 'store')
        .queryRecord(`${get(this, '_modelName')}-medium`, {
          medium_id: medium.id,
          [`${get(this, '_modelName')}_id`]: get(this, 'model').id
        })
        .then(() => {
          UIkit.notification({
            messagge: `${medium.title} Added!`,
            status: 'success'
          });
        });
      yield newRel;
      yield get(this, 'model').save();
    } catch (error) {
      debug(error);
      UIkit.notification({
        message: error.message,
        status: 'danger'
      });
    }
  })
    .maxConcurrency(3)
    .enqueue(),

  removeMedia: task(function*(item) {
    // let mediumRel = get(this, 'store').peekRecord(
    //   [item._internalModel.modelName],
    //   item.id
    // );
    let model = get(this, 'model');
    let medium = get(item, 'medium');
    model.get('sortedMedia').removeObject(item);
    model.get(`${get(this, '_modelName')}_media`).removeObject(item);
    get(medium, `${get(this, '_modelName')}s`).removeObject(model);
    try {
      // yield item.destroyRecord();
      yield model.save().then(() => {
        UIkit.notification({
          message: 'Media Deleted!',
          status: 'success'
        });
      });
    } catch (error) {
      debug(error);
      UIkit.notification({
        message: error.message,
        status: 'danger'
      });
    }
  }),

  // addMediumToModel(medium) {
  //   get(this, 'model')
  //     .save()
  //     .then(() => {
  //       get(this, 'store')
  //         .queryRecord(`${get(this, '_modelName')}-medium`, {
  //           medium_id: medium.id,
  //           [`${get(this, '_modelName')}_id`]: get(this, 'model').id
  //         })
  //         .then(saved => {
  //           UIkit.notification(
  //             `<img src='${get(saved, 'medium.baseUrl')}${get(
  //               saved,
  //               'medium.mobile'
  //             )}' />`,
  //             'success'
  //           );
  //         });
  //     });
  // },

  actions: {
    saveModel(item) {
      let medium = this.get('store').peekRecord('medium', item.get('id'));
      medium.save().then(() => {
        UIkit.notification({
          message: 'Media Saved!',
          status: 'success'
        }, error => {
        UIkit.notification({
          message: `ERROR: ${error.message}`,
          status: 'danger'
        })
      });
    })
  },

    deleteModel(item, model) {
      item.destroyRecord().then(() => {
        model.save().then(() => {
          UIkit.notification({
            message: 'Media Deleted!',
            status: 'success'
          });
        });
      });
    },

    upload(file) {
      this.sendAction(get(this, 'upload'), file);
    },

    getVideo(code) {
      get(this, 'videoProviders').getEmbed(code);
    },

    addVideo() {
      let medium = get(this, 'store').createRecord('medium', {
        video: get(this, 'videoCode'),
        [`${get(this, '_modelName')}s`]: A([get(this, 'model')])
      });

      medium.save().then(() => {
        get(this, 'model')
          .save()
          .then(() => {
            get(this, 'store').queryRecord(
              `${get(this, '_modelName')}-medium`,
              {
                medium_id: medium.id,
                [`${get(this, '_modelName')}_id`]: get(this, 'model').id
              }
            );
            set(this, 'videoCode', null);
          });
      });
    },

    addExisting(model, event) {
      // This one is complicated. I hope there is a better way to do this.
      // The main problem is getting the id of the new `stop-medium` object
      // so it can be added to the DOM for reorders.
      // Furthermore, the positions for each `stop-medium` have to be updated
      // to make sure everything stays in the inteneded order.
      let mediumElementToAdded = event.detail[1];
      let mediaCollectionElement = event.srcElement;
      let position = 0;

      let mediumToAdd = get(this, 'store').peekRecord(
        'medium',
        mediumElementToAdded.getAttribute('data-id')
      );

      // Loop through all the stop's or tour's media.
      Array.from(mediaCollectionElement.children).forEach((el, index) => {
        index = index + 1;
        // If the src attribute of the image tag matches the image that was just added,
        // set the value for the new medium's position based on its index in the array.
        if (
          el.firstElementChild.getAttribute('src') ===
          `${get(mediumToAdd, 'baseUrl')}${get(mediumToAdd, 'mobile')}`
        ) {
          position = index;
          // Remove the DOM element that was dragged from other media group. A new element
          // with the added media will be created when we create the new record.
          mediumElementToAdded.remove();
        } else if (el.hasAttribute('data-id')) {
          // The new element will not have the `data-id` attribute. But for all the
          // existing ones, we need to update their position based on their position
          // in the array.
          // TODO: break this out into a funcion that can be resued by the reorder action.
          let existingMedium = get(this, 'store').peekRecord(
            `${get(this, '_modelName')}-medium`,
            el.attributes['data-id'].value
          );

          existingMedium.setProperties({
            position: index
          });
        }
      });

      let addedMedium = get(this, 'store').createRecord(
        `${get(this, '_modelName')}-medium`,
        {
          medium: mediumToAdd,
          [`${get(this, '_modelName')}`]: get(this, 'model'),
          position
        }
      );

      addedMedium.save().then(newMediumAdded => {
        // The template does not update with the id of the new record.
        // There has to be a better way to do this.
        let newMediumElement = mediaCollectionElement.children[position - 1];
        newMediumElement.setAttribute('data-id', newMediumAdded.id);
      });
    }
  }
});
