import { get, set } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import UIkit from 'uikit';

export default Component.extend({
  store: service(),

  actions: {
    saveModel(model) {
      model.save().then(() => {
        UIkit.notification({
          message: `${model.title} Saved!`,
          status: 'success'
        });
      }),
      /* eslint-disable */
      // Prettier wants spaces, but then complains about indentation
      error => {
        UIkit.notification({
          message: `ERROR: ${error.message}`,
          stauts: 'danger'
        });
      };
      /* eslint-enable */
    }
  }
});
