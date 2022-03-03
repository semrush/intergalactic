# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.4.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [1.3.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.3.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.3.1] - 2021-07-02

### Fixed

- [TS] fixed export components.

## [1.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.2.1] - 2020-12-25

### Fixed

- Fixed bubbling call handlers `onAnimationStart`, `onAnimationEnd` from inside components.

## [1.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.1.4] - 2020-12-07

### Fixed

- Fixed a bug in determining the height in `Collapse`.

## [1.1.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [1.1.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [1.1.0] - 2020-10-08

### Added

- Add `Collapse` animation.

## [1.0.0] - 2020-09-11

### Added

- Initial release
