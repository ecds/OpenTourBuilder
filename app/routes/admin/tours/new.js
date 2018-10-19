import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('tour', { description: '' });
  },

  renderTemplate(controller, model) {
    this.render('admin/tours/edit', {
      model
    });
  },

  actions: {
    saveTour(model) {
      model.save();
    }
  }
});
