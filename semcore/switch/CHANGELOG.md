# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.3.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.6 ~> 4.7.7], `@semcore/neighbor-location` [3.1.12 ~> 3.1.13], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [4.3.5] - 2023-01-10

## [4.3.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.3 ~> 4.7.4], `@semcore/neighbor-location` [3.1.9 ~> 3.1.10], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [4.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [4.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.1.2] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [4.1.1] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.5.11 ~> 4.5.12], `@semcore/neighbor-location` [2.3.15 ~> 2.3.16], `@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.1.0] - 2022-09-22

### Changed

- Improved accessibility with labeling switch by currently picked option.

## [4.0.8] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11], `@semcore/neighbor-location` [2.3.14 ~> 2.3.15]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [3.4.1] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/neighbor-location` [2.3.4 ~> 2.3.5]).

## [3.4.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [3.3.4] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.3.3] - 2022-02-22

### Fixed

- Removed react warning about uncontrolled timer.

## [3.3.2] - 2021-11-08

### Fixed

- Fixed animation checked when opening in Popper.

## [3.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.0] - 2021-06-16

### Changed

- [A11y] added `role="switch"` and support the Enter or Space key for used to toggle between a checked or unchecked
  positions.
- [TS] Rewrite code from TS to JS.

## [3.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.6] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.4] - 2020-08-21

### Fixed

- Исправили баг в поведении `uncontrol` режима при передачи `checked` в `Switch.Value`

## [3.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [3.0.2] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.4.3] - 2020-05-14

### Fixed

- Изменили цвет текста для включенной опции с `#000` -> `#333`, чтобы соответствовало макетам.

## [2.4.2] - 2020-03-25

### Fixed

- Добавлена пропущенная зависимость `@semcore/neighbor-location`

## [2.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.2.1] - 2019-10-17

### Fixed

- Отображение в `uncontrol` режиме

## [2.2.0] - 2019-10-17

### Added

- свойство `includeInputProps` для `Switch.Value`

### Changed

- Поменяли расположение скрытого инпута

## [2.1.0] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [2.0.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.0.0] - 2019-06-21

### BREAK

- Убраны свойства `labelProps`, `onCheckedChange`
- Изменили имена размеров `[s,m,l]` -> `[m,l,xl]`
- Добавили компоненты `Switch.Addon`, `Switch.Value`

## [1.0.2] - 2018-12-26

### Added

- автокомплит для IDE

## [1.0.1] - 2018-08-21

### Changed

- Размер текста для size="s" увеличен до 12px

## [1.0.0] - 2018-08-08

### Added

- Initial release
