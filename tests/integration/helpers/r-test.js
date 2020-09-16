import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Helper, { helper as buildHelper } from '@ember/component/helper';
import { A } from '@ember/array';
import { run } from '@ember/runloop';

module('Integration | r/get', function (hooks) {
  setupRenderingTest(hooks);

  test('supports simple helpers', async function (assert) {
    this.owner.register(
      'helper:uppercase',
      buildHelper(function ([str]) {
        return str.toUpperCase();
      })
    );

    await render(hbs`{{compute (r 'uppercase') 'foo'}}`);
    assert.equal(this.element.textContent.trim(), 'FOO');
  });

  test('supports complex helpers', async function (assert) {
    this.owner.register(
      'helper:uppercase',
      class extends Helper {
        compute([str]) {
          return str.toUpperCase();
        }
      }
    );
    await render(hbs`{{compute (r 'uppercase') 'foo'}}`);
    assert.equal(this.element.textContent.trim(), 'FOO');
  });

  test('maintains reference to helpers instance on complex helpers', async function (assert) {
    this.owner.register(
      'helper:uppercase',
      class extends Helper {
        compute([str]) {
          this.set('str', str);
          return str.toUpperCase();
        }
      }
    );

    await render(hbs`{{compute (r 'uppercase') 'foo'}}`);
    assert.equal(this.element.textContent.trim(), 'FOO');
  });

  test('allows complex object to call recompute', async function (assert) {
    let array = A(['a', 'b', 'c']);
    this.set('array', array);

    await render(hbs`{{compute (r 'object-at' 1 (get array '[]'))}}`);
    assert.equal(this.element.textContent.trim(), 'b');

    run(() => array.insertAt(0, 'z'));
    await settled();
    assert.equal(this.element.textContent.trim(), 'a');
  });

  test('curries passed in arguments', async function (assert) {
    await render(hbs`{{compute (r 'add' 5) 10}}`);
    assert.equal(this.element.textContent.trim(), '15');
  });

  test('can receive a function', async function (assert) {
    this.set('sum', function ([a, b]) {
      return a + b;
    });
    await render(hbs`{{compute (r sum 10) 100}}`);
    assert.equal(this.element.textContent.trim(), '110');
  });

  test('can re-evaluates when function changes', async function (assert) {
    this.set('operation', function sum([a, b]) {
      return a + b;
    });
    await render(hbs`{{compute (r operation 10) 100}}`);
    assert.equal(this.element.textContent.trim(), '110');

    this.set('operation', function subtract([a, b]) {
      return a - b;
    });
    assert.equal(this.element.textContent.trim(), '-90');
  });

  test('can be used in a pipe', async function (assert) {
    this.set('count', 0);
    await render(hbs`
      {{#with (r 'add' 1) as |increment|}}
        <span>clicks: {{count}}</span>
        <button {{action (pipe increment (action (mut count))) count}}>+1</button>
      {{/with}}
    `);
    assert.equal(find('span').textContent.trim(), 'clicks: 0');
    await click('button');
    assert.equal(find('span').textContent.trim(), 'clicks: 1');
  });

  test('can take arguments from a hash and recomputes when an argument changes', async function (assert) {
    this.setProperties({ arr: [], x: 5, y: 3, z: -2 });
    this.set('multiplyHash', function (arr, { x, y, z }) {
      return x * y * z;
    });
    await render(hbs`{{compute (r multiplyHash x=x y=y z=z)}}`);
    assert.equal(this.element.textContent.trim(), '-30');
    this.set('x', -7);
    assert.equal(this.element.textContent.trim(), '42');
  });
});
