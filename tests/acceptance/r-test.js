import { module, test } from 'qunit';
import { currentURL, typeIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | r', function (hooks) {
  setupApplicationTest(hooks);

  test('can visit /r', async function (assert) {
    await visit('/r');
    assert.strictEqual(currentURL(), '/r');
    await typeIn('#dasherize', 'new value');
    assert.dom('#result').hasText('new-value');
  });
});
