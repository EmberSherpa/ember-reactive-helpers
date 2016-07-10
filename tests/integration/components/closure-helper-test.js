/* jshint expr:true */
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

import registerHelper from '../../helpers/register-helper';

describeComponent(
  'closure-helper',
  'Integration: ClosureHelper',
  {
    integration: true
  },
  function() {
    beforeEach(function(){
      registerHelper(this);
    });

    it('accepts helper as an argument and curries arguments', function(){

      this.registerHelper('contains', function ([array, item]) {
        return array.indexOf(item) > -1;
      });

      this.set('array', [ 'foo', 'bar' ] );
      this.set('item', 'foo');

      this.render(hbs`{{if (compute (closure (helper 'contains') array) item) 'yes' 'no'}}`);

      expect(this.$().text()).to.equal('yes');

      this.set('item', 'zoo');

      expect(this.$().text()).to.equal('no');

      this.set('array', [ 'bar', 'zoo' ] );

      expect(this.$().text()).to.equal('yes');
    });

    it('composes simple helpers', function(){

      this.render(hbs`{{compute (closure (helper 'capitalize')) 'hello world'}}`);

      expect(this.$().text()).to.equal('Hello world');

    });

  }
);
