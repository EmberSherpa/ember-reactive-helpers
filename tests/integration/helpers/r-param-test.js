import { expect } from 'chai';
import { describe, it } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';


describe('Integration | Helper | r/param', function() {
    setupRenderingTest();
    
    it('renders', function() {
      render(hbs`{{compute (r/param) 'foo'}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');
    });

    it('accepts an index param', function(){
      render(hbs`{{compute (r/param 1) 'foo' 'bar'}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('bar');
    });
  }
);
