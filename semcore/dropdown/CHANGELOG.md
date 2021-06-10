# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.3.0] - 2021-06-10

### Added

- Support keydown `Enter` and `Space` for open Popper.
- Logic checked interactive trigger from `DropdownMenu`.

## [2.2.2] - 2021-06-08

### Fixed

- Fix TS type

## [2.2.1] - 2021-05-07

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.8] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.7] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.0.6] - 2020-09-30

### Fixed

- Add missing TS type properties in context

## [2.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.4] - 2020-07-22

### Fixed

- Исправли проблему неправильного позиционирование `Dropdown.Popper` относительно триггера с заданным значением
  `stretch` для `Dropdown`.

## [2.0.3] - 2020-07-06

### Changed

- Обновлена версия зависимости `@semcore/popper`

## [2.0.2] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.1] - 2020-06-08

### Fixed

- Исправлена типизация `IDropdownContext`

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.3.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.2.4] - 2019-12-02

### Fixed

- Добавлен `white-space: normal;` так как он может наследоваться в случаях отключения рендера в портал(`disabledPortal`)
- Убрано скрытие Popper, когда его Trigger выходит из viewbox

## [1.2.3] - 2019-11-14

### Fixed

- Добавлен проброс `onOutsideClick` и `modifiers`

## [1.2.2] - 2019-10-10

### Changed

- Обнавлены зависимости `popper`/`flex-box`/`utils`

- Исправлен дефолтный триггер

## [1.2.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.2.0] - 2019-05-13

### Added

- Добавленно свойство `popperStretch` отвечающие за размер всплывающего окна
- Компонент `Popper` унаследован от `Box`

## [1.1.3] - 2019-04-12

### Fixed

- Скрываем всплывающее окно, если триггер вышел за `viewport`

## [1.1.2] - 2019-04-09

### Added

- Добавлен тип `IDropdownPopperProps`

## [1.1.1] - 2019-01-02

### Added

- Экспорт `PortalProvider`

## [1.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [1.0.0] - 2018-11-07

### Added

- возможность использовать рендер функцию в `Dropdown.Popper`

## [1.0.0-3] - 2018-10-11

### BREAK

- версию пакета `@semcore/popper`

## [1.0.0-2] - 2018-09-27

### Changed

- версию пакета `@semcore/utils`

## [1.0.0-1] - 2018-09-27

### Added

- Initial release
