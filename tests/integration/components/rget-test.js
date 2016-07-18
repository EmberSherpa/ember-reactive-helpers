/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'r/get',
  'Integration: r/get',
  {
    integration: true
  },
  function() {
    it('renders value', function() {
      this.render(hbs`{{compute (r/get 'value') (hash value="foo")}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');
    });
    it('chances value when dependent key chances', function(){
      this.set('animal', 'cat');
      this.render(hbs`{{compute (r/get animal) (hash cat="Wiskers" dog="Barky")}}`);
      expect(this.$().text()).to.equal('Wiskers');

      this.set('animal', 'dog');
      expect(this.$().text()).to.equal('Barky');
    });
  }
);
