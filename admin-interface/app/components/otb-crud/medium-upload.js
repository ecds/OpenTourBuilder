import Component from '@ember/component';

export default Component.extend({
  actions: {
    upload(mod, file) {
      this.get('uploadTask').perform(mod, file);
    }
  }
});
