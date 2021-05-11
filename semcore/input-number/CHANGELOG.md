# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.0.0] - 2021-05-11

### BREAK

- Replaced internal representation with native input(type=number).
- Changed type for value to string.

## [2.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.0] - 2020-06-08

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.2.0] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [1.1.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.2] - 2019-06-24

### Fixed

- Исправлены ошибки в типизации

## [1.1.1] - 2019-05-23

### Fixed

- Добавлен `type="button"` на стрелочки, что бы не отправлять форму при нажатии

## [1.1.0] - 2019-03-14

### Added

- добавили поддержку `null` в `value`(тоже самое, что и "")
- добавили валидацию на `Enter`

### Changed

- добавили `stopPropagation` для `onChange`, что бы уменьшить возможные ошибки

## [1.0.1] - 2019-03-14

### Added

- `tabIndex={-1}` для контролов в `Input.Controls`

### Fixed

- стили для контролов в `Input.Controls`

## [1.0.0] - 2019-03-11

### Added

- Initial release
