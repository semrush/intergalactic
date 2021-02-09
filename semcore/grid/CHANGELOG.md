# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.2.0] - unreleased

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
