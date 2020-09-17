import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { helper as buildHelper } from '@ember/component/helper';

module('Integration | shhh', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{shhh-helper}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('prevents output from being rendered', async function (assert) {
    let echoCalled = 0;
    let lastMessage = '';
    this.owner.register(
      'helper:echo',
      buildHelper(function ([value]) {
        echoCalled++;
        lastMessage = value;
        return value;
      })
    );

    this.set('argument', 'FOO');

    await render(hbs`{{shhh (echo argument)}}`);

    assert.equal(echoCalled, 1);
    assert.equal(lastMessage, 'FOO');
    assert.equal(this.element.textContent.trim(), '');

    this.set('argument', 'BAR');
    assert.equal(echoCalled, 2);
    assert.equal(lastMessage, 'BAR');
    assert.equal(this.element.textContent.trim(), '');
  });

  test('allows callback to be executed with compute', async function (assert) {
    let called = 0;
    let result = '';

    this.set('firstStep', function (value) {
      called++;
      result = `first step: ${value}`;
      return value;
    });

    this.set('secondStep', function (value) {
      called++;
      result = `second step: ${value}`;
      return value;
    });

    this.set('takeFirst', true);

    await render(hbs`{{shhh (compute (if takeFirst firstStep secondStep) 'lets do it')}}`);

    assert.equal(called, 1);
    assert.equal(result, 'first step: lets do it');
    assert.equal(this.element.textContent.trim(), '');

    this.set('takeFirst', false);

    assert.equal(called, 2);
    assert.equal(result, 'second step: lets do it');
    assert.equal(this.element.textContent.trim(), '');
  });
});
