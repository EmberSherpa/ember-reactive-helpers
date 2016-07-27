import Ember from 'ember';

const {
  run: { debounce },
  assert
} = Ember;

export function debounceHelper([callback, wait, immediate = false]/*, hash*/) {
  assert(`wait is specified for debounce helper`, wait);

  return function(value) {
    return debounce(null, callback, value, wait, immediate);
  };
}
export default Ember.Helper.helper(debounceHelper);
