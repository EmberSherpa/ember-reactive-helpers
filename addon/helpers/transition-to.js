import Ember from 'ember';
import QueryParams from '../-private/query-params';

const {
  getOwner
} = Ember;

export default Ember.Helper.extend({
  compute(params) {
    params = params.slice();

    let router = getOwner(this).lookup('router:main');
    
    let queryParams = params[params.length - 1];
    if (queryParams instanceof QueryParams) {
      params[params.length - 1] = { queryParams: queryParams.values };
    }

    return function(value) {
      router.transitionTo(...params);
      return value;
    };
  }  
});
