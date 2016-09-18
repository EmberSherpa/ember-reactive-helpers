/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';

import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const {
  RSVP: { defer },
  run,
  run: { later }
} = Ember;

describeComponent('KeepLatest', 'Integration: KeepLatestHelper', { integration: true }, function() {

    it('uses last value', function() {

      let ops = [];

      let deferWithValue = (value) => {
        let deferred = defer();

        deferred.promise.then( () => this.set('result', value) );

        return deferred;
      };

      this.on('defer', (value) => {

        let deferred = deferWithValue(value);

        ops.push(deferred);
        
        let { promise } = deferred;

        return promise;
      });

      this.set('value', 'foo');

      this.render(hbs`<button {{action (keep-latest (action 'defer' value))}}>{{result}}</button>`);

      run(() => {
        this.$('button').click();

        expect(ops.length).to.equal(1);

        ops[0].resolve();
      });

      // foo was set to result
      expect(this.$().text()).to.equal('foo');

      run(() => { 
        this.set('value', 'bar'); 
        this.$('button').click();
      });

      // foo has not changed because promise was not resolved yet
      expect(this.$().text()).to.equal('foo');

      run(() => { ops[1].resolve(); });

      // result is bar because promise resolved
      expect(this.$().text()).to.equal('bar');

      run(() => {
        this.set('value', 'zoo');
        this.$('button').click();
      });

      run(() => {
        this.set('value', 'zaa');
        this.$('button').click();
      });

      // result is bar because promise resolved
      expect(this.$().text()).to.equal('bar');

      run(() => { ops[2].resolve(); });

      // result is bar because promise resolved
      expect(this.$().text()).to.equal('zoo');

      run(() => { ops[3].resolve(); });

      // result is zaa because promise resolved
      expect(this.$().text()).to.equal('zaa');

    });

    it('accepts within argument', function(){

      this.set('count', 0);

      this.on('incrementCount', function(count) {
        this.set('count', ++count);
      });

      this.render(hbs`<button {{action (keep-latest (action 'incrementCount' count) within=250)}}>{{count}}</button>`);

      run(()=> { this.$('button').click(); });

      expect(this.$().text()).to.equal("1");

      run(()=>{
        this.$('button').click();
        this.$('button').click();
        this.$('button').click();
        this.$('button').click();        
      });

      later(()=>{});

      return wait().then(()=>{
        expect(this.$().text()).to.equal("2");
      });
    });

});
