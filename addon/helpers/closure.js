import Ember from 'ember';

export default Ember.Helper.extend({
  compute([helper, ...curry]) {
    return function(...args) {
      let curried = curry.concat(args);
      return helper.apply(null, curried);
    };
  }
});
