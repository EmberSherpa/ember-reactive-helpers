import Ember from 'ember';

const {
  Helper
} = Ember;

export default function registerHelper(test) {
  test.registerHelper = function(name, compute) {
    test.register(`helper:${name}`, Helper.helper(compute));
  };
}