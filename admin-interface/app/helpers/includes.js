import { helper } from '@ember/component/helper';

export function includes([list, item]) {
  return list.includes(item);
}

export default helper(includes);
