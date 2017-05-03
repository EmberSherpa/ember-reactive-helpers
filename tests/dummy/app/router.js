import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('transition-to', function(){
    this.route('list');
  });
  this.route('r');
  this.route('ember-concurrency');
});

export default Router;
