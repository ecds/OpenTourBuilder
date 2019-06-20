import Component from '@glimmer/component';
import ENV from '../../config/environment';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OtbMediaGalleryComponent extends Component {
  @service deviceContext;
  imageBasePath = ENV.APP.API_HOST;

  @action
  showEmbed(medium) {
    if (!medium.get('video')) return;
    medium.setProperties({ loadEmbed: true })
  }
}
