import Ember from 'ember';

const {
  run: { throttle }
} = Ember;

export function throttleHelper([callback, wait, immediate = false]) {
  return function(value) {
    return throttle(null, callback, value, wait, immediate);
  };
}

export default Ember.Helper.helper(throttleHelper);
