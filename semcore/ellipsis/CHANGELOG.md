# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.6.0] - 2023-08-28

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.4.1 ~> 4.5.0], `@semcore/core` [2.4.1 ~> 2.5.0]).

## [2.5.0] - 2023-08-24

### Added

- Ellipsis advanced usage with `Ellipsis.Content` and `Ellipsis.Popper` components.

## [2.4.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1], `@semcore/core` [2.4.0 ~> 2.4.1]).

## [2.4.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.3.1 ~> 4.4.0], `@semcore/core` [2.3.1 ~> 2.4.0]).

## [2.3.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.3.0 ~> 2.3.1]).

## [2.3.0] - 2023-08-18

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.2.0 ~> 4.3.0], `@semcore/core` [2.2.1 ~> 2.3.0]).

## [2.2.1] - 2023-08-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.1.0 ~> 4.2.0], `@semcore/flex-box` [5.2.0 ~> 5.2.1], `@semcore/core` [2.2.0 ~> 2.2.1]).

## [2.2.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0]).

## [2.1.3] - 2023-08-04

### Fixed

- Component build output was corrupted after the previous change.

## [2.1.2] - 2023-08-02

### Fixed

- Passing jsx element to tooltip inherited `title` prop was causing setting DOM attribute `title` to `[object Object]`.

## [2.1.1] - 2023-08-02

### Fixed

- Added missing `EllipsisProps` export.

## [2.1.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/flex-box` [5.0.0 ~> 5.1.0]).

## [2.0.1] - 2023-07-18

### Fix

- Removed ResizeObserver initiating during SSR.

## [2.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [1.2.32] - 2023-06-30

## [1.2.31] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0]).

## [1.2.30] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.3 ~> 3.53.4]).

## [1.2.29] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3]).

## [1.2.28] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2]).

## [1.2.27] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1]).

## [1.2.26] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [1.2.25] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [1.2.24] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [1.2.23] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [1.2.22] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [1.2.21] - 2023-05-10

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [5.4.9 ~> 5.4.10]).

## [1.2.19] - 2023-05-03

### Changed

- During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [1.2.18] - 2023-04-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [1.2.15] - 2023-04-11

### Changed

- Added React 18 to the peer dependencies.

## [1.2.14] - 2023-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [5.3.24 ~> 5.4.0]).

## [1.2.1] - 2023-02-16

### Fixed

- Ellipsis wasn't working when tooltip was disabled.

## [1.2.0] - 2023-02-15

### Added

- Supported passing tooltip props.

## [1.1.10] - 2023-02-09

### Fixed

- Stopped showing tooltip if text is not truncated.

## [1.1.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [1.1.4] - 2023-01-03

### Fixed

- Remove react warning with non-html props.

## [1.1.3] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1]).

## [1.1.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [1.1.0] - 2022-12-12

### Added

- Design tokens based theming.

## [1.0.1] - 2022-10-17

### Fixed

- Fixed utils version

## [1.0.0] - 2022-10-14

### Added

- Initial release
