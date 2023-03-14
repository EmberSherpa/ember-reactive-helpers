# Changelog

## 1.2.0

This is a minor release with no new features added.

- Upgraded to ember/ember-cli 4.11
- Updated depencencies to latest semver

## 1.1.0

This is a minor release with no new features added.

- Upgraded to ember/ember-cli 4.7
- Updated depencencies to latest semver
- Updated to use lockfileVersion 2

## 1.0.0

This is the first major release! There are no new features, however the upgrade to
`ember-auto-import` is breaking and warrants a major version bump.

- Upgraded `ember-auto-import` to 2.x
- Upgraded `ember-cli` to 4.x
- Updated tests to leverage `qunit-dom` helpers, which also fixed several lint errors

## 0.8.0

This is a minor release with no new features added, and some deprecations removed.

- Upgraded to ember/ember-cli 3.26
- updated "r" test/page (and docs) to use keypress instead of input event
- removed unnecessary addon dependency: ember-promise-helpers
- updated github token for the concurrency test/demo
- removed usage of deprecated query-params helper in favor of hash
- added check in transition-to helper for objectLiteral queryParams
- fixed deprecation warnings (no implicit this) in tests

## 0.7.0

This is a minor release with no new features added.

- Upgraded to ember/ember-cli 3.24
- `prettier` integration and linting fixes
- Removed usage of Travis and added Github Actions integration
- Fixed `transition-to` helper to use `router` service instead of deprecated `router:main`

## 0.6.0

- Now dependent on Ember (&CLI) 3.20
- Updated all tests to use QUnit
- Updated all core code and test code to fix linting errors (using default Ember linting rules), use the newer Ember Octane features (e.g. tracked properties, classes, remove getters, etc.)
- Re-enabled skipped tests that test for rendering exceptions
- Bumped various dependency versions
- Added integration with renovatebot
- Updated README documentation for modern usage

- Fixed #24 - `transition-to` helper was using private Ember APIs that were incompatible with newer versions of Ember

## 0.5.1

- Fixed #24 - `transition-to` helper was using private Ember APIs that were incompatible with newer versions of Ember

## 0.5.0

- Added Ember 2.12 compatibility
- Removed (r/mut) helper
