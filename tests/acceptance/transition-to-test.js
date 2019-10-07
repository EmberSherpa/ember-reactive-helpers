import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { visit, click, find, currentRouteName, currentURL } from '@ember/test-helpers';
import $ from 'jquery';

describe('Acceptance | Transition To', function() {
  setupApplicationTest();

  it('can cause a transition via helper', async function() {
    await visit('/transition-to');

    expect(currentRouteName()).to.equal('transition-to.index');

    await click(find('button:contains(Go to Helpers)'));

    expect(currentRouteName()).to.equal('transition-to.list');
    expect($('h2:contains(Helpers List)').length).to.equal(1);
  });

  it('can apply query params via helper', async function() {
    await visit('/transition-to');
    expect(currentRouteName()).to.equal('transition-to.index');

    await click(find('button:contains(Show Query Params)'));
    expect(currentURL()).to.equal('/transition-to?foo=bar');
  });
});

