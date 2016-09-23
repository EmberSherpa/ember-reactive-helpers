import Ember from 'ember';

import { task, timeout } from 'ember-concurrency';

export default Ember.Helper.extend({

  task: task(function *(action, ...args) {
    let result = yield action(...args);

    if (this.get('within')) {
      yield timeout(this.get('within'));
    }

    return result;
  }).keepLatest(),

  compute([action], {within}) {

    this.set('within', within);

    return (...args) => {
      this.get('task').perform(action, ...args);
      
      return this.get('task');
    };
  }

});
