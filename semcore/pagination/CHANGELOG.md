# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.10] - 2022-11-23

### Fixed

- Fixed attributes and line-height for last page

## [3.3.9] - 2022-11-17

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.2.3 ~> 3.3.0]).

## [3.3.7] - 2022-11-08

## [3.3.6] - 2022-11-04

### Fixed

- Fixed styles for last and single pages

## [3.3.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.2.2 ~> 4.2.3], `@semcore/flex-box` [4.6.2 ~> 4.6.3], `@semcore/icon` [3.1.1 ~> 3.1.2], `@semcore/input` [3.2.2 ~> 3.2.3], `@semcore/link` [4.2.2 ~> 4.2.3], `@semcore/utils` [3.40.0 ~> 3.40.0]).

## [3.3.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.2.12] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.18 ~> 4.1.0], `@semcore/input` [3.0.16 ~> 3.1.0]).

## [3.2.0] - 2022-08-22

### Added

- Added Turkish langauge support.

## [3.1.2] - 2022-08-19

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.12 ~> 4.0.13]).

## [3.1.0] - 2022-08-17

### Added

- Added the necessary labels for improved accessibility work.

## [3.0.19] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.30.0 ~> 2.30.1]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove deprecated props "onPageChange"/"totalPagesFormatter"/"label"

## [2.5.2] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.5.0] - 2022-04-25

### Fixed

- Fixed displaying of 2, 3 and 4 digit page number in focused pagination input.

## [2.4.4] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.19.4 ~> 2.20.0]).

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
