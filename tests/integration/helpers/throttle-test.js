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
  'throttle',
  'Integration: ThrottleHelper',
  {
    integration: true
  },
  function() {
    it('throttles for specified duration', function() {
      let count = 0;
      this.on('increment', function() {
        count++;
      });
      this.render(hbs`<button {{action (throttle (action "increment") 100)}}>+1</button>`);

      expect(count).to.equal(0);

      later( () => this.$('button').click(), 25 );
      later( () => this.$('button').click(), 50 );
      later( () => this.$('button').click(), 75 );
      later( () => this.$('button').click(), 100 );
      later( () => this.$('button').click(), 150 );

      return wait().then(()=>{
        expect(count).to.equal(2);
      });
    });
    it('passes through arguments', function(){
      this.set('received', null);
      this.render(hbs`<i>{{received}}</i><button {{action (throttle (action (mut received)) 100) 'passed in'}}>+1</button>`);

      run( () => this.$('button').click() );

      return wait().then(()=>{
        expect(this.$('i').text()).to.equal('passed in');
      });
    });
  }
);
