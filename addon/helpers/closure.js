import Ember from 'ember';

const {
  Logger: { error },
  getOwner,
  typeOf,
  isEmpty
} = Ember;

export default Ember.Helper.extend({
  compute([helperName, ...curry]) {
    if (typeOf(helperName) !== 'string' || isEmpty(helperName)) {
      error('closure helper must receive a helper name.');
    }

    let owner = getOwner(this);
    let helper = owner._lookupFactory(`helper:${helperName}`);

    if (isEmpty(helper)) {
      error(`closure helper could not resolve helper with name ${helperName}`);
    }

    if (typeOf(helper.compute) !== 'function') {
      error(`closure helper resolved a helper that doesn't have a compute function`);
    }

    return function(...args) {
      let curried = curry.concat(args);
      return helper.compute.call(null, curried);
    };
  }
});
