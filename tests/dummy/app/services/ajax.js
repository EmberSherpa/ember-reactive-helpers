import {computed} from '@ember/object';
import EmberAjax from 'ember-ajax/services/ajax';

export default EmberAjax.extend({
  trustedHosts: computed(function () {
    return ['api.github.com'];
  }),

  headers: computed(function () {
    return {
      Authorization: 'token 6ebfe062b56196971251caa0c87c032bf73a57e5'
    };
  })
});
