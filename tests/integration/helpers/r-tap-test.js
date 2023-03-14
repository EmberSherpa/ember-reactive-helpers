import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | r/tap', function (hooks) {
  setupRenderingTest(hooks);

  test('removes event object from arguments', async function (assert) {
    this.set('value', null);
    await render(
      hbs`{{this.value}}<button type="button" {{on "click" (pipe (r/tap 'hello world') (fn (mut this.value)))}}></button>`
    );
    assert.dom(this.element).hasNoText();
    await click('button');
    assert.dom(this.element).hasText('hello world');
  });
});
