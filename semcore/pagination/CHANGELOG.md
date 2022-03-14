# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.4.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [3.3.6 ~> 3.3.7], `@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/icon` [2.19.3 ~> 2.19.4], `@semcore/input` [2.2.4 ~> 2.2.5], `@semcore/link` [3.5.0 ~> 3.5.1], `@semcore/utils` [3.31.2 ~> 3.31.2]).

## [2.4.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.3.4] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.3] - 2021-08-02

### Fixed

- [ts] corrected types for `Value, Addon` in `Pagination.PageInput`.

## [2.3.2] - 2021-06-08

### Changed

- Fixed ts type for `Pagination`.
- Added `aria-label` for child components `FirstPage, PageInput`

## [2.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.0] - 2021-02-20

### Added

- Added support two languages `Korean, Vietnamese`.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-09-03

### Fixed

- Fixed update value in input page, when update `currentPage` property

## [2.0.0] - 2020-06-22

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.0.0] - 2020-02-04

### Added

- Initial release
