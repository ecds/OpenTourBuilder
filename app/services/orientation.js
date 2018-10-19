import Service from '@ember/service';

export default Service.extend({
  orientationClass: 'portrait',

  init() {
    this._super(...arguments);
    if (window.outerHeight > window.outerWidth) {
      this.setProperties({ orientationClass: 'portrait' });
    } else {
      this.setProperties({ orientationClass: 'landscape' });
    }
    window.addEventListener('orientationchange', () => {
      if (window.orientation === -90 || window.orientation === 90) {
        this.setProperties({ orientationClass: 'landscape' });
      } else {
        this.setProperties({ orientationClass: 'portrait' });
      }
    });
  }
});
