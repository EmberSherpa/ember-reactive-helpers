# ember-reactive-helpers

[![Build Status](https://travis-ci.org/EmberSherpa/ember-reactive-helpers.svg)](https://travis-ci.org/EmberSherpa/ember-reactive-helpers)
[![npm version](https://badge.fury.io/js/ember-reactive-helpers.svg)](http://badge.fury.io/js/ember-reactive-helpers)
[![Dependency Status](https://david-dm.org/EmberSherpa/ember-reactive-helpers.svg)](https://david-dm.org/EmberSherpa/ember-reactive-helpers)

Collection of helpers to aid in reactive template programming with Ember.js.

## Introduction

Reactive helpers are helpers that return functions. These functions can be bound to event handlers 
to process data on the way up in the Data Down Actions Up cycle.

## Helpers

### `(r helperName)`

Returns helper as a function.

```hbs
<input value={{value}} oninput={{action (pipe (r 'dasherize') (mut value)) value="target.value"}}
```

### `(r/get propName)`

`(r/get)` helper returns a function. When called, the function will return value taken from object that it receives as first argument at property propName.

```hbs
{{compute (r/get 'animal') (hash animal='cat')}} {{! //=> cat }}
```

### `(r/param [index])`

`(r/param)` return a function. When called, this function will return received argument at specified index.

```hbs
{{compute (r/param) 'hello' 'world'}} {{! //=> 'hello'}}
{{compute (r/param 1) 'hello' 'world'}} {{! //=> 'world'}}
```
### `(r/debugger)`

`(r/debugger)` will create a helper that will inject a debugger breakpoint into a helper pipe. It will pass through the value,
that's passed into the helper.

```hbs
<button {{action (pipe (some-helper) (r/debugger) (some-other-helper))}}>Do!</button>
```

### `(r/log ['your message'])`

`(r/log)` helper will evaluate to a function. When called, this function will log the passed in messsage and arguments that it received.

```hbs
<button {{action (pipe (r/log 'before save') (action 'save') (r/log 'after save')) model}}>Save</button>
```

### `{{shhh anything}}`

`{{shhh` helper will supress any output that's passed into it. This is useful when you want to compute a helper 
without having it's output rendered.

### `(transition-to 'destination' model (query-params foo='bar'))`

`(transition-to)` helper the same argument signature as `link-to` but evaluates to an action that can be called to trigger transition.

```hbs
<button {{action (transtion-to 'index')}}>Go to Index</button>
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
