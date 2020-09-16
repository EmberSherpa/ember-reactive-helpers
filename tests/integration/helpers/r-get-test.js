import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | r/get', function (hooks) {
  setupRenderingTest(hooks);

  test('renders value', async function (assert) {
    await render(hbs`{{compute (r/get 'value') (hash value="foo")}}`);
    assert.equal(this.element.textContent.trim(), 'foo');
  });

  test('changes value when dependent key changes', async function (assert) {
    this.set('animal', 'cat');
    await render(hbs`{{compute (r/get animal) (hash cat="Wiskers" dog="Barky")}}`);
    assert.equal(this.element.textContent.trim(), 'Wiskers');

    this.set('animal', 'dog');
    assert.equal(this.element.textContent.trim(), 'Barky');
  });

  // skipping the following tests until we can get a newer version of ember/test-helpers
  // which includes a setupOnerror utility
  // trying to override Ember.onerror was fraught with problems

  skip('throws an error when received null', async function () {
    this.set('propName', null);
    await render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
  });

  skip('throws an error when received undefined', async function () {
    this.set('propName', undefined);
    await render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
  });

  skip('throws an error when received empty string', async function () {
    this.set('propName', '');
    await render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
  });

  skip('throws an error when received blank string', async function () {
    this.set('propName', '   ');
    await render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
  });

  skip('throws an error when received an array', async function () {
    this.set('propName', []);
    await render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
  });

  skip('expects a target of type object to be passed in', async function () {
    this.set('invalidObject', 1);
    await render(hbs`{{compute (r/get 'someKey') invalidObject}}`);
  });
});
