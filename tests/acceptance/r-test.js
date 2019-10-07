import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { visit, fillIn, currentURL } from '@ember/test-helpers';
import $ from 'jquery';

describe('Acceptance | R', function() {
  setupApplicationTest();

  it('can visit /r', async function() {
    await visit('/r');
    fillIn('#dasherize', 'new value');

    expect(currentURL()).to.equal('/r');
    expect($('#result').text()).to.equal('new-value');
  });
});
