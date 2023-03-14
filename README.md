# ember-reactive-helpers

[![NPM Version][npm-badge-img]][npm-badge-link]
[![Build Status][build-status-img]][build-status-link]
[![Ember Observer Score][ember-observer-badge]][ember-observer-url]
[![Download Count][npm-downloads-img]][npm-badge-link]

Collection of helpers to aid in reactive template programming with Ember.js.

## Installation

```
ember install ember-reactive-helpers
```

## Introduction

Reactive helpers are helpers that return functions. These functions can be bound to event handlers to process data on the way up in the Data Down Actions Up cycle. The `r` helper makes it possible to use [`ember-composable-helpers`](https://github.com/DockYard/ember-composable-helpers) in event handlers where execution of the helper is delayed until the event is triggered.

## Helpers

### `(r helper [arg1 arg2 ...])`

Returns a function for a given helper and curries arguments to it.

```hbs
<Input @value={{this.value}} {{on "keyup" (pipe (r "dasherize" this.value) (fn (mut this.value)))}} />
```

The `r` helper accepts functions as helpers. For example, let's say you have a method in a Component named `addNumbers`

```js
export default class extends Component {
  addNumbers([a, b]) {
    return a + b;
  }
}
```

You can use it in the template.

```hbs
<button type="button" {{on "click" (pipe (r this.addNumbers 1) (fn (mut this.count)))}}>+1</button>
<div>{{this.count}}</div>
```

### `(r/get propName)`

The `(r/get)` helper returns a function. When called, the function will return the value taken from the object that it receives as the first argument at property propName.

```hbs
{{compute (r/get "animal") (hash animal="cat")}} {{! //=> cat }}
```

### `(r/param [index])`

`(r/param)` returns a function. When called, this function will return the received argument at the specified index.

```hbs
{{compute (r/param) "hello" "world"}}
{{! //=> 'hello'}}
{{compute (r/param 1) "hello" "world"}}
{{! //=> 'world'}}
```

### `(r/debugger)`

`(r/debugger)` will create a helper that will inject a debugger breakpoint into a helper pipe.
It will pass through the value, that's passed into the helper.

```hbs
<button {{action (pipe (some-helper) (r/debugger) (some-other-helper))}}>Do!</button>
```

### `(r/log ['your message'])`

The `(r/log)` helper will evaluate to a function. When called, this function will log the passed in message and arguments that it received.

```hbs
<button {{action (pipe (r/log "before save") (action "save") (r/log "after save")) model}}>Save</button>
```

### `(r/tap value)`

The `(r/tap value)` helper will evaluate to a function that will return the passed in argument.

### `{{shhh anything}}`

The `{{shhh` helper will suppress any output that's passed into it. This is useful when you want to compute a helper
without having its output rendered.

### `(transition-to 'destination' model (query-params foo='bar'))`

The `(transition-to)` helper has the same argument signature as `link-to` but evaluates to an action that can be called to trigger transition.

```hbs
<button type="button" {{on "click" (transition-to "index")}}>Go to Index</button>
```

## Helpful Links

- ### [Live Demo](http://EmberSherpa.github.io/ember-reactive-helpers)

- ### [Changelog](CHANGELOG.md)

## Looking for help?

If you encounter a bug [please open an issue on GitHub](http://github.com/EmberSherpa/ember-reactive-helpers/issues).

## Compatibility

- Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v14 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge-img]: https://badge.fury.io/js/ember-reactive-helpers.svg
[npm-badge-link]: http://badge.fury.io/js/ember-reactive-helpers
[build-status-img]: https://github.com/EmberSherpa/ember-reactive-helpers/workflows/CI/badge.svg?branch=master&event=push
[build-status-link]: https://github.com/EmberSherpa/ember-reactive-helpers/actions?query=workflow%3A%22CI%22
[npm-downloads-img]: https://img.shields.io/npm/dt/ember-reactive-helpers.svg
[ember-observer-badge]: http://emberobserver.com/badges/ember-reactive-helpers.svg
[ember-observer-url]: http://emberobserver.com/addons/ember-reactive-helpers
