# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.5.10] - 2023-03-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.1 ~> 3.47.2]).

## [2.5.7] - 2023-02-09

## [2.5.6] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [2.5.4] - 2023-01-10

## [2.5.3] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [2.5.0] - 2022-12-12

### Added

- Design tokens based theming.

## [2.4.5] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [2.4.4] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0]).

## [2.4.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [2.3.13] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [2.3.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.0] - 2021-02-16

### Added

- Added supported react-dom@17.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Теперь в PortalProvider можно положить ref

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность опционально подключать адаптивность
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.0] - 2018-02-01

### Added

- Добавлен autocomplete для IDE

### Changed

- Функция `canUseDom` перенесена в пакет `@semcore/utils`

## [1.0.0] - 2018-06-28

### Added

- Initial release
