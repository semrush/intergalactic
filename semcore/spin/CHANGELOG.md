# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.1.1] - 2021-05-14

### Fixed

- Fixed animation
- Rewrite code from TS to JS

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.1] - 2020-06-04

### Added

- Добавлена возможность темизации св-ва `theme` со значениями `default` и `invert` с помощью `babel-plugin-react-semcore`

## [3.0.0] - 2020-05-28

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность опционально подключать адаптивность
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.0.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.0.1] - 2019-05-13

### BREAK

- Убрано свойство `tip` и `direction`

### Added

- Добавлены пользовательские темы

## [1.2.0] - 2019-01-18

### Added

- Добавлена возможность сбрасывать темы и размеры

## [1.1.1] - 2018-11-23

### Fixed

- Убраны лишнии свойства из autocomplete для IDE

## [1.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [1.0.1] - 2018-10-24

### Changed

- default размер спинера изменили с `xs` на `m`

## [1.0.0] - 2018-08-08

### Added

- Добавленна поддержка зависимости от React15

### Changed

- Обновлена зависимость от utils

## [1.0.0-0] - 2018-07-06

### Added

- Initial release
