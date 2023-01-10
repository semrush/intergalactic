# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.6] - 2023-01-10

## [2.2.5] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/animation` [1.8.5 ~> 1.8.6], `@semcore/flex-box` [4.7.3 ~> 4.7.4], `@semcore/portal` [2.5.2 ~> 2.5.3], `@semcore/outside-click` [2.5.8 ~> 2.5.9], `@semcore/icon` [3.5.0 ~> 3.5.1]).

## [2.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.1.8] - 2022-11-08

## [2.1.7] - 2022-10-30

### Changed

- Updated `focus-lock`.

## [2.1.6] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/animation` [1.7.0 ~> 1.7.1], `@semcore/flex-box` [4.6.2 ~> 4.6.3], `@semcore/portal` [2.4.2 ~> 2.4.3], `@semcore/outside-click` [2.5.2 ~> 2.5.3], `@semcore/icon` [3.1.1 ~> 3.1.2]).

## [2.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [2.0.21] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [2.0.3] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [2.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/animation` [1.5.0 ~> 1.5.1], `@semcore/flex-box` [4.5.1 ~> 4.5.3], `@semcore/portal` [2.3.3 ~> 2.3.4], `@semcore/typography` [4.0.1 ~> 4.0.3], `@semcore/outside-click` [2.4.3 ~> 2.4.4], `@semcore/icon` [2.25.0 ~> 2.25.1]).

## [2.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

### Added

- Added children components `Header, Footer, Body, Back, Title` for `SidePanel`.

## [1.3.8] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [1.3.4] - 2022-03-09

### Fixed

- Fixed jumping content, when body don't have `box-sizing`.

## [1.3.3] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [1.3.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.3.1] - 2022-01-25

### Changed

- Replaced function `findComponent` to `isAdvanceMode` for check children in `SidePanel`.

## [1.3.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [1.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.2.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.0.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [1.0.2] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [1.0.1] - 2020-10-01

### Fixed

- Fixed call `onClose` when used for click on page with `SidePanel.Panel` in inside `<SidePanel visible={false}/>`.

## [1.0.0] - 2020-09-11

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [1.0.0-0] - 2020-08-14

### Added

- SidePanel — компонент для отображения выезжающей панели (справа, снизу или слева). Иногда зовем его "шторкой"
