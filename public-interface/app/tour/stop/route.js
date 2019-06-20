import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class TourStopRoute extends Route {
  @service deviceContext;
  @service locationPermissions;

  model(params) {
    return hash({
      tourStop: this.store.queryRecord('tour-stop', {
        slug: params.stop_slug,
        tour: this.modelFor('tour').id
      }),
      tour: this.store.findRecord('tour', this.modelFor('tour').id)
    });
  }

  afterModel(model) {
    if (!this.deviceContext.isDesktop && this.locationPermissions.tour == null) {
      this.locationPermissions.setTour(model.tour);
    } else {
      this.controllerFor('tour').setActiveStop.perform(this.modelFor('tour').stops, model.tourStop, true);
    }
  }

  titleToken() {
    const model = this.modelFor('tour.stop').tourStop;
    return model.stop.get('title');    
  }  

  headTags() {
    const model = this.modelFor('tour.stop').tourStop;
    return [
      {
        type: 'meta',
        tagId: 'meta-og-title-tag',
        attrs: {
          property: 'og:title',
          content: model.stop.get('title')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-description-tag',
        attrs: {
          property: 'og:description',
          content: model.stop.get('metadescription')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-image-tag',
        attrs: {
          property: 'og:image',
          content: model.stop.get('insecureSplash')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-image-height',
        attrs: {
          property: 'og:image:height',
          content: model.stop.get('splashHeight')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-width-tag',
        attrs: {
          property: 'og:image:width',
          content: model.stop.get('splashWidth')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-secure-image-tag',
        attrs: {
          property: 'og:image:secure_url',
          content: model.stop.get('splashUrl')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-title',
        attrs: {
          name: 'twitter:title',
          content: model.stop.get('title')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-description',
        attrs: {
          name: 'twitter:description',
          content: model.stop.get('metadescription')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-image',
        attrs: {
          name: 'twitter:image',
          content: model.stop.get('splashUrl')
        }
      }
    ]
  }
}
