# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
