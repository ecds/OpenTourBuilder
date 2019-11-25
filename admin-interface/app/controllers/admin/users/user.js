import Controller from '@ember/controller';
import CrudActionsMixin from '../../../mixins/crud-actions';

export default Controller.extend(CrudActionsMixin, {
  actions: {
    addRemoveSet(parent, child, event) {
      let options = {
        relationType: event.target.name,
        parentObj: parent,
        childObj: child
      };
      if (event.target.checked) {
        this.get('createHasMany').perform(options);
      } else {
        this.get('deleteHasMany').perform(options);
      }
    }
  }
});
