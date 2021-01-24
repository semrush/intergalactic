# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.5] - 2020-11-18

### Fixed

- Fixed top margin of Notice.Actions

## [2.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.1] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавлена анимация на скрытие.
- Добавлено свойство `duration` для управления скоростью анимации.

### Changed

- Изменился цвет по ховеру для иконки закрытия нотиса, c 16% на 12%

## [1.4.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.3.0] - 2019-12-10

### Added

- `display: inline-flex` для уменьшения высоты `Notice.Label`

### Fixed

- Получение DOM-ноды через `ref` для всех компонентов

## [1.2.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.1.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.1] - 2019-09-09

### Changed

- обновил зависимости

### Fixed

- стили для текста и отступ у иконки закрыть `notice`

## [1.1.0] - 2019-03-21

### Added

- возможность задавать цвет из нашей палитры цветов

## [1.0.0] - 2019-03-14

### Added

- зависимость от `flex-box` компонента

### Fixed

- вызов `onClose` для `NoticeSmart`

### Removed

- поддержку свойства `closable` в `Notice`

## [1.0.0-1] - 2018-12-27

### Fixed

- Исправлена работа анимации

## [1.0.0-0] - 2018-09-26

### Added

- Initial release
