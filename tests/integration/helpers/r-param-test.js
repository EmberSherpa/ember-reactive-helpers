import {expect} from 'chai';
import {describeComponent, it} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'r/param',
  'Integration: r/param',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{compute (r/param) 'foo'}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('foo');
    });

    it('accepts an index param', function () {
      this.render(hbs`{{compute (r/param 1) 'foo' 'bar'}}`);
      expect(this.$()).to.have.length(1);
      expect(this.$().text()).to.equal('bar');
    });
  }
);
