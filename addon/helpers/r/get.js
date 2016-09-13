import Ember from 'ember';

const {
  get,
  typeOf,
  assert,
  isPresent
} = Ember;

export function rGet([prop]/*, hash*/) {
  assert(`r/get expects a valid property name, you passed ${prop}`, isPresent(prop));

  return function (target) {
    assert(`cannot call r/get with ${prop} on not an object`, typeOf(target) === 'object');
    return get(target, prop);
  };
}

export default Ember.Helper.helper(rGet);
