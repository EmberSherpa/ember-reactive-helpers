export default function registerHelper(test) {
  test.registerHelper = function(name, helper) {
    test.register(`helper:${name}`, helper);
  };
}