import Service from '@ember/service';
import { set } from '@ember/object';
import { assert } from '@ember/debug';

const YOUTUBE_REGEX = /(https?:\/\/)?(www.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/watch\?feature=player_embedded&v=)([A-Za-z0-9_-]*)(&\S+)?(\?\S+)?/;
const VIMEO_REGEX = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
const INSTAGRAM_REGEX = /(https?:\/\/)?(www.)?instagr(am\.com|\.am)\/p\/([A-Za-z0-9_-]*)/;

export default Service.extend({
  videoPreview: {},

  init() {
    this._super(...arguments);
    set(this, 'videoPreview', {});
  },

  getEmbed(code) {
    return this._getVideoId(code);

    // return `${provider(videoId)}?${params}`;
  },

  getThumbnailUrl(url) {
    let videoId = this._getVideoId(url);
    return this._getProvider(url).thumbnailUrl(videoId);
  },

  _getVideoId(url) {
    let videoId, video, provider, error;
    if (url) {
      if (VIMEO_REGEX.test(url)) {
        video = VIMEO_REGEX.exec(url);
        videoId = video[3];
        provider = 'vimeo';
      }

      if (YOUTUBE_REGEX.test(url)) {
        video = YOUTUBE_REGEX.exec(url);
        videoId = video[4];
        provider = 'youtube';
      }

      if (INSTAGRAM_REGEX.test(url)) {
        video = INSTAGRAM_REGEX.exec(url);
        videoId = video[4];
        provider = 'instagram';
      }
    }

    set(this, 'videoPreview', { videoId, provider, error });
    return { videoId, provider, error };
    // assert(`Couldn't determine videoId from url: ${url}`, videoId);
  },

  _getProvider(url) {
    let providerName, provider;

    if (url) {
      if (VIMEO_REGEX.test(url)) {
        providerName = 'vimeo';
      }

      if (YOUTUBE_REGEX.test(url)) {
        providerName = 'youtube';
      }

      if (INSTAGRAM_REGEX.test(url)) {
        providerName = 'instagram';
      }
    }

    provider = this.get(providerName);
    assert(`Couldn't determine provider from url: ${url}`, provider);

    return provider;
  }
});
