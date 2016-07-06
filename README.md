# ember-reactive-helpers

[![Build Status](https://travis-ci.org/EmberSherpa/ember-reactive-helpers.svg)](https://travis-ci.org/EmberSherpa/ember-reactive-helpers)
[![npm version](https://badge.fury.io/js/ember-reactive-helpers.svg)](http://badge.fury.io/js/ember-reactive-helpers)
[![Code Climate](https://codeclimate.com/github/EmberSherpa/ember-reactive-helpers/badges/gpa.svg)](https://codeclimate.com/github/EmberSherpa/ember-reactive-helpers)
[![Test Coverage](https://codeclimate.com/github/EmberSherpa/ember-reactive-helpers/badges/coverage.svg)](https://codeclimate.com/github/EmberSherpa/ember-reactive-helpers/coverage)
[![Dependency Status](https://david-dm.org/EmberSherpa/ember-reactive-helpers.svg)](https://david-dm.org/EmberSherpa/ember-reactive-helpers)

Collection of helpers to aid in reactive template programming with Ember.js.

## Helpers

### `(closure helperName arg1 arg2)`

`(closure` helper will create a closure of a specified helper and curry arguments that are passed into it. 
This helper is only useful when used a subsexpression. Using it as a regular helper will result in `function` being rendered.
This helper can be used when you need to defer execution of a helper. 

```js
{{#with (closure 'contains' (array 'foo' 'bar')) as |checkContains|}}
  {{compute (checkContains 'foo')}}
{{/with}}
```

## Installation

```
ember install ember-reactive-helpers
```

## Helpful Links

- ### [Live Demo](http://EmberSherpa.github.io/ember-reactive-helpers)

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If it is a bug [please open an issue on GitHub](http://github.com/EmberSherpa/ember-reactive-helpers/issues).

## Usage
