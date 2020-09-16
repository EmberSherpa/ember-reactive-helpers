# ember-reactive-helpers

[![Build Status](https://travis-ci.org/EmberSherpa/ember-reactive-helpers.svg)](https://travis-ci.org/EmberSherpa/ember-reactive-helpers)
[![npm version](https://badge.fury.io/js/ember-reactive-helpers.svg)](http://badge.fury.io/js/ember-reactive-helpers)
[![Dependency Status](https://david-dm.org/EmberSherpa/ember-reactive-helpers.svg)](https://david-dm.org/EmberSherpa/ember-reactive-helpers)

Collection of helpers to aid in reactive template programming with Ember.js.

## Introduction

Reactive helpers are helpers that return functions. These functions can be bound to event handlers 
to process data on the way up in the Data Down Actions Up cycle. The `r` helper makes it possible to use
[`ember-composable-helpers`](https://github.com/DockYard/ember-composable-helpers) in event handlers where execution of the helper is delayed until the event is triggered.

## Helpers

### `(r helper [arg1 arg2 ...])`

Returns a function for a given helper and curry arguments to it.

```hbs
<input value={{value}} oninput={{action (pipe (r 'dasherize') (action (mut value))) value="target.value"}}
```

`r` helper accepts functions as helpers. For example, let's say you have a method on the context called `addNumbers`

```js
export default Ember.Component.extend({
  addNumbers([a, b]) {
    return a + b;
  }
});
```

You can use it in the template.

```hbs
<button {{action (pipe (r addNumbers 1) (action (mut count))) count}}>+1</button>
```

### `(r/get propName)`

`(r/get)` helper returns a function. When called, the function will return the value taken from the object that it receives as the first argument at property propName.

```hbs
{{compute (r/get 'animal') (hash animal='cat')}} {{! //=> cat }}
```

### `(r/param [index])`

`(r/param)` returns a function. When called, this function will return the received argument at the specified index.

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

`(r/log)` helper will evaluate to a function. When called, this function will log the passed in message and arguments that it received.

```hbs
<button {{action (pipe (r/log 'before save') (action 'save') (r/log 'after save')) model}}>Save</button>
```

### `(r/tap value)`

`(r/tap value)` helper will evaluate to a function that will return the passed in argument. 

### `{{shhh anything}}`

`{{shhh` helper will supress any output that's passed into it. This is useful when you want to compute a helper 
without having its output rendered.

### `(transition-to 'destination' model (query-params foo='bar'))`

`(transition-to)` helper the same argument signature as `link-to` but evaluates to an action that can be called to trigger transition.

```hbs
<button {{action (transition-to 'index')}}>Go to Index</button>
```

## Installation

```
ember install ember-reactive-helpers
```

## Helpful Links

- ### [Live Demo](http://EmberSherpa.github.io/ember-reactive-helpers)

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If you encounter a bug [please open an issue on GitHub](http://github.com/EmberSherpa/ember-reactive-helpers/issues).

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
