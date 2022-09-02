# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.0.15] - 2022-09-02

### Added

- Added accessibility for screen reader.

## [4.0.14] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/input` [3.0.14 ~> 3.0.15]).

## [4.0.13] - 2022-08-23

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.13 ~> 3.0.14]).

## [4.0.12] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/input` [3.0.12 ~> 3.0.13]).

## [4.0.11] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/input` [3.0.11 ~> 3.0.12]).

## [4.0.10] - 2022-07-25

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.9 ~> 3.0.10]).

## [4.0.9] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0], `@semcore/input` [3.0.8 ~> 3.0.9]).

## [4.0.8] - 2022-07-14

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.7 ~> 3.0.8]).

## [4.0.7] - 2022-07-14

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.6 ~> 3.0.7]).

## [4.0.6] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/input` [3.0.5 ~> 3.0.6]).

## [4.0.5] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/input` [3.0.4 ~> 3.0.5]).

## [4.0.4] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/input` [3.0.3 ~> 3.0.4]).

## [4.0.3] - 2022-05-23

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.2 ~> 3.0.3]).

## [4.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/input` [3.0.1 ~> 3.0.2]).

## [4.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.0 ~> 3.0.1]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Major dependency update Input.

## [3.2.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/input` [2.2.4 ~> 2.2.5]).

## [3.2.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.1] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.0] - 2020-09-28

### BREAK

- Property `placeholderChar`, it is everything have to use `\_`, because mask show in value to input

### Added

- Manage cursor position for `InputMask.Value` with show mask
- Export function `getAfterPositionValue`. It use when need to know where last symbol of value.

### Fixed

- Show mask for `InputMask.Value` when size input less than size mask

## [2.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.0] - 2020-06-18

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.1.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.0.4] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-05

### Fixed

- Исправлена ошибка в типизации `InputMask.Value`

## [1.0.1] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [1.0.0] - 2019-07-26

### Added

- Initial release
