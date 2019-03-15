import { helper as buildHelper } from '@ember/component/helper';

export function rLog(params) {
  return function(value) {
    console.log(...params, value); // eslint-disable-line
    return value;
  };
}

export default buildHelper(rLog);
