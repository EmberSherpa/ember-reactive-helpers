import Ember from 'ember';

function isPromise(value) {
  return value && value.then && value.then.call;
}

export default Ember.Helper.extend({
  compute([value, initial]) {

    if (this.update) {
      this.update = false;
      return this.last;
    }

    if (isPromise(value)) {
      value.then(newValue => {
        this.last = newValue;
        this.update = true;
        this.recompute();
        return newValue;
      });
    }

    return this.last || initial;
  }
});
