import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    uploadImage() {
      let file = document.getElementById('file-field').files[0];
      console.log(file);
      let photo = this.store.createRecord('medium', {
        title: file.name,
        original_image: file
      });
      photo.save();
    }
  }
});
