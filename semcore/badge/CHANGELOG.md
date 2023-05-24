# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.26] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [3.3.25] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [3.3.24] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [3.3.23] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [3.3.22] - 2023-05-04

### Changed

- Made default `<Badge />` background more contrast.

## [3.3.21] - 2023-05-03

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.4 ~> 3.50.5]).

## [3.3.14] - 2023-03-23

### Fixed

- Made Badge visible for screen readers again.

## [3.3.13] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.3 ~> 3.47.4]).

## [3.3.8] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-badge-rounded`).

## [3.3.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.1.3] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [3.1.2] - 2022-09-01

### Fixed

- Change line-height to correctly display uppercase letters.

## [3.1.1] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [3.1.0] - 2022-08-12

### Added

- Added aria-hidden because component "badge" is not the main functionality and will only confuse the blind user.

## [3.0.6] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [2.3.7] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [2.3.6] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.3.5] - 2021-12-27

### Changed

- correct `line-height` value to 1.2.

## [2.3.3] - 2021-09-09

### Changed

- Changed line-height value

## [2.3.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.1] - 2021-07-30

### Changed

- Changed line-height value

## [2.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.5] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.3] - 2020-07-13

### Fixed

- Исправили проблему отображения текста внутри компонента на 1px ниже в FF.

## [2.1.2] - 2020-06-30

### Fixed

- Исправили проблему некорректного отображения компонента, при наследовании `line-height`. Заменили `height: 12px` на `line-height: 1.2em`

## [2.1.1] - 2020-06-24

### Fixed

- Добавилась высота компонента, теперь он корректно отображается.

## [2.1.0] - 2020-06-22

### Changed

- Изменился шрифт внутри компонента с `PFLink` на `Ubuntu`, компонент изменился по высоте с 11px до 13px.

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.5.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.4.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.3.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.3.1] - 2019-07-31

### Fixed

- Добавлены ts типы от унаследованного `Paint`
- Исправлена сборка для рендера css на сервере

## [1.3.0] - 2019-02-18

### Changed

- Обновлена версия `paint`

## [1.2.0] - 2019-02-05

### Added

- Унаследовано от `Box`

### Changed

- Обновленны зависимости `paint`/`utils`

## [1.1.1] - 2018-11-23

### Fixed

- Исправлен autocomplete для IDE

## [1.1.0] - 2018-11-23

### Changed

- Подняли версию "@semcore/paint"

## [1.0.0] - 2018-11-22

### Added

- Initial release
