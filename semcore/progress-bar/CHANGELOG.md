# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.2.3] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.6.2 ~> 4.6.3], `@semcore/utils` [3.40.0 ~> 3.40.0]).

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.1.1] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.5.11 ~> 4.5.12], `@semcore/utils` [3.37.1 ~> 3.37.2]).

## [3.1.0] - 2022-09-20

### Fixed

- Added essential accessibility attributes.

## [3.0.9] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [3.0.4] - 2022-06-09

### Fixed

- Theme prop doesn't work when styles has been post-processed

## [3.0.3] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/flex-box` [4.5.4 ~> 4.5.5]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove named import "Progress" and "Bar".
- Remove "animation" props, use "value=0".

## [2.3.1] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [2.3.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.2.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- [TS] rewrite code from TS to JS

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.3] - 2020-09-11

### Fixed

- Change background color with opacity(rgba) to static color.

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-06-26

### Fixed

- Исправлены описания типов для `Bar` и `Progress`

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавили свойство `duration` для управления скоростью анимации для `ProgressBar` и `ProgressBar.Value`.
- Добавили свойство `theme` для кастомизации отображения для `ProgressBar` и `ProgressBar.Value`.

## [1.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.0.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.0] - 2019-02-05

### Added

- Initial release
