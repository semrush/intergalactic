# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/card` [5.2.0 ~> 5.3.0], `@semcore/utils` [4.0.0 ~> 4.1.0]).

## [3.2.0] - 2023-08-01

### Changed

- Version minor update due to children dependencies update (`@semcore/card` [5.1.0 ~> 5.2.0], `@semcore/flex-box` [5.0.0 ~> 5.1.0]).

## [3.1.0] - 2023-07-27

### Changed

- Use `event.key` instead of `event.code` for better support of non QWERTY keyboard layouts.

## [3.0.1] - 2023-07-18

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [5.0.0 ~> 5.0.1]).

## [3.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [2.6.4] - 2023-06-30

## [2.6.3] - 2023-06-28

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.26 ~> 4.3.27]).

## [2.6.2] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.25 ~> 4.3.26], `@semcore/utils` [3.53.4 ~> 3.54.0]).

## [2.6.1] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.24 ~> 4.3.25], `@semcore/utils` [3.53.3 ~> 3.53.4]).

## [2.6.0] - 2023-06-12

### Added

- Swedish (`sv`) locale support.

## [2.5.2] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.23 ~> 4.3.24], `@semcore/utils` [3.53.2 ~> 3.53.3]).

## [2.5.1] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.22 ~> 4.3.23], `@semcore/utils` [3.53.1 ~> 3.53.2]).

## [2.5.0] - 2023-06-09

### Added

- Polish (`pl`) locale support.

## [2.4.45] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.21 ~> 4.3.22], `@semcore/utils` [3.53.0 ~> 3.53.1]).

## [2.4.44] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.20 ~> 4.3.21], `@semcore/utils` [3.52.0 ~> 3.53.0]).

## [2.4.43] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.19 ~> 4.3.20], `@semcore/utils` [3.51.1 ~> 3.52.0]).

## [2.4.42] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.18 ~> 4.3.19], `@semcore/utils` [3.51.0 ~> 3.51.1]).

## [2.4.41] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.17 ~> 4.3.18], `@semcore/utils` [3.50.7 ~> 3.51.0]).

## [2.4.40] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.16 ~> 4.3.17], `@semcore/utils` [3.50.6 ~> 3.50.7]).

## [2.4.39] - 2023-05-10

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.15 ~> 4.3.16]).

## [2.4.37] - 2023-05-04

### Changed

- Made draggable elements dragging pattern more contrast.

## [2.4.36] - 2023-05-03

### Changed

- During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [2.4.35] - 2023-04-27

### Changed

- Version patch update due to children dependencies update (`@semcore/grid` [4.3.20 ~> 4.3.21]).

## [2.4.31] - 2023-04-03

### Fixed

- Fixed screen reader annotation of visually untitled items.

## [2.4.30] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.3.8 ~> 4.3.9]).

## [2.4.17] - 2023-03-01

## [2.4.16] - 2023-02-24

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.2.17 ~> 4.2.18]).

## [2.4.15] - 2023-02-22

## [2.4.14] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.2.15 ~> 4.2.16], `@semcore/utils` [3.47.0 ~> 3.47.1]).

## [2.4.11] - 2023-02-13

## [2.4.10] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-surface-rounded`).

## [2.4.9] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.2.10 ~> 4.2.11], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [2.4.6] - 2023-01-11

## [2.4.5] - 2023-01-10

## [2.4.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.2.5 ~> 4.2.6], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [2.4.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [2.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.2.0] - 2022-11-28

### Changed

- Component was fully rebuilt internally. Backward capability mostly preserved, legacy apis was marked as deprecated.

## [2.1.7] - 2022-11-14

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.1.6 ~> 4.1.7]).

## [2.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [2.0.22] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/card` [4.0.22 ~> 4.0.23]).

## [2.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [1.0.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [1.0.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.0.1] - 2021-12-08

### Fixed

- Fixed global color .dnd

## [1.0.0] - 2021-11-12

### Changed

- Up version

## [1.0.0-5] - 2021-9-06

### Changed

- Added support keydown for draggable block in droppable zone.
- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.

## [1.0.0-4] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.0.0-3] - 2020-12-17

### Added

- Added supported react@17.

## [1.0.0-2] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [1.0.0-1] - 2020-10-03

### Fixed

- TS property `noDrop` became not requered for `IDraggableProps`.

## [1.0.0-0] - 2020-09-09

### Added

- Initial release
