import Component from '@glimmer/component';
import ENV from '../../config/environment';

export default class TourSplashBackgroundComponent extends Component {
  get backgroundImage() {
    if (this.args.tour.splash) {
      return `${ENV.APP.API_HOST}/${this.args.tour.splash.original_image.desktop.url}`;
    } else {
      return '/assets/images/otb-bg.png';
    }
  }

  get random() {
    return Math.floor(Math.random() * Math.floor(4)).toString();
  }
}
