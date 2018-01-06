import $ from 'jquery';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Helpers', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can cause a transition via helper', function() {
    visit('/transition-to');

    andThen(function() {
      expect(currentPath()).to.equal('transition-to.index');
    });

    click('button:contains(Go to Helpers)');

    andThen(function() {
      expect(currentPath()).to.equal('transition-to.list');
      expect($('h2:contains(Helpers List)').length).to.equal(1);
    });

  });

  it('can apply query params via helper', function() {
    visit('/transition-to');

    andThen(function() {
      expect(currentPath()).to.equal('transition-to.index');
    });

    click('button:contains(Show Query Params)');

    andThen(function() {
      expect(currentURL()).to.equal('/transition-to?foo=bar');
    });

  });

});


