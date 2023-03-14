import { helper as buildHelper } from '@ember/component/helper';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | shhh', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{shhh "foo"}}`);
    assert.dom(this.element).hasNoText();
  });

  test('prevents output from being rendered', async function (assert) {
    this.owner.register(
      'helper:echo',
      buildHelper(([value]) => {
        return value;
      })
    );

    this.set('argument', 'FOO');

    await render(hbs`{{echo this.argument}}`);
    assert.dom(this.element).hasText('FOO');

    await render(hbs`{{shhh (echo this.argument)}}`);
    assert.dom(this.element).hasNoText();
  });
});
