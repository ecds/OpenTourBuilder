import Controller from '@ember/controller';
import CrudActionsMixin from '../../../mixins/crud-actions';

export default Controller.extend(CrudActionsMixin, {
  actions: {
    doNothing() {
      return true;
    }
  }
});
