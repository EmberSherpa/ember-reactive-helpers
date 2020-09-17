import { module, test } from 'qunit';
import { click, currentRouteName, currentURL, visit, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | transition-to', function (hooks) {
  setupApplicationTest(hooks);

  test('can cause a transition via helper', async function (assert) {
    await visit('/transition-to');
    assert.equal(currentRouteName(), 'transition-to.index');

    await click(`button#helpers`);
    assert.equal(currentRouteName(), 'transition-to.list');
    assert.equal(findAll('h2#list').length, 1);
  });

  test('can apply query params via helper', async function (assert) {
    await visit('/transition-to');
    assert.equal(currentRouteName(), 'transition-to.index');

    await click('button#show');
    assert.equal(currentURL(), '/transition-to?foo=bar');
  });
});
