import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-mocha';
import { helper as buildHelper } from '@ember/component/helper';
import { render } from '@ember/test-helpers';
import registerHelper from '../../helpers/register-helper';

describe('Integration | Helper | r/shhh', function() {
    setupRenderingTest();

    beforeEach(function(){
      registerHelper(this);
    });
    
    it('renders', function() {
      render(hbs`{{shhh-helper}}`);
      expect(this.$()).to.have.length(1);
    });

    it('prevents output from being rendered', function(){

      let echoCalled = 0;
      let lastMessage;
      this.registerHelper('echo', buildHelper(function([value]){
        echoCalled++;
        lastMessage = value;
        return value;
      }));

      this.set('argument', 'FOO');

      render(hbs`{{shhh (echo argument)}}`);

      expect(echoCalled).to.equal(1);
      expect(lastMessage).to.equal('FOO');
      expect(this.$().text()).to.equal('');

      this.set('argument', 'BAR');
      expect(echoCalled).to.equal(2);
      expect(lastMessage).to.equal('BAR');
      expect(this.$().text()).to.equal('');

    });

    it('allows callback to be executed with compute', function(){

      let called = 0;
      let result;

      this.set('firstStep', function(value){
        called++;
        result = `first step: ${value}`;
        return value;
      });

      this.set('secondStep', function(value){
        called++;
        result = `second step: ${value}`;
        return value;
      });

      this.set('takeFirst', true);

      render(hbs`{{shhh (compute (if takeFirst firstStep secondStep) 'lets do it')}}`);

      expect(called).to.equal(1);
      expect(result).to.equal('first step: lets do it');
      expect(this.$().text()).to.equal('');

      this.set('takeFirst', false);

      expect(called).to.equal(2);
      expect(result).to.equal('second step: lets do it');
      expect(this.$().text()).to.equal('');

    });
  }
);
