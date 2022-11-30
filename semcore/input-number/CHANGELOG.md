# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.1.6] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.3.1 ~> 3.4.0], `@semcore/utils` [3.41.0 ~> 3.42.0]).

## [4.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.0.18] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.16 ~> 3.1.0]).

## [4.0.15] - 2022-08-25

### Added

- Added screen reader notification of input value and aria attributes for better a11y.

## [4.0.14] - 2022-08-23

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.13 ~> 3.0.14]).

## [4.0.7] - 2022-07-13

### Fixed

- Fixed rounding of float numbers.

## [4.0.6] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/input` [3.0.5 ~> 3.0.6]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Major dependency update Input.

## [3.0.6] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/input` [2.2.4 ~> 2.2.5]).

## [3.0.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.0.4] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.0.3] - 2020-08-17

### Fixed

- Fixed entering invalid values.

## [3.0.2] - 2020-06-16

### Added

- [A11y] added aria-label for buttons in `InputNumber.Controls`

## [3.0.1] - 2020-05-31

### Fixed

- Fixed the js problem with the remainder of division.

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
