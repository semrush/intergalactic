# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.21] - 2023-03-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.1 ~> 3.47.2]).

## [2.2.19] - 2023-03-01

## [2.2.18] - 2023-02-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.12.0 ~> 3.13.0]).

## [2.2.17] - 2023-02-22

## [2.2.16] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1]).

## [2.2.13] - 2023-02-13

## [2.2.12] - 2023-02-09

### Changed

- Split rounding design tokens (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded` and `--intergalactic-control-rounded`).

## [2.2.11] - 2023-02-01

### Fixed

- Fixed freezing when slide index is greater than number of slides.

## [2.2.10] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.7.0 ~> 3.8.0], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [2.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.1.7] - 2022-11-08

### Fixed

- Fixed screen readers support.

## [2.1.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/icon` [3.1.1 ~> 3.1.2]).

## [2.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [2.0.20] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [2.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [1.6.4] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [1.6.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [1.5.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.5.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [1.4.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.4.1] - 2021-06-24

### Added

- [A11y] Added support to work `Carousel.Next, Carousel.Prev` with keyboard.

## [1.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.3.0] - 2021-01-29

### Added

- Added support touch event for change to slide.
- Added support control mod for change property index `<Carousel index={index}onIndexChange={...}/>`.

## [1.2.1] - 2021-01-21

### Added

- Added `style` folder with css in build folder `lib`.

## [1.1.1] - 2020-12-28

### Fixed

- [ts] fixed all types of components inside package.

## [1.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.0.0] - 2020-12-04

### Added

- Release library

## [1.0.0-3] - 2020-11-10

### Fixed

- Fixed call function `onIndexChange` when initialize component.

## [1.0.0-2] - 2020-11-09

### Fixed

- Off control mode for set index don't have index get from onIndexChange

## [1.0.0-1] - 2020-11-09

### Added

- Added animation for change active index in control mode.

## [1.0.0-0] - 2020-11-05

### Added

- Initial release
