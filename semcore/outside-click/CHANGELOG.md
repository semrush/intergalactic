# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.5.18] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.3 ~> 3.47.4]).

## [2.5.13] - 2023-02-09

## [2.5.12] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [2.5.10] - 2023-01-10

## [2.5.9] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [2.5.6] - 2022-12-12

## [2.5.5] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [2.5.4] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0]).

## [2.5.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [2.4.14] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [2.4.2] - 2022-02-24

### Added

- Added repository field to package.json file.

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
