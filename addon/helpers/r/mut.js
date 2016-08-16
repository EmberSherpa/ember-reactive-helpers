import Ember from 'ember';
import isStream from '../../-private/is-stream';

const {
  assert
} = Ember;

export default Ember.Helper.extend({
  compute() {
    return (value) => {
      let [stream] = this._stream.params;
      assert('You can only pass a path to mut', isStream(stream));
      stream.setValue(value);
      return value;
    };
  }
});
