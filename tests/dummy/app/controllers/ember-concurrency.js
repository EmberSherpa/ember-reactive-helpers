import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  ajax: service(),

  query: '',
  page: 1,

  search: task(function* (throttle = 0) {
    if (throttle) {
      yield timeout(throttle);
    }

    let { query, page } = this.getProperties('query', 'page');
    let url = `https://api.github.com/search/issues?repo:emberjs/ember.js&q=${encodeURIComponent(
      query
    )}&page=${page}`;
    return this.get('ajax').request(url);
  }).keepLatest()
});
