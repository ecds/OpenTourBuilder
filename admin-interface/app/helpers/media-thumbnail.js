import { helper } from '@ember/component/helper';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/string';

export function mediaThumbnail([medium, version, width]) {
  let imageElement = `<img width=${width}
                        data-src='${get(medium, 'baseUrl')}${get(
  medium,
  version
)}'
                        alt='Picture of ${get(medium, 'title')}.
                        ${get(medium, 'caption')}' uk-img/>`;

  if (get(medium, 'video')) {
    return htmlSafe(`${imageElement}
            <div class='uk-position-center uk-panel otb-playbutton-overlay'>
              <i class='fa fa-play-circle' aria-hidden='true'></i>
            </div>`);
  }
  return htmlSafe(imageElement);
}

export default helper(mediaThumbnail);
