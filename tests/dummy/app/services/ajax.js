import { computed } from '@ember/object';
import EmberAjax from 'ember-ajax/services/ajax';

export default EmberAjax.extend({
  init() {
    this._super(...arguments);
    this.trustedHosts = ['api.github.com'];
  },

  headers: computed(function () {
    return {
      Authorization: 'token 6ebfe062b56196971251caa0c87c032bf73a57e5'
    };
  })
});
