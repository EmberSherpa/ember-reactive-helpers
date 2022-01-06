import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const TOKEN_BASE64 = 'Z2hwX204SjduR1dPQ2FraHVhWWs5YmFZblhJZnNzM0xmVzJ6ZHlIWQ==';

export default class extends Controller {
  @tracked query = '';
  @tracked page = 1;

  @task(function* (throttle = 0) {
    if (throttle) {
      yield timeout(throttle);
    }

    let { query, page } = this;
    let url = `https://api.github.com/search/issues?repo:emberjs/ember.js&q=${encodeURIComponent(query)}&page=${page}`;

    const response = yield fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${atob(TOKEN_BASE64)}`
      }
    });
    return yield response.json();
  }).drop()
  search;
}
