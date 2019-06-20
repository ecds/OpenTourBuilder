import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  tenant: service(),
  session: service(),

  actions: {
    saveSomeThing(model) {
      model.save();
    }
  }
});
