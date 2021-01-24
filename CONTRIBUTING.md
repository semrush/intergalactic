## How to make changes

First of all, thank you for your interest in the library. We'd love to accept your fixes and improvements ✨

## Code review

All changes, including changes by the project participants, require code reviewing.
We use merge-request from Github for this purpose.
Refer to the Github help for more usage information about
[pull-request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests).

## Separating components

We create an `NPM` package for each **independent** component.
This allows us to release and manage dependencies as flexible as we can.

### Dependent component

A dependent component is an entity that depends on another component, most often a parent,
it cannot be used alone or with other independent components.

For example, a table head (TableHead) cannot be used without a table (Table) or somewhere in another component.

### Independent component

An independent component is an entity that can be reused, which has its own public API and CHANGELOG.

For example, Link, although logically part of typography, is, in practice, a separate component.

### NPM package

An `NPM` package is a container that has its own version and changelog.

It can contain:

- one component, for example a Button
- several **dependent** components, for example a table (Table, TableHead, TableRow, etc.)
- HOC component extending functionality, for example keyboard navigation (WithKeyboardFocus)
- meta package, for example a list of css variables with colors
