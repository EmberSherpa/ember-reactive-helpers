import { helper as buildHelper } from '@ember/component/helper';

export function rDebugger(params, hash) {
  return function (value) {
    /** These are here to make sure that they show up in Chrome debugger after babel processes them */
    params = params; // eslint-disable-line
    hash = hash; // eslint-disable-line
    debugger; // eslint-disable-line
    return value;
  };
}

export default buildHelper(rDebugger);
