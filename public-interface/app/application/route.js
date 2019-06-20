import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

export default class ApplicationRoute extends Route {
  @service metrics;
  @service fastboot;

  @action
  didTransition() {
    if (this.fastboot.isFastBoot) return;
    const page = this._router.currentURL;
    const title = this._router.currentRouteName || 'unknown';
    this.metrics.trackPage({ page, title });
  }

  headTags() {
    return [
      {
        type: 'meta',
        tagId: 'meta-og-type',
        attrs: {
          property: 'og:type',
          content: 'website'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-url',
        attrs: {
          property: 'og:url',
          content: `${ENV.APP.HOST}${this._router.currentURL}`
        }
      },
      {
        type: 'script',
        tagId: 'google-analytics',
        attrs: {
          type: 'text/javascript'
        },
        content: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          
          ga('create', '${ENV.APP.GA_ID}', 'auto');
          ga('send', 'pageview');`
      },
    ]
  }
}
