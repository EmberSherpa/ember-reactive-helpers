/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  Helper
} = Ember;

describeComponent(
  'closure-helper',
  'Integration: ClosureHelper',
  {
    integration: true
  },
  function() {
    it('accepts helper as an argument and curries arguments', function(){
      let containsHelper = Helper.helper(function ([array, item]) {
          return array.indexOf(item) > -1;
      });

      this.register('helper:contains', containsHelper);

      this.set('array', [ 'foo', 'bar' ] );
      this.set('item', 'foo');

      this.render(hbs`{{if (compute (closure 'contains' array) item) 'yes' 'no'}}`);

      expect(this.$().text()).to.equal('yes');

      this.set('item', 'zoo');

      expect(this.$().text()).to.equal('no');

      this.set('array', [ 'bar', 'zoo' ] );

      expect(this.$().text()).to.equal('yes');
    });

    it('composes simple helpers', function(){

      this.render(hbs`{{compute (closure 'capitalize') 'hello world'}}`);

      expect(this.$().text()).to.equal('Hello world');

    });

  }
);
