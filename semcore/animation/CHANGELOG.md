# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.7.3] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.41.0 ~> 3.42.0], `@semcore/flex-box` [4.6.4 ~> 4.6.5]).

## [1.7.0] - 2022-10-21

### Added

- Added a property that removes the `overflow=hidden` setting.

### Changed

- Returning the original `overflow` after the animation has passed.

## [1.6.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.39.0 ~> 3.39.1]).

## [1.6.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [1.5.11] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [1.5.9] - 2022-08-29

### Fixed

- Fixed playing entering animation if init animation state is already reached.

## [1.5.8] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0]).

## [1.5.0] - 2022-04-03

### Added

- Added `preserveNode` property.

## [1.4.2] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [1.4.1] - 2021-03-05

### Fixed

- Fixed fade animation behavior in prefer reduce motion mode.

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
