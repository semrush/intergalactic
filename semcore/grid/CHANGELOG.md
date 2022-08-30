# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.1.13] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [4.1.12] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/flex-box` [4.5.9 ~> 4.5.10]).

## [4.1.11] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/flex-box` [4.5.8 ~> 4.5.9]).

## [4.1.10] - 2022-08-01

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.0 ~> 3.35.1], `@semcore/flex-box` [4.5.7 ~> 4.5.8]).

## [4.1.9] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0], `@semcore/flex-box` [4.5.6 ~> 4.5.7]).

## [4.1.8] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/flex-box` [4.5.5 ~> 4.5.6]).

## [4.1.7] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/flex-box` [4.5.4 ~> 4.5.5]).

## [4.1.6] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/flex-box` [4.5.3 ~> 4.5.4]).

## [4.1.5] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/flex-box` [4.5.1 ~> 4.5.3]).

## [4.1.4] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [4.1.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [4.1.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.1.1] - 2021-04-28

### Changed

- Changed media value to match breakpoints.

## [4.1.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [4.0.0] - 2021-02-11

### BREAK

- Change the responsive breakpoint from 992px to 1184px.

### Added

- Added alternative API for `span` and `offset`.
- Added breakpoint `xs`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.0] - 2020-04-20

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.3.0] - 2019-12-27

### Added

- Появилась возможность скрывать колонку указывая `span=0/sm=0/md=0`

## [2.2.1] - 2019-12-17

### Fixed

- Исправлена проблема отсутствия media query в итоговом build css

## [2.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.1.0] - 2019-11-14

### Added

- Добавлены свойства `sm`/`md` для респонсив работы сетки

## [2.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.0.2] - 2019-08-02

### Fixed

- Исправлена сборка для SSR

## [2.0.1] - 2019-07-31

### Fixed

- Обнавлена сборка для `babel-css-style`

## [2.0.0] - 2019-01-18

### BREAK

- Поднята major версия у `flex-box` (переименовано свойство `flex` -> `flexWrap`)

## [1.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [1.0.0] - 2018-11-07

### Added

- Initial release
