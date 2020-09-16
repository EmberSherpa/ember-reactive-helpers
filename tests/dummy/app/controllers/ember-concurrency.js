import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked query = '';
  @tracked page = 1;

  @(task(function* (throttle = 0) {
    if (throttle) {
      yield timeout(throttle);
    }

    let { query, page } = this;
    let url = `https://api.github.com/search/issues?repo:emberjs/ember.js&q=${encodeURIComponent(
      query
    )}&page=${page}`;

    const response = yield fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'token 6ebfe062b56196971251caa0c87c032bf73a57e5'
      }
    });
    return yield response.json();
  }).drop())
  search;
}
