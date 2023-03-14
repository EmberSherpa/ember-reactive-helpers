import { A } from '@ember/array';
import Helper, { helper as buildHelper } from '@ember/component/helper';
import { run } from '@ember/runloop';
import { click, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | r', function (hooks) {
  setupRenderingTest(hooks);

  test('supports simple helpers', async function (assert) {
    this.owner.register(
      'helper:uppercase',
      buildHelper(function ([str]) {
        return str.toUpperCase();
      })
    );

    await render(hbs`{{compute (r 'uppercase') 'foo'}}`);
    assert.dom(this.element).hasText('FOO');
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
    assert.dom(this.element).hasText('FOO');
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
    assert.dom(this.element).hasText('FOO');
  });

  test('allows complex object to call recompute', async function (assert) {
    let array = A(['a', 'b', 'c']);
    this.set('array', array);

    await render(hbs`{{compute (r 'object-at' 1 (get this.array '[]'))}}`);
    assert.dom(this.element).hasText('b');

    run(() => array.insertAt(0, 'z'));
    await settled();
    assert.dom(this.element).hasText('a');
  });

  test('curries passed in arguments', async function (assert) {
    await render(hbs`{{compute (r 'add' 5) 10}}`);
    assert.dom(this.element).hasText('15');
  });

  test('can receive a function', async function (assert) {
    this.set('sum', function ([a, b]) {
      return a + b;
    });
    await render(hbs`{{compute (r this.sum 10) 100}}`);
    assert.dom(this.element).hasText('110');
  });

  test('can re-evaluates when function changes', async function (assert) {
    this.set('operation', function sum([a, b]) {
      return a + b;
    });
    await render(hbs`{{compute (r this.operation 10) 100}}`);
    assert.dom(this.element).hasText('110');

    this.set('operation', function subtract([a, b]) {
      return a - b;
    });
    assert.dom(this.element).hasText('-90');
  });

  test('can be used to increment a value', async function (assert) {
    this.set('count', 0);

    this.set('callback', function sum(current, func) {
      console.log(current);
      console.log(func);
      return func(current);
    });

    await render(hbs`
      {{#let (r 'add' 1) as |increment|}}
        <span>clicks: {{this.count}}</span>
        <button type="button" {{on "click" (fn (mut this.count) (compute increment this.count))}}>+1</button>
      {{/let}}
    `);
    assert.dom('span').hasText('clicks: 0');
    await click('button');
    assert.dom('span').hasText('clicks: 1');
  });

  test('can take arguments from a hash and recomputes when an argument changes', async function (assert) {
    this.setProperties({ arr: [], x: 5, y: 3, z: -2 });
    this.set('multiplyHash', function (arr, { x, y, z }) {
      return x * y * z;
    });
    await render(hbs`{{compute (r this.multiplyHash x=this.x y=this.y z=this.z)}}`);
    assert.dom(this.element).hasText('-30');
    this.set('x', -7);
    assert.dom(this.element).hasText('42');
  });
});
