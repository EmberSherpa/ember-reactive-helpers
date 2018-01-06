import Helper from '@ember/component/helper';
import {getOwner} from '@ember/application';
import QueryParams from '../-private/query-params';

export default Helper.extend({
  compute(params) {
    params = params.slice();

    let router = getOwner(this).lookup('router:main');

    let queryParams = params[params.length - 1];
    if (queryParams instanceof QueryParams) {
      params[params.length - 1] = {queryParams: queryParams.values};
    }

    return function (value) {
      router.transitionTo(...params);
      return value;
    };
  }
});
