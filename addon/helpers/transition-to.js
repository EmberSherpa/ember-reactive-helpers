import Ember from 'ember';

const {
  getOwner
} = Ember;

export default Ember.Helper.extend({
  compute(params) {
    params = params.slice();

    let router = getOwner(this).lookup('router:main');
    
    let queryParams = params[params.length - 1];
    if (queryParams && queryParams.isQueryParams) {
      params[params.length - 1] = { queryParams: queryParams.values };
    }

    return function(value) {
      router.transitionTo(...params);
      return value;
    };
  }  
});
