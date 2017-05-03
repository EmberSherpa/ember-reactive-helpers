import Ember from 'ember';
import {task, timeout} from 'ember-concurrency';

const {
  inject
} = Ember;

export default Ember.Controller.extend({
  ajax: inject.service(),

  query: '',
  page: 1,

  search: task(function*(throttle = 0) {
    if (throttle) {
      yield timeout(throttle);
    }

    let {query, page} = this.getProperties("query", "page");
    let url = `https://api.github.com/search/issues?repo:emberjs/ember.js&q=${encodeURIComponent(
      query)}&page=${page}`;
    return this.get('ajax').request(url);
  }).keepLatest()
});
