import { helper as buildHelper } from '@ember/component/helper';

const log = console.log.bind(console);

export function rLog(params) {
  return function (value) {
    log(...params, value);
    return value;
  };
}

export default buildHelper(rLog);
