import Route from '@ember/routing/route';

export default class TourFlatPageRoute extends Route {
  model(params) {
    return this.store.findRecord('flat-page', params.page_id );
  }
}
