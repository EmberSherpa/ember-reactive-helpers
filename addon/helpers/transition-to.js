import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

const isObjectLiteral = (obj) => {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return false;
  }

  let objProto = obj;
  // get obj's Object constructor's prototype
  do {
    objProto = Object.getPrototypeOf(objProto);
  } while (objProto !== null && objProto !== undefined);
  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop) && !Object.prototype.hasOwnProperty.call(objProto, prop)) {
      // inherited elsewhere
      return false;
    }
  }
  return Object.getPrototypeOf(obj) === objProto;
};

export default class TransitionToHelper extends Helper {
  @service router;

  compute(params) {
    params = params.slice();

    if (params.length > 1) {
      const lastParam = params[params.length - 1];
      if (isObjectLiteral(lastParam)) {
        params[params.length - 1] = { queryParams: lastParam };
      }
    }

    const router = this.router;
    return function (value) {
      router.transitionTo(...params);
      return value;
    };
  }
}
