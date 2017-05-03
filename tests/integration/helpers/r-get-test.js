/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

// NOTE: As of Ember 2.11.1, chai can't handle the thrown errors due to a change in error event dispatching
// see https://github.com/emberjs/ember.js/issues/15013

describeComponent(
  'r/get',
  'Integration: r/get',
  {
    integration: true
  },
  function() {
    it('renders value', function() {
      this.render(hbs`{{compute (r/get 'value') (hash value="foo")}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');
    });

    it('changes value when dependent key changes', function(){
      this.set('animal', 'cat');
      this.render(hbs`{{compute (r/get animal) (hash cat="Wiskers" dog="Barky")}}`);
      expect(this.$().text()).to.equal('Wiskers');

      this.set('animal', 'dog');
      expect(this.$().text()).to.equal('Barky');
    });

    [null, undefined, '', '   '].forEach((name) => {
        it(`"${name}" is not a valid argument`, function() {
          this.set('invalidPropName', name);
          expect(() => {
            this.render(hbs`{{compute (r/get invalidPropName) (hash cat="Wiskers")}}`);
          }).to.throw(`Assertion Failed: r/get expects a valid property name, instead got ${name}`);
        });
    });

    it('throws an error when received an array', function() {
      this.set('propName', []);
      expect(() => {
        this.render(hbs`{{compute (r/get propName) (hash cat="Wiskers")}}`);
      }).to.throw(`Assertion Failed`);
    });

    it('expects a target of type object to be passed in', function(){
        expect(() => {
          this.set('invalidObject', 1);
          this.render(hbs`{{compute (r/get 'someKey') invalidObject}}`);
        }).to.throw(`Assertion Failed: cannot call r/get with someKey on not an object`);
    });
  }
);
