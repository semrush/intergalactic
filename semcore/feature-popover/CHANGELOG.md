# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.1.9] - 2022-11-14

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.2.0 ~> 3.3.0]).

## [3.1.8] - 2022-11-08

## [3.1.7] - 2022-11-03

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.13.3 ~> 4.13.4]).

## [3.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.0.24] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/popper` [4.11.31 ~> 4.12.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [2.6.6] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.6.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.5.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.5.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.4.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [2.4.0] - 2021-07-12

### Changed

- Replace animation from package `react-transition-group` to `@semcore/animation`.

## [2.3.0] - 2021-05-17

### Changed

- The style processing system has been changed.

## [2.2.0] - 2021-05-13

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.9] - 2020-12-16

### Fixed

- Disabled flip behavior on container overflow

## [2.0.8] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.7] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.0.6] - 2020-09-30

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

### Changed

- Update @semcore/core version to ^1.8

## [2.0.5] - 2020-09-09

### Fixed

- Replace property `disabled` to `disableEnforceFocus` for disabled focus trap in `Popper.Popper`

## [2.0.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.3] - 2020-09-07

### Fixed

- Disabled focus trap, for support normal work interactive components when popper show.

## [2.0.2] - 2020-07-06

### Changed

- Обновлена версия зависимости `@semcore/popper`

## [2.0.1] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.0] - 2020-06-08

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Свойство `duration` для управления скорости анимации Popper-a

### Changed

- Изменили цвет по наведению для иконки закрытия, c 16% на 12%

## [1.1.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.1.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.0.0] - 2019-11-14

### Added

- Initial release
