import Ember from 'ember';

export function rTap([value]/*, hash*/) {
  return function() {
    return value;
  };
}

export default Ember.Helper.helper(rTap);
