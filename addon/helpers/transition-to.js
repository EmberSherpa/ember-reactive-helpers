import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class TransitionToHelper extends Helper {
  @service router;

  compute(params) {
    params = params.slice();

    let queryParams = params[params.length - 1];
    if (queryParams && queryParams.isQueryParams) {
      params[params.length - 1] = { queryParams: queryParams.values };
    }

    const router = this.router;
    return function (value) {
      router.transitionTo(...params);
      return value;
    };
  }
}
