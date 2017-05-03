import Ember from 'ember';
import { pipe } from 'ember-composable-helpers/helpers/pipe';

export function feed([value, ...actions]) {
  return pipe(actions)(value);
}

export default Ember.Helper.helper(feed);
