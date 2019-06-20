import HistoryLocation from '@ember/routing/history-location';

export default HistoryLocation.extend({
  formatURL() {
    let url = this._super(...arguments);
    console.log(url)
    if (url.includes('#')) {
      console.log('hash', url.replace(/([^/])#(.*)/, '$1/#$2'))
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      console.log('reg', url.replace(/\/?$/, '/'))
      return url.replace(/\/?$/, '/');
    }
  }
});
