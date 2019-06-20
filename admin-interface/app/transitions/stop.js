import { stop } from 'liquid-fire';
import moveOver from './move-over';
import { get } from '@ember/object';

export default function(/* arg1, arg2 */) {
  // Stop any currently running animation on oldElement
  stop(this.oldElement);

  if (get(this, 'oldValue.position') < get(this, 'newValue.position')) {
    return moveOver.call(this, 'x', -1);
  }
  return moveOver.call(this, 'x', 1);
}
