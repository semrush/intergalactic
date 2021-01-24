# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.1] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.0] - 2020-09-24

### Fixed

- Remove set css property `max-width` for `Breadcrumbs.Item`

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.0] - 2020.06.03

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.0.4] - 2019-10-08

### Changed

- Обноdвился `separated-list`, теперь не обязательно указывать для последнего элемента `disableSeparator`

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-05

### Fixed

- Исправлены ошибки типизации `Breadcrumbs.Item`

## [1.0.1] - 2019-05-30

### Changed

- Цвет разделителя заменен на \$gray60

## [1.0.0] - 2019-05-30

### Added

- Initial release
