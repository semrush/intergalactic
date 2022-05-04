# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.4.0] - unrelease

### Added

- Added children components `Header, Footer, Body, Back, Title` for `SidePanel`.

### Changed

- Updated colors

## [1.3.7] - 2022-04-28

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.20.0 ~> 2.21.0]).

## [1.3.6] - 2022-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.0]).

## [1.3.5] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.19.4 ~> 2.20.0]).

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
