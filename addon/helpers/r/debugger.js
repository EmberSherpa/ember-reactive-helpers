import Ember from 'ember';

export function rDebugger(params, hash) {
  return function(value) {
    /** These are here to make sure that they show up in Chrome debugger after babel processes them */
    params = params;
    hash = hash;
    debugger; // jshint ignore:line
    return value;
  };
}

export default Ember.Helper.helper(rDebugger);
