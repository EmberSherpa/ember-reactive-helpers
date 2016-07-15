import Ember from 'ember';

export function rDebugger() {
  return function(value){
    debugger;
    return value;
  };
}

export default Ember.Helper.helper(rDebugger);
