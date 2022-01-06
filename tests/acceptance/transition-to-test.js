import { module, test } from 'qunit';
import { click, currentRouteName, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | transition-to', function (hooks) {
  setupApplicationTest(hooks);

  test('can cause a transition via helper', async function (assert) {
    await visit('/transition-to');
    assert.strictEqual(currentRouteName(), 'transition-to.index');

    await click(`button#helpers`);
    assert.strictEqual(currentRouteName(), 'transition-to.list');
    assert.dom('h2#list').exists({ count: 1 });
  });

  test('can apply query params via helper', async function (assert) {
    await visit('/transition-to');
    assert.strictEqual(currentRouteName(), 'transition-to.index');

    await click('button#show');
    assert.strictEqual(currentURL(), '/transition-to?foo=bar');
  });
});
