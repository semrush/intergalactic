# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.5.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [2.4.14] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [2.4.13] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [2.4.12] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0]).

## [2.4.11] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0]).

## [2.4.10] - 2022-08-01

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.0 ~> 3.35.1]).

## [2.4.9] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0]).

## [2.4.7] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0]).

## [2.4.6] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0]).

## [2.4.5] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2]).

## [2.4.4] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1]).

## [2.4.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

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
