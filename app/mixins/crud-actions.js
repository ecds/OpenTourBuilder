import Mixin from '@ember/object/mixin';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { pluralize } from 'ember-inflector';
import UIkit from 'uikit';

export default Mixin.create({
  store: service(),
  tenant: service(),

  newRecord: task(function*(type, attrs) {
    attrs = attrs.hasOwnProperty('target') ? {} : attrs;
    try {
      let rec = yield this.store.createRecord(type, attrs);
      yield rec.save();
      if (type === 'tour') {
        let routeString = `admin.${pluralize(type)}.edit`;
        return this.transitionToRoute(routeString, this.tenant.tenant, rec);
      }
      return rec;
    } catch (error) {
      //
    }
  }),

  createHasMany: task(function*(options) {
    let attrs = isEmpty(options.attrs) ? {} : options.attrs;
    let newObj = this.store.createRecord(options.newType, attrs);
    options.containerObj
      .get(`${pluralize(options.newType)}`)
      .pushObject(newObj);
    yield this.get('saveRecord').perform(newObj);
    yield this.get('saveRecord').perform(options.containerObj);
    return yield newObj;
  }),

  deleteHasMany: task(function*(options) {
    let didConfirm = yield this.get('confirmDelete').perform();
    let objToRemove = options.objToRemove.hasOwnProperty('isFulfilled')
      ? options.objToRemove.content
      : options.objToRemove;
    if (didConfirm) {
      options.containerObj
        .get(`${pluralize(options.relationType)}`)
        .removeObject(objToRemove);
      yield options.containerObj.save();
      return true;
    }
  }),

  deleteRecord: task(function*(obj) {
    let didConfirm = yield this.get('confirmDelete').perform();
    if (didConfirm) {
      obj.deleteRecord();
      return yield obj.save();
    }
  }),

  confirmDelete: task(function*() {
    try {
      yield UIkit.modal.confirm('DELETE?');
      return true;
    } catch (nah) {
      return false;
    }
  }),

  saveRecord: task(function*(obj) {
    obj = obj.hasOwnProperty('isFulfilled') ? obj.content : obj;
    if (!obj.hasOwnProperty('store')) {
      console.error('You must pass a store object to saveRecord.');
      return false;
    }
    yield obj.save();
    return obj;
  }),

  uploadFile: task(function*(model, file) {
    this.set('taskMessage', 'Uploading file...');
    const modal = this.get('screenBlocker');
    modal.show();
    yield this.get('createHasMany').perform({
      newType: 'medium',
      containerObj: model,
      attrs: {
        original_image: file.blob
      }
    });
    modal.hide();
    modal.$destroy;
    return true;
  })
});
