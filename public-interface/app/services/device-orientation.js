import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class DeviceOrientationService extends Service {
  @service fastboot;
  orientationClass = this.orientationClass || 'portrait';
  windowHeight = this.windowHeight || null;

  @computed('orientationClass')
  get isPortrait() {
    if (this.orientationClass == 'portrait') {
      return true;
    }
    return false;
  }

  constructor() {
    super(...arguments);
    if (this.fastboot.isFastBoot) return;
    
    if (typeof ScreenOrientation !== 'undefined') {
      ScreenOrientation.onchange = this.setOrientation();
    } else {
      this.windowOrientation();
    }
    
    window.addEventListener('resize', () => {
      this.windowOrientation();
    });
  }

  windowOrientation() {
    if (this.fastboot.isFastBoot) return;
    
    this.set('windowHeight', window.innerHeight);
    if (window.innerHeight > window.innerWidth) {
      this.setProperties({ orientationClass: 'portrait' });
    } else {
      this.setProperties({ orientationClass: 'landscape' });
    }
    console.log('HEIGHT!!!!', window.innerHeight);
  }

  setOrientation() {
    if (this.fastboot.isFastBoot) return;
    this.set('windowHeight', window.innerHeight);
    if (
      window.innerHeight < window.innerWidth ||
      screen.orientation.angle === -90 ||
      screen.orientation.angle === 90
    ) {
      this.setProperties({ orientationClass: 'landscape' });
    } else {
      this.setProperties({ orientationClass: 'portrait' });
    }
  }
}
