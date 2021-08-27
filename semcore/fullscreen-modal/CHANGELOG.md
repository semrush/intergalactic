# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
