/* jshint expr:true */
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  run
} = Ember;

import registerHelper from '../../helpers/register-helper';

describeComponent(
  'r',
  'Integration: r',
  {
    integration: true
  },
  function() {
    beforeEach(function(){
      registerHelper(this);
    });
    it('renders', function() {
      this.registerHelper('uppercase', function ([str]) {
        return str.toUpperCase();
      });

      this.render(hbs`{{compute (r 'uppercase') 'foo'}}`);
      expect(this.$().text()).to.equal('FOO');
    });
    it('curries passed in arguments', function(){
      this.render(hbs`{{compute (r 'add' 5) 10}}`);
      expect(this.$().text()).to.equal('15');
    });
    it('can receive a function', function(){
      this.set('sum', function([a, b]){
        return a + b;
      });
      this.render(hbs`{{compute (r sum 10) 100}}`);
      expect(this.$().text()).to.equal('110');
    });
    it('can re-evaluates when function changes', function(){
      this.set('operation', function sum([a, b]){
        return a + b;
      });
      this.render(hbs`{{compute (r operation 10) 100}}`);
      expect(this.$().text()).to.equal('110');

      this.set('operation', function subtract([a, b]){
        return a - b;
      });

      expect(this.$().text()).to.equal('-90');
    });
    it('can be used in a pipe', function(){
      this.set('count', 0);
      this.render(hbs`
        {{#with (r 'add' 1) as |increment|}}
          <span>clicks: {{count}}</span>
          <button {{action (pipe increment (action (mut count))) count}}>+1</button>
        {{/with}}
      `);
      expect(this.$('span').text()).to.equal('clicks: 0');

      run( () => this.$('button').click() );
      
      expect(this.$('span').text()).to.equal('clicks: 1');
    });
  }
);
