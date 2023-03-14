import { render, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | r/get', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // reset Ember.onerror
    setupOnerror();
  });

  test('renders value', async function (assert) {
    await render(hbs`{{compute (r/get 'value') (hash value="foo")}}`);
    assert.dom(this.element).hasText('foo');
  });

  test('changes value when dependent key changes', async function (assert) {
    this.set('animal', 'cat');
    await render(hbs`{{compute (r/get this.animal) (hash cat="Wiskers" dog="Barky")}}`);
    assert.dom(this.element).hasText('Wiskers');

    this.set('animal', 'dog');
    assert.dom(this.element).hasText('Barky');
  });

  for (const prop of [null, undefined, '', '   ']) {
    test('throws an error when received null', async function (assert) {
      assert.expect(1);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: r/get expects a valid property name, instead got ${prop}`);
      });
      this.set('propName', prop);
      await render(hbs`{{compute (r/get this.propName) (hash cat="Wiskers")}}`);
    });
  }

  test('throws an error when received an array', async function (assert) {
    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: r/get expects a valid property name, instead got `);
    });
    this.set('propName', []);
    await render(hbs`{{compute (r/get this.propName) (hash cat="Wiskers")}}`);
  });

  test('expects a target of type object to be passed in', async function (assert) {
    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: cannot call r/get with someKey on not an object`);
    });
    this.set('invalidObject', 1);
    await render(hbs`{{compute (r/get 'someKey') this.invalidObject}}`);
  });
});
