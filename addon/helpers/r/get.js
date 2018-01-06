import {helper} from '@ember/component/helper';
import {get} from '@ember/object';
import {assert} from '@ember/debug';
import {isPresent, typeOf} from '@ember/utils';

export function rGet([prop]/*, hash*/) {
  assert(`r/get expects a valid property name, instead got ${prop}`, isPresent(prop));

  return function (target) {
    assert(`cannot call r/get with ${prop} on not an object`, typeOf(target) === 'object');
    return get(target, prop);
  };
}

export default helper(rGet);
