import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    console.log(this.get('theme.tour.id'))
    // return this.store.queryRecord('tour', { slug: params.tour_slug });
    return this.store.queryRecord('tour-stop', {
      slug: params.stop_slug,
      tour: this.get('theme.tour.id')
    });
  }
});
