import { helper as buildHelper } from '@ember/component/helper';

export function rParam([index = 0] /*, hash*/) {
  return function () {
    if (arguments.length - 1 < index) {
      return undefined;
    }
    return arguments[index];
  };
}

export default buildHelper(rParam);
