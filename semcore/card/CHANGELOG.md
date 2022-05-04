# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.0.0] - unreleased

### BREAK

- Restyling component.

## [3.0.6] - 2022-04-28

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.20.0 ~> 2.21.0]).

## [3.0.5] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.19.4 ~> 2.20.0]).

## [3.0.4] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [3.0.3] - 2022-03-04

### Changed

- Version patch update due to children dependencies update (`@semcore/typography` [3.3.2 ~> 3.4.0]).

## [3.0.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.0.0] - 2022-02-18

### BREAK

- `Card` was divided into Header and Body

### Added

- Background was added

## [2.5.0] - 2021-02-18

### Fixed

- Reverted `Card` to a previous state with styles in the card itself and without `Header` and `Body`

## [2.4.1] - 2021-02-14

### Fixed

- Up version of `Utils`

## [2.4.0] - 2022-02-03

### Changed

- `Card` has been split into Header and Body and a background has been added

## [2.3.0] - 2022-01-18

### Changed

- Up version icons and use new icon.
- Rewrite code from TS to JS 🧑‍💻

## [2.2.2] - 2021-9-20

### Fixed

- Fixed padding

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

## [2.0.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.0] - 2020-06-08

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.2.3] - 2020-04-07

### Fixed

- Исправлено поведение при котором отображалась иконка и тултип при пустом `hint`.

## [1.2.2] - 2020-03-23

### Fixed

- Исправлена проблема в установке произвольного className в `Description` и `Title`.

## [1.2.1] - 2020-03-06

### Added

- Добавили средную жирность для начертания шрифта в компоненте `Card.Title` (`font-weigth: 500`)

## [1.2.0] - 2020-02-13

### Added

- Добавились компоненты `Card.Title` и `Card.Description`

## [1.1.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.0.4] - 2019-09-30

### Fixed

- Исправлены ts типы

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.0] - 2018-03-13

### Added

- Initial release
