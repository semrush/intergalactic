# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [6.0.9] - 2022-08-29

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.8 ~> 1.5.9]).

## [6.0.8] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/spin` [4.0.7 ~> 4.0.8], `@semcore/flex-box` [4.5.9 ~> 4.5.10], `@semcore/animation` [1.5.7 ~> 1.5.8]).

## [6.0.7] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/spin` [4.0.6 ~> 4.0.7], `@semcore/flex-box` [4.5.8 ~> 4.5.9], `@semcore/animation` [1.5.6 ~> 1.5.7]).

## [6.0.6] - 2022-08-01

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.0 ~> 3.35.1], `@semcore/spin` [4.0.5 ~> 4.0.6], `@semcore/flex-box` [4.5.7 ~> 4.5.8], `@semcore/animation` [1.5.5 ~> 1.5.6]).

## [6.0.5] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0], `@semcore/spin` [4.0.4 ~> 4.0.5], `@semcore/flex-box` [4.5.6 ~> 4.5.7], `@semcore/animation` [1.5.4 ~> 1.5.5]).

## [6.0.4] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/spin` [4.0.3 ~> 4.0.4], `@semcore/flex-box` [4.5.5 ~> 4.5.6], `@semcore/animation` [1.5.3 ~> 1.5.4]).

## [6.0.3] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/spin` [4.0.2 ~> 4.0.3], `@semcore/flex-box` [4.5.4 ~> 4.5.5], `@semcore/animation` [1.5.2 ~> 1.5.3]).

## [6.0.2] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/spin` [4.0.1 ~> 4.0.2], `@semcore/flex-box` [4.5.3 ~> 4.5.4], `@semcore/animation` [1.5.1 ~> 1.5.2]).

## [6.0.1] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/spin` [4.0.0 ~> 4.0.1], `@semcore/flex-box` [4.5.1 ~> 4.5.3], `@semcore/animation` [1.5.0 ~> 1.5.1]).

## [6.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [5.1.0] - 2022-04-25

### Fixed

- Fixed scollable spin-container (e.g. in `data-table`).

## [5.0.5] - 2022-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.0]).

## [5.0.4] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/spin` [3.4.0 ~> 3.4.1], `@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/animation` [1.4.1 ~> 1.4.2]).

## [5.0.3] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [5.0.2] - 2021-02-28

### Fixed

- [ts] correct types.

## [5.0.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [5.0.0] - 2022-02-22

### BREAK

- Add new children component `SpinContainer.Content` when using advanced mode along with `SpinContainer.Overlay`.

## [4.0.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.0.0] - 2021-07-05

### BREAK

- Replace animation from package `react-transition-group` to `@semcore/animation`.

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- [TS] rewrite code from TS to JS.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.0] - 2020-05-28

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавлена анимация на появление и скрытие
- Добавлено свойство `duration` для управления скоростью анимации

## [2.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.2.1] - 2019-11-25

### Fixed

- Перезаллили `production` сборку с хэш именами классов

## [2.2.0] - 2019-11-14

### Added

- Поддержку рендер фукнции для `SpinContainer`

### Fixed

- Исправили `SpinContainer.Overlay`, теперь это компонент с версткой

## [2.1.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.1.0] - 2019-06-18

### Added

- `SpinContainer.Overlay` для возможноти кастомизации подложки под `Spin`

### Fixed

- Исправленно css свойство `display` c `inline-block` на `block`

## [2.0.1] - 2019-05-21

### Fixed

- Исправленно поведение когда контент width: 100%

## [2.0.0] - 2019-05-13

### BREAK

- Убрано свойство `spinner`

### Changed

- Добавлена обертка над контентом

### Added

- Добавлено новое свойство `background` для изменения фона

## [1.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [1.0.0] - 2018-08-08

### Added

- Добавленна поддержка зависимости от React15

### Changed

- Обновлена зависимость от utils

## [1.0.0-0] - 2018-07-06

### Added

- Initial release
