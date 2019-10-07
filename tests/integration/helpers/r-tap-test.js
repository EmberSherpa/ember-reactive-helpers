import { run } from '@ember/runloop';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-mocha';
import { render } from '@ember/test-helpers';

describe('Integration | Helper | r/tap', function() {
    setupRenderingTest();
    
    it('removes event object from arguments', function() {
      this.set('value', null);
      render(hbs`{{value}}<button {{action (pipe (r/tap 'hello world') (action (mut value)))}}></button>`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('');

      run( () => this.$('button').click() );

      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('hello world');
    });
  }
);
