import {afterEach, beforeEach, describe, it} from 'mocha';
import {expect} from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import $ from 'jquery';

describe('Acceptance: R', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  it('can visit /r', function () {
    visit('/r');

    fillIn('#dasherize', 'new value');
    andThen(function () {
      expect(currentPath()).to.equal('r');

      expect($('#result').text()).to.equal('new-value');
    });
  });
});
