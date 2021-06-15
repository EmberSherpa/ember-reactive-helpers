import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { helper as buildHelper } from '@ember/component/helper';

module('Integration | shhh', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{shhh-helper}}`);
    assert.equal(this.element.textContent.trim(), '');
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
    assert.equal(this.element.textContent.trim(), 'FOO');

    await render(hbs`{{shhh (echo this.argument)}}`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
