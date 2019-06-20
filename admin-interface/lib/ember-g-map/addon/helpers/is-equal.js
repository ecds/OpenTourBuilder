// I totally stole this from ember-truth-helpers
import { helper } from '@ember/component/helper';
import { isEqual as emberIsEqual } from '@ember/utils';

export function isEqual([a, b]) {
  // console.log(emberIsEqual(a, b))
  return emberIsEqual(a, b);
}

export default helper(isEqual);
