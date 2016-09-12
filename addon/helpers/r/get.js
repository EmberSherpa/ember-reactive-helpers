import Ember from 'ember';

const {
  get,
  typeOf,
  assert,
  isNone
} = Ember;

export function rGet([prop]/*, hash*/) {
  assert(`r/get expects argument to be defined`, !isNone(prop));

  return function (target) {
    assert(`r/get ${prop} expects object as an argument`, typeOf(target) === 'object');

    return get(target, prop);
  };
}

export default Ember.Helper.helper(rGet);
