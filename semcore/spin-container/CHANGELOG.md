# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [6.2.29] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0], `@semcore/spin` [4.2.23 ~> 4.2.24], `@semcore/flex-box` [4.7.23 ~> 4.7.24], `@semcore/animation` [1.10.9 ~> 1.10.10]).

## [6.2.28] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7], `@semcore/spin` [4.2.22 ~> 4.2.23], `@semcore/flex-box` [4.7.22 ~> 4.7.23], `@semcore/animation` [1.10.8 ~> 1.10.9]).

## [6.2.27] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6], `@semcore/spin` [4.2.21 ~> 4.2.22], `@semcore/flex-box` [4.7.21 ~> 4.7.22], `@semcore/animation` [1.10.7 ~> 1.10.8]).

## [6.2.25] - 2023-05-02

## [6.2.24] - 2023-04-26

## [6.2.23] - 2023-04-24

## [6.2.22] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3], `@semcore/spin` [4.2.18 ~> 4.2.19], `@semcore/flex-box` [4.7.18 ~> 4.7.19], `@semcore/animation` [1.10.1 ~> 1.10.2]).

## [6.2.21] - 2023-04-03

## [6.2.20] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0], `@semcore/spin` [4.2.17 ~> 4.2.18], `@semcore/flex-box` [4.7.17 ~> 4.7.18], `@semcore/animation` [1.9.9 ~> 1.10.0]).

## [6.2.9] - 2023-02-09

## [6.2.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/spin` [4.2.6 ~> 4.2.7], `@semcore/flex-box` [4.7.6 ~> 4.7.7], `@semcore/animation` [1.8.9 ~> 1.8.10]).

## [6.2.5] - 2023-01-10

## [6.2.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/spin` [4.2.3 ~> 4.2.4], `@semcore/flex-box` [4.7.3 ~> 4.7.4], `@semcore/animation` [1.8.5 ~> 1.8.6]).

## [6.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [6.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [6.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [6.0.12] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/spin` [4.0.10 ~> 4.0.11], `@semcore/flex-box` [4.5.11 ~> 4.5.12], `@semcore/animation` [1.5.10 ~> 1.5.11]).

## [6.0.11] - 2022-09-20

### Fixed

- Added essential accessibility attributes.

## [6.0.10] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/spin` [4.0.8 ~> 4.0.9], `@semcore/flex-box` [4.5.10 ~> 4.5.11], `@semcore/animation` [1.5.9 ~> 1.5.10]).

## [6.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [5.1.0] - 2022-04-25

### Fixed

- Fixed scollable spin-container (e.g. in `data-table`).

## [5.0.5] - 2022-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.0]).

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
