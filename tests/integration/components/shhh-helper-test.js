/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describeComponent(
  'shhh-helper',
  'Integration: ShhhHelper',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.render(hbs`{{shhh-helper}}`);
      expect(this.$()).to.have.length(1);
    });

    it(`prevents output from being rendered`, function(){

      let echoCalled = 0;
      let lastMessage;
      this.register('helper:echo', Ember.Helper.helper(function([value]){
        echoCalled++;
        lastMessage = value;
        return value;
      }));

      this.set('argument', 'FOO');

      this.render(hbs`{{shhh (echo argument)}}`);

      expect(echoCalled).to.equal(1);
      expect(lastMessage).to.equal('FOO');
      expect(this.$().text()).to.equal('');

      this.set('argument', 'BAR');
      expect(echoCalled).to.equal(2);
      expect(lastMessage).to.equal('BAR');
      expect(this.$().text()).to.equal('');      

    });
  }
);
