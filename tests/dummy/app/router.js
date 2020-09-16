import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
