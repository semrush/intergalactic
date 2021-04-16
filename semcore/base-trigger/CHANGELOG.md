# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.2] - 2021-04-16

### Changed

- Changed line-height value

## [2.2.1] - 2020-12-23

### Fixed

- Fixed color `spinner` for `ButtonTrigger`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.1.0] - 2020-08-12

### Added

- Добавили новый триггер `LinkTrigger`
- Добавили состояние `loading` для `ButtonTrigger`

## [2.0.4] - 2020-07-13

### Changed

- Теперь z-index изменяется на +1 при фокусе с клавиатуры, для правильного отображения бордера с соседними элементами.

## [2.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.2] - 2020-06-08

### Fixed

- Исправлена типизация `FilterTrigger.Counter`

## [2.0.2] - 2020-06-03

### Fixed

- `FilterTrigger`, исправлено отображение свойства `disabled`
- `FilterTrigger`, исправлен цвет `FilterTrigger.Counter`

## [2.0.1] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.4.1] - 2020-02-13

### Fixed

- Переименовали сбилженные файлы с 'sm.style.css' -> 'style.css'

## [1.4.0] - 2020-02-12

### Added

- Добавлена тема `sellerly`, контрол `FilterTrigger` по умолчанию цвета `light-ultramarine`

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

## [1.2.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.1.9] - 2019-10-25

### Changed

- Обновили размер шеврона, теперь он один (size=`xs`) для всех размеров триггера

## [1.1.8] - 2019-10-21

### Fixed

- Возвращенна работа с клавиатуры

## [1.1.7] - 2019-10-15

### Fixed

- Добавлено состояние `active` при открытии в `FilterTrigger`

## [1.1.6] - 2019-10-14

### Added

- Добавлен `export` интерфейса для `ButtonTrigger`

## [1.1.5] - 2019-10-11

### Fixed

- Исправлена возможность задавать ширину FilterTrigger

## [1.1.1] - 2019-10-09

### Added

- Добавлены `ButtonTrigger`/`FilterTrigger`

## [1.0.0] - 2019-10-07

### Added

- Initial release
