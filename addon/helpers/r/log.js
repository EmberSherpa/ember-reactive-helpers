import Ember from 'ember';

const {
  Logger: { log }
} = Ember;

export function rLog(params) {
  return function(value) {
    log(...params, value);
    return value;
  };
}

export default Ember.Helper.helper(rLog);
