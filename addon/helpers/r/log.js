import Ember from 'ember';
import { helper as buildHelper } from '@ember/component/helper';

const {
  Logger: { log }
} = Ember;

export function rLog(params) {
  return function (value) {
    log(...params, value);
    return value;
  };
}

export default buildHelper(rLog);
