# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
