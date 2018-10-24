import Component from '@ember/component';

export default Component.extend({
  actions: {
    upload(file) {
      this.get('uploadTask').perform(this.model, file);
    }
  }
});
