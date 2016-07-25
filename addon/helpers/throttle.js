import Ember from 'ember';

const {
  run: { throttle }
} = Ember;

export function throttleHelper([callback, wait, immidiate = false]) {
  return function(value) {
    return throttle(null, callback, value, wait, immidiate);
  };
}

export default Ember.Helper.helper(throttleHelper);
