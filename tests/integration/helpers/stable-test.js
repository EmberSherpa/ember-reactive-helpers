/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';

import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  RSVP: { defer },
  run
} = Ember;

describeComponent('Stable', 'Integration: StableHelper', { integration: true }, function () {

  it('returns last resolved value when receives a promise', function(){

    let deferred = defer();

    this.set('promise', deferred.promise);

    this.render(hbs`{{stable promise 'initial value'}}`);

    expect(this.$().text()).to.equal('initial value');

    run(() => {
      deferred.resolve('new value');
    });

    expect(this.$().text()).to.equal('new value');

  });

});
