import { helper as buildHelper } from '@ember/component/helper';
import { pipe } from 'ember-composable-helpers/helpers/pipe';

export function feed([value, ...actions]) {
  return pipe(actions)(value);
}

export default buildHelper(feed);
