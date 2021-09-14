# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.4.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.3.0] - 2021-02-16

### Added

- Added supported react-dom@17.

## [2.2.0] - 2020-12-24

### Changed

- Changed mouse event from click to mouseup for stable performance.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавлена возможность указывать ref в `excludeRefs`
- Добавлена возможность передавать `children`, тогда его ref автоматически попадет в `excludeRefs`
- Добавлено свойство `root` для возможности указывать элемент, который будет считаться рутовым

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.2] - 2019-06-13

### Fixed

- Исправлен проблема отсутствия mouseDown таргета

## [1.1.1] - 2019-05-20

### Fixed

- Исправлена проблема, когда начало клика происходит на одной ноде, а заканчивается на другой

## [1.1.0] - 2019-03-21

### Added

- Добавлен метод динамического добавление exclude node

## [1.0.1] - 2018-09-27

### Fixed

- Добавлены пропущенные типы

## [1.0.0] - 2018-09-27

### Added

- Initial release
