import { run } from '@ember/runloop';
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'r/tap',
  'Integration: r/tap',
  {
    integration: true
  },
  function() {
    it('removes event object from arguments', function() {
      this.set('value', null);
      this.render(hbs`{{value}}<button {{action (pipe (r/tap 'hello world') (action (mut value)))}}></button>`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('');

      run( () => this.$('button').click() );

      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('hello world');
    });
  }
);
