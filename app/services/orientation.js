import Service from '@ember/service';

export default Service.extend({
  orientationClass: 'portrait',
  windowHeight: null,

  init() {
    this._super(...arguments);
    this.windowOrientation();
    // console.log('orientation', this.get('orientationClass'));
    if (typeof ScreenOrientation !== 'undefined') {
      ScreenOrientation.onchange = this.setOrientation();
    }

    window.addEventListener('resize', () => {
      this.windowOrientation();
    });
  },

  windowOrientation() {
    console.log('resize');
    this.set('windowHeight', window.innerHeight);
    if (window.outerHeight > window.outerWidth) {
      this.setProperties({ orientationClass: 'portrait' });
    } else {
      this.setProperties({ orientationClass: 'landscape' });
    }
  },

  setOrientation() {
    this.set('windowHeight', window.innerHeight);
    if (screen.orientation.angle === -90 || screen.orientation.angle === 90) {
      this.setProperties({ orientationClass: 'landscape' });
    } else {
      this.setProperties({ orientationClass: 'portrait' });
    }
  }

  // isLandscape() {

  // }
});
