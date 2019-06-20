import { helper } from '@ember/component/helper';
import UIkit from 'uikit';

export function save(model) {
  model.save().then(
    () => {
      UIkit.notification('Model Saved', 'success');
    },
    error => {
      UIkit.notification(`ERROR SAVING: ${error.message}`);
    }
  );
}

export default helper(save);
