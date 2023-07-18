# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [2.3.24] - 2023-06-30

## [2.3.23] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0]).

## [2.3.22] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.3 ~> 3.53.4]).

## [2.3.21] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3]).

## [2.3.20] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2]).

## [2.3.19] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1]).

## [2.3.18] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [2.3.17] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [2.3.16] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [2.3.15] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [2.3.14] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [2.3.13] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [2.3.12] - 2023-05-03

### Changed

- During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [2.3.11] - 2023-04-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [2.3.0] - 2023-02-20

### Added

- Added `<AnimatedNumber />` exported component.

## [2.2.8] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-counter-rounded`).

## [2.2.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [2.2.5] - 2023-01-10

## [2.2.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [2.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [2.0.9] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [2.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [1.3.2] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [1.3.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.3.0] - 2021-12-08

### Added

- Added warning and danger themes

## [1.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [1.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [1.0.0] - 2020-08-16

### Added

- Счетчик – это элемент, который показывает количество.
