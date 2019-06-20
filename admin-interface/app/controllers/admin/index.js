import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { A } from '@ember/array';
import CrudActionsMixin from '../../mixins/crud-actions';
export default Controller.extend(CrudActionsMixin, {
  tenant: service(),
  currentUser: service(),
  newSite: null,
  modelsToUnload: A([
    'flat-page',
    'medium',
    'mode',
    'stop',
    'stop-medium',
    'theme',
    'tour',
    'tour-flat-page',
    'tour-medium',
    'tour-stop',
    'user'
  ]),

  createSite: task(function*() {
    let newSite = yield this.newSite.save();
    this.modelsToUnload.forEach(model => {
      this.store.unloadAll(model);
    });
    this.get('currentUser').load();
    return this.transitionToRoute('admin.tours.index', newSite.subdir);
  }),

  actions: {
    newSite() {
      this.set('newSite', this.store.createRecord('tour-set'));
    }
  }
});
