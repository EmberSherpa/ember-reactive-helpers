import Ember from 'ember';

const {
  getOwner,
  typeOf,
  isEmpty,
  assert
} = Ember;

export default Ember.Helper.extend({
  compute([callable, ...curry]) {

    let helperInstance = null;

    if (typeOf(callable) === 'string') {
      assert('r helper name must not be empty', !isEmpty(callable));

      let owner = getOwner(this);
      let helper = owner._lookupFactory(`helper:${callable}`);

      assert(`r helper must be able to resolve ${callable} to a helper`, helper);

      if (helper.isHelperInstance) {
        assert(`r helper must have a compute function for ${callable} helper`, helper.compute.call);

        callable = helper.compute;
      }

      if (helper.isHelperFactory) {
        helperInstance = helper.create();
        callable = helperInstance.compute;
      }
    }

    assert('r helper must receive a callable function', callable.call);

    return function(...args) {
      let curried = curry.concat(args);
      return callable.call(helperInstance, curried);
    };
  }
});
