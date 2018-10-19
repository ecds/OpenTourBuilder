import LinkComponent from '@ember/routing/link-component';
import { set, get } from '@ember/object';

export default LinkComponent.extend({
  attributeBindings: ['dataTheme:data-theme'],
  dataTheme: 'default',
  didInsertElement() {
    set(this, 'dataTheme', get(this, 'theme.name'));
  },

  deviceorientation(event) {
    console.log(event);
  }
});
