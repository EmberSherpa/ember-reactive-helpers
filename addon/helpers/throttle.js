import Ember from 'ember';

const {
  run: { throttle }
} = Ember;

export function throttleHelper([callback, ...params]/*, hash*/) {
  return function(...args) {
    params = [callback, args].concat(params);
    return throttle(null, ...params);
  };
}

export default Ember.Helper.helper(throttleHelper);
