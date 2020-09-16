import { helper as buildHelper } from '@ember/component/helper';
import { debounce } from '@ember/runloop';
import { assert } from '@ember/debug';

export function debounceHelper([callback, wait, immediate = false] /*, hash*/) {
  assert(`wait is specified for debounce helper`, wait);

  return function (value) {
    return debounce(null, callback, value, wait, immediate);
  };
}

export default buildHelper(debounceHelper);
