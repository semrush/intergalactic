# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.37] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/modal` [3.6.6 ~> 3.6.7]).

## [2.2.36] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7], `@semcore/flex-box` [4.7.22 ~> 4.7.23]).

## [2.2.35] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6], `@semcore/flex-box` [4.7.21 ~> 4.7.22]).

## [2.2.33] - 2023-04-28

### Fixed

- Added `aria-label` for the close icon.

## [2.2.31] - 2023-04-12

### Changed

- Default title tag switched from `h4` to `h2` without changing visual representation.

### Fixed

- Fixed ability to control from keyboard for `Close` and `Back`.

## [2.2.30] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0], `@semcore/flex-box` [4.7.17 ~> 4.7.18]).

## [2.2.9] - 2023-01-19

### Fixed

- Removed font-family enforcement.

## [2.2.8] - 2023-01-18

### Changed

- Version patch update due to children dependencies update (`@semcore/modal` [3.3.6 ~> 3.4.0]).

## [2.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.1.7] - 2022-11-08

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
