# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.3] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1], `@semcore/flex-box` [4.7.2 ~> 4.7.3]).

## [3.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.2] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [3.2.1] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/flex-box` [4.6.3 ~> 4.6.4]).

## [3.2.0] - 2022-11-18

### Changed

- Changed margin-bottom from 16px to 24px.

## [3.1.3] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/flex-box` [4.6.2 ~> 4.6.3]).

## [3.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.0.10] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/flex-box` [4.5.11 ~> 4.5.12]).

## [3.0.7] - 2022-08-16

### Fixed

- Remove `overflow='auto'` because the component should not scroll, its content should adapt to the desired size.

## [3.0.6] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/flex-box` [4.5.8 ~> 4.5.9]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [2.2.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [2.2.4] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.2.3] - 2021-12-23

### Changed

- Changed `line-height` from 1.2 to 1.1 for correct display in all browsers.

## [2.2.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.1] - 2021-04-28

### Changed

- Changed media value to match breakpoints.

## [2.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.1] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.0] - 2020-06-09

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

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

## [1.0.0] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше
- Заменены устаревшие типографические переменные

## [1.0.0-1] - 2019-08-07

### Added

- Initial release
