import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | r/tap', function (hooks) {
  setupRenderingTest(hooks);

  test('removes event object from arguments', async function (assert) {
    this.set('value', null);
    await render(hbs`{{value}}<button {{action (pipe (r/tap 'hello world') (action (mut value)))}}></button>`);
    assert.equal(this.element.textContent.trim(), '');
    await click('button');
    assert.equal(this.element.textContent.trim(), 'hello world');
  });
});
