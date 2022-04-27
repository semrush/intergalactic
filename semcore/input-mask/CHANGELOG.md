# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.0.0] - unreleased

### BREAK

- Restyling component.
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
