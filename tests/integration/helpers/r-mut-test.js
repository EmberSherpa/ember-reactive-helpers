/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

const {
  run
} = Ember;

describeComponent(
  'r/mut',
  'Integration: r/mut',
  {
    integration: true
  },
  function() {
    it('updates bound value', function() {

      this.set('value', null);

      this.render(hbs`<button {{action (r/mut value) 10}}></button>`);

      expect(this.get('value')).to.be.null;

      run(()=> this.$('button').click());

      expect(this.get('value')).to.equal(10);
    });

    it('can be used in a pipe', function(){

      this.set('value', null);
      this.set('input', 'hello');

      expect(this.get('value')).to.be.null;

      this.set('name', ' world');
      this.set('append', function([str, value]){
        return `${value}${str}`;        
      });

      this.render(hbs`{{compute (pipe (r append name) (r/mut value) (r/param)) input}}`);

      expect(this.get('value')).to.equal('hello world');

      this.setProperties({
        input: 'rock',
        name: ' and roll'
      });

      expect(this.get('value')).to.equal('rock and roll');

      expect(this.$().text()).to.equal('rock and roll');
    });

    it('expects a path', function(){
      expect(()=>{
        this.render(hbs`{{compute (r/mut "foo")}}`);
      }).to.throw(/Assertion Failed: You can only pass a path to mut/);
    });

  }
);
