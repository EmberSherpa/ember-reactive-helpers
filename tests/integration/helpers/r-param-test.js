import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | r/param', function (hooks) {
  setupRenderingTest(hooks);

  test('renders', async function (assert) {
    await render(hbs`{{compute (r/param) 'foo'}}`);
    assert.equal(this.element.textContent.trim(), 'foo');
  });

  test('accepts an index param', async function (assert) {
    await render(hbs`{{compute (r/param 1) 'foo' 'bar'}}`);
    assert.equal(this.element.textContent.trim(), 'bar');
  });
});
