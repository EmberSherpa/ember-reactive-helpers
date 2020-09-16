import { helper as buildHelper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { typeOf, isPresent } from '@ember/utils';
import { get } from '@ember/object';

export function rGet([prop] /*, hash*/) {
  assert(`r/get expects a valid property name, instead got ${prop}`, isPresent(prop));

  return function (target) {
    assert(`cannot call r/get with ${prop} on not an object`, typeOf(target) === 'object');
    return get(target, prop);
  };
}

export default buildHelper(rGet);
