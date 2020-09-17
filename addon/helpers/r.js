import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { typeOf, isEmpty } from '@ember/utils';

export default class RHelper extends Helper {
  compute([callable, ...curry], hash) {
    let helperInstance = null;

    if (typeOf(callable) === 'string') {
      assert('r helper name must not be empty', !isEmpty(callable));

      let owner = getOwner(this);
      let helper = owner.factoryFor(`helper:${callable}`);
      helper = helper && helper.class;

      assert(`r helper must be able to resolve ${callable} to a helper`, helper);

      if (helper.isHelperInstance) {
        assert(`r helper must have a compute function for ${callable} helper`, helper.compute.call);

        callable = helper.compute;
      }

      if (helper.isHelperFactory) {
        helperInstance = helper.create();
        helperInstance._stream = this._stream;
        callable = helperInstance.compute;
      }
    }

    assert('r helper must receive a callable function', callable.call);

    return function (...args) {
      let curried = curry.concat(args);
      return callable.call(helperInstance, curried, hash);
    };
  }
}
