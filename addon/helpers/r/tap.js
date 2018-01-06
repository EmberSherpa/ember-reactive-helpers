import {helper} from '@ember/component/helper';

export function rTap([value]/*, hash*/) {
  return function () {
    return value;
  };
}

export default helper(rTap);
