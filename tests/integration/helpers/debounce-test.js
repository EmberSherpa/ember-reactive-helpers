/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

const {
  run: { later },
  run
} = Ember;

describeComponent(
  'debounce',
  'Integration: DebounceHelper',
  {
    integration: true
  },
  function() {
    it('debounces action calls', function() { 

      this.set('count', 0);
      this.render(hbs`
      <i>{{count}}</i>
      <button {{action (debounce (pipe (r 'add' 1) (action (mut count)) ) 100) count}}>+1</button>`);

      run(() => this.$('button').click() );
      
      later( () => this.$('button').click(), 150 );
      later( () => this.$('button').click(), 250 );
      later( () => this.$('button').click(), 300 );      
      later( () => this.$('button').click(), 450 );

      return wait().then(()=>{
        expect(this.$('i').text()).to.equal('3');
      });
    });
  }
);
