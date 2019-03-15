import fetch from 'fetch';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({

  query: '',
  page: 1,

  search: task(function*(throttle = 0) {
    if (throttle) {
      yield timeout(throttle);
    }

    let {query, page} = this.getProperties("query", "page");
    let queryString = `${encodeURIComponent(query)}&page=${page}`
    let url = `https://api.github.com/search/issues?repo:emberjs/ember.js&q=${queryString}`;
    
    return fetch(url).then((res) => res.json());
  }).keepLatest()
});
 