import Ember from 'ember';
import EmberAjax from 'ember-ajax/services/ajax';

const {
  computed
} = Ember;

export default EmberAjax.extend({
  trustedHosts: ['api.github.com'],

  headers: computed(function(){
    return {
      Authorization: 'token 6ebfe062b56196971251caa0c87c032bf73a57e5'
    };
  })
});