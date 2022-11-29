# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.2.9] - 2022-11-28

### Changed

- Version patch update due to children dependencies update (`@semcore/dot` [4.1.4 ~> 4.1.5]).

## [3.2.8] - 2022-11-15

### Added

- Added support text ellipsis in `LinkTrigger.Text`.

## [3.2.7] - 2022-11-14

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.2.0 ~> 3.3.0]).

## [3.2.6] - 2022-11-07

### Fixed

- Fixed `FilterTrigger` accessability.

## [3.2.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/icon` [3.1.1 ~> 3.1.2]).

## [3.2.1] - 2022-10-17

### Fixed

- Fixed the problem of not showing the placeholder when the body of the `FilterTrigger` is empty.

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.1.0] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [3.0.24] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [3.0.2] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [3.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.24.0 ~> 2.25.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" and "s" for "size".

## [2.6.5] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.6.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.5.3] - 2022-02-25

### Fixed

- Improved keyboard focus styles.

## [2.5.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.5.1] - 2022-02-18

### Fixed

- Fixed LinkTrigger hovered text color.

## [2.5.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.4.1] - 2021-12-23

### Changed

- Changed `line-height` from 1.2 to 1.1 for correct display in all browsers.

## [2.4.0] - 2021-10-01

### Changed

- Up version package `@semcore/dot`.

## [2.3.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [2.3.0] - 2021-06-08

### Changed

- Rewrite code from TS to JS 🧑‍💻
- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

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

## [2.0.2-0] - 2020-06-03

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
