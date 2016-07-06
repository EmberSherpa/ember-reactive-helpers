# ember-reactive-helpers

Collection of helpers to aid in reactive template programming with Ember.js.

## `(closure helperName arg1 arg2)`

`(closure` helper will create a closure of a specified helper and curry arguments that are passed into it. 
This helper is only useful when used a subsexpression. Using it as a regular helper will result in `function` being rendered.
This helper can be used when you need to defer execution of a helper. 

```
{{#with (closure 'contains' (array 'foo' 'bar')) as |checkContains|}}
  {{compute (checkContains 'foo')}}
{{/with}}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
