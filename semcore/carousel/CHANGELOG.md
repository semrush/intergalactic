# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
