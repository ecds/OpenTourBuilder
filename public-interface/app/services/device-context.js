import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class DeviceContextService extends Service {
  @service fastboot;
  deviceContextClass = this.deviceContextClass || null;
  windowWidth = this.windowWidth || null;
  maxMobileWidth = 824;

  @computed('deviceContextClass')
  get isDesktop() {
    return this.deviceContextClass == 'desktop';
  }

  @computed('deviceContextClass')
  get isMobile() {
    return this.deviceContextClass == 'mobile';
  }

  constructor() {
    super(...arguments);
    if (this.fastboot.isFastBoot) return;

    this.setDeviceContext();

    window.addEventListener('resize', () => {
      this.setDeviceContext();
    });
  }

  setDeviceContext() {
    if (this.fastboot.isFastBoot) return;

    this.set('windowWidth', window.innerWidth);
    if (window.innerWidth > this.maxMobileWidth) {
      this.set('deviceContextClass', 'desktop');
    } else {
      this.set('deviceContextClass', 'mobile');
    }
  }

  setWindowWidth() {
    if (this.fastboot.isFastBoot) return;
    this.set('windowWidth', window.innerWidth);
  }
}
