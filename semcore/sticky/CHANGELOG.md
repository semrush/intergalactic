# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.3.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- This component has been deprecated. Added a message about it.

## [2.2.12] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/flex-box` [4.5.11 ~> 4.5.12]).

## [2.2.11] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [2.2.10] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/flex-box` [4.5.9 ~> 4.5.10]).

## [2.2.9] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/flex-box` [4.5.8 ~> 4.5.9]).

## [2.2.8] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0], `@semcore/flex-box` [4.5.6 ~> 4.5.7]).

## [2.2.7] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/flex-box` [4.5.5 ~> 4.5.6]).

## [2.2.6] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/flex-box` [4.5.4 ~> 4.5.5]).

## [2.2.5] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/flex-box` [4.5.3 ~> 4.5.4]).

## [2.2.4] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/flex-box` [4.5.1 ~> 4.5.3]).

## [2.2.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

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
