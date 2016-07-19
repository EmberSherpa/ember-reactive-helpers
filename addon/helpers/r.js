import Ember from 'ember';

const {
  Logger: { error },
  getOwner,
  typeOf,
  isEmpty
} = Ember;

export default Ember.Helper.extend({
  compute([helperName]) {
    if (typeOf(helperName) !== 'string' || isEmpty(helperName)) {
      error('helper helper must receive a helper name.');
    }

    let owner = getOwner(this);
    let helper = owner._lookupFactory(`helper:${helperName}`);

    if (isEmpty(helper)) {
      error(`helper helper could not resolve helper with name ${helperName}`);
    }

    if (typeOf(helper.compute) !== 'function') {
      error(`helper helper resolved a helper that doesn't have a compute function`);
    }

    return function() {
      return helper.compute.call(null, arguments);
    };
  }
});
