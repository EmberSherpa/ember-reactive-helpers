import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Controller.extend({
  ajax: inject.service(),

  query: 'glimmer',
  page: 1,

  actions: {
    newQuery(query) {
      this.setProperties({
        query,
        page: 1
      });
    },
    search(q, page = 1) {
      return this.get('ajax').request(`https://api.github.com/search/issues?repo:emberjs/ember.js&q=${encodeURIComponent(q)}&page=${page}`);
    }
  }
});