import { module, test } from 'qunit';
import { visit, currentURL, fillIn, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | r', function (hooks) {
  setupApplicationTest(hooks);

  test('can visit /r', async function (assert) {
    await visit('/r');
    assert.equal(currentURL(), '/r');
    await fillIn('#dasherize', 'new value');
    assert.equal(find('#result').textContent, 'new-value');
  });
});
