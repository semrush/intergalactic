# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.4.28] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1], `@semcore/flex-box` [4.7.27 ~> 4.7.28]).

## [2.4.27] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0], `@semcore/flex-box` [4.7.26 ~> 4.7.27]).

## [2.4.26] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0], `@semcore/flex-box` [4.7.25 ~> 4.7.26]).

## [2.4.25] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1], `@semcore/flex-box` [4.7.24 ~> 4.7.25]).

## [2.4.24] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0], `@semcore/flex-box` [4.7.23 ~> 4.7.24]).

## [2.4.23] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7], `@semcore/flex-box` [4.7.22 ~> 4.7.23]).

## [2.4.22] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6], `@semcore/flex-box` [4.7.21 ~> 4.7.22]).

## [2.4.20] - 2023-04-24

## [2.4.19] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3], `@semcore/flex-box` [4.7.18 ~> 4.7.19]).

## [2.4.8] - 2023-02-09

## [2.4.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7]).

## [2.4.5] - 2023-01-10

## [2.4.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/flex-box` [4.7.3 ~> 4.7.4]).

## [2.4.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [2.4.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.3.5] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [2.3.4] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/flex-box` [4.6.3 ~> 4.6.4]).

## [2.3.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- This component has been deprecated. Added a message about it.

## [2.2.12] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/flex-box` [4.5.11 ~> 4.5.12]).

## [2.2.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.3] - 2020-11-05

### Changed

- Update package `flex-box`.

## [2.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.0] - 2020-05-28

### Added

- Добавили зависимость от пакета `@semcore/core`

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.0] - 2019-05-14

### Added

- Добавленна поддержка процентных значений

## [1.0.0] - 2019-04-18

### Added

- Initial release
