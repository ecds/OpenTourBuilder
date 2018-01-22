import { stop } from 'liquid-fire';
import moveOver from './move-over';

export default function(/* arg1, arg2 */) {
  // Stop any currently running animation on oldElement
  stop(this.oldElement);

  if (this.oldValue.id < this.newValue.id) {
    return moveOver.call(this, 'x', -1);
  }
  return moveOver.call(this, 'x', 1);
}
