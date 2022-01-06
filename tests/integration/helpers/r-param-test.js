import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | r/param', function (hooks) {
  setupRenderingTest(hooks);

  test('renders', async function (assert) {
    await render(hbs`{{compute (r/param) 'foo'}}`);
    assert.dom(this.element).hasText('foo');
  });

  test('accepts an index param', async function (assert) {
    await render(hbs`{{compute (r/param 1) 'foo' 'bar'}}`);
    assert.dom(this.element).hasText('bar');
  });
});
