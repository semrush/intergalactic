# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.5.0] - 2022-09-31

### Changed

- Enable cssnano by default.

## [1.4.1] - 2022-09-23

### Fixed

- Fixed the problem of not initializing styles without using them.

## [1.4.0] - 2022-09-13

### Changed

- Update 'postcss-import-sync2' dependency version.

## [1.3.0] - 2022-07-13

### Changed

- Container reshadow hash and class hash are now the same.

## [1.2.1] - 2022-03-14

### Fixed

- Fixed old node versions support.

## [1.2.0] - 2022-03-11

### Added

- Added export function `postcss` from main js file `@semcore/babel-plugin-styles`.
- Added `PLACEHOLDER_REPLACER` property for function `postcss`.

## [1.1.3] - 2022-02-17

### Fixed

- Fixed recursive css variables resolving

## [1.1.2] - 2022-02-16

### Fixed

- Disabled unsafe minification rules

## [1.1.1] - 2022-02-03

### Fixed

- Supported nested css variables in css variables fallback

## [1.1.0] - 2022-01-10

### Added

- Added ability to process `:global` selectors.

## [1.0.4] - 2021-04-30

### Fixed

- Fixed incorrect handling of reshadow-specific classes

## [1.0.3] - 2021-04-30

### Fixed

- Fixed parsed data attribute
- Remove bin field for package.json

## [1.0.1] - 2021-04-26

### Added

- Initial release
