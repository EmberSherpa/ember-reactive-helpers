# Changelog

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
