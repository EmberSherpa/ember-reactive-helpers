import { expect } from 'chai';
import { describe, it } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';

// NOTE: As of Ember 2.11.1, chai can't handle the thrown errors due to a change in error event dispatching
// see https://github.com/emberjs/ember.js/issues/15013
// for now, I am skipping the three tests that expect assertions

describe('Integration | Helper | r/get', function() {
    setupRenderingTest();

    it('renders value', function() {
      render(hbs`{{compute (r/get 'value') (hash value="foo")}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');
    });

    it('changes value when dependent key changes', function(){
      this.set('animal', 'cat');
      render(hbs`{{compute (r/get animal) (hash cat="Wiskers" dog="Barky")}}`);
      expect(this.$().text()).to.equal('Wiskers');

      this.set('animal', 'dog');
      expect(this.$().text()).to.equal('Barky');
    });

    [null, undefined, '', '   '].forEach((name) => {
        it.skip(`"${name}" is not a valid argument`, function() {
          this.set('invalidPropName', name);
          expect(() => {
            render(hbs`{{compute (r/get invalidPropName) (hash cat="Wiskers")}}`);
          }).to.throw(`Assertion Failed: r/get expects a valid property name, instead got ${name}`);
        });
    });

    it.skip('throws an error when received an array', function() {
      this.set('propName', []);
      expect(() => {
        render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
      }).to.throw(`Assertion Failed`);
    });

    it.skip('expects a target of type object to be passed in', function(){
        expect(() => {
          this.set('invalidObject', 1);
          render(hbs`{{compute (r/get 'someKey') invalidObject}}`);
        }).to.throw(`Assertion Failed: cannot call r/get with someKey on not an object`);
    });
  }
);
