import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

export default class TransitionToHelper extends Helper {
  compute(params) {
    params = params.slice();

    let router = getOwner(this).lookup('router:main');

    let queryParams = params[params.length - 1];
    if (queryParams && queryParams.isQueryParams) {
      params[params.length - 1] = { queryParams: queryParams.values };
    }

    return function (value) {
      router.transitionTo(...params);
      return value;
    };
  }
}
