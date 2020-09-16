import { helper as buildHelper } from '@ember/component/helper';

export function rTap([value] /*, hash*/) {
  return function () {
    return value;
  };
}

export default buildHelper(rTap);
