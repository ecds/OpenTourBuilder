import Route from '@ember/routing/route';
import { get, set } from '@ember/object';
import UIkit from 'uikit';

export default Route.extend({
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
    },

    reordered(event) {
      let index = 1;
      for (let item of event.target.children) {
        // let modelToReorder = item.attributes['data-model'].value;
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
          UIkit.notification({ message: 'New order saved.', pos: 'top-right' });
        });
    }
  }
});
