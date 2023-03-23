# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.26] - 2023-03-23

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.4 ~> 3.48.0], `@semcore/flex-box` [4.7.13 ~> 4.7.14]).

## [2.2.19] - 2023-03-01

## [2.2.18] - 2023-02-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.12.0 ~> 3.13.0]).

## [2.2.17] - 2023-02-22

## [2.2.16] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1], `@semcore/flex-box` [4.7.9 ~> 4.7.10]).

## [2.2.13] - 2023-02-13

## [2.2.12] - 2023-02-09

## [2.2.11] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/icon` [3.7.0 ~> 3.8.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7]).

## [2.2.9] - 2023-01-19

### Fixed

- Removed font-family enforcement.

## [2.2.8] - 2023-01-18

### Changed

- Version patch update due to children dependencies update (`@semcore/modal` [3.3.6 ~> 3.4.0]).

## [2.2.7] - 2023-01-11

## [2.2.6] - 2023-01-10

## [2.2.5] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/flex-box` [4.7.3 ~> 4.7.4]).

## [2.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.1.7] - 2022-11-08

## [2.1.6] - 2022-11-03

### Changed

- Version patch update due to children dependencies update (`@semcore/modal` [3.1.6 ~> 3.1.7]).

## [2.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [2.0.23] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [2.0.18] - 2022-09-08

### Changed

- Removed unused `hidden` property from types.

## [2.0.17] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [2.0.9] - 2022-07-13

### Fixed

- Fixed font family in Title

## [2.0.8] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/icon` [2.27.0 ~> 2.28.0], `@semcore/flex-box` [4.5.5 ~> 4.5.6]).

## [2.0.2] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [2.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.24.0 ~> 2.25.0]).

## [2.0.0] - 2022-05-17

### BREAK

- Remove support property `hidden` for `FullscreenModal`.
- `Footer` now use inside component `Flex`
- Updated styles according to the library redesign policy.

## [1.6.5] - 2022-05-16

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

## [1.4.1] - 2021-06-29

### Changed

- Rewrite code from TS to JS.

## [1.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [1.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.2.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [1.2.2] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [1.2.1] - 2020-09-30

### Fixed

- Fixed show two close icon in preview `FullscreenModal`
- Fixed offset right for `FullscreenModal.Close`

## [1.2.0] - 2020-09-09

### Added

- Added dependency on `@semcore/modal`. Component use `<Modal>` for initialization.
- Added properties `visible`, `closable`, `duration`, about them can you read in [API](/components/fullscreen-modal/fullscreen-modal-api/#a5f727)

## [1.1.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [1.1.1] - 2020-07-14

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [1.1.0] - 2020-06-08

### Added

- Добавили блокирование скролла на `body`, когда компонент виден.

## [1.0.0] - 2020-06-04

### Added

- Initial release
