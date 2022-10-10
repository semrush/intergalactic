# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.0.14] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.10 ~> 1.5.11], `@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.0.13] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.9 ~> 1.5.10], `@semcore/utils` [3.37.0 ~> 3.37.1]).

## [4.0.12] - 2022-08-29

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.8 ~> 1.5.9]).

## [4.0.11] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.7 ~> 1.5.8], `@semcore/utils` [3.36.0 ~> 3.37.0]).

## [4.0.10] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.6 ~> 1.5.7], `@semcore/utils` [3.35.1 ~> 3.36.0]).

## [4.0.9] - 2022-08-01

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.5 ~> 1.5.6], `@semcore/utils` [3.35.0 ~> 3.35.1]).

## [4.0.8] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.4 ~> 1.5.5], `@semcore/utils` [3.34.0 ~> 3.35.0]).

## [4.0.7] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.3 ~> 1.5.4], `@semcore/utils` [3.33.0 ~> 3.34.0]).

## [4.0.6] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.2 ~> 1.5.3], `@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/button` [4.0.5 ~> 4.0.6]).

## [4.0.5] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.1 ~> 1.5.2], `@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/button` [4.0.4 ~> 4.0.5]).

## [4.0.4] - 2022-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.3 ~> 4.0.4]).

## [4.0.3] - 2022-05-23

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.2 ~> 4.0.3]).

## [4.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.1], `@semcore/flex-box` [4.5.1 ~> 4.5.3], `@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/button` [4.0.1 ~> 4.0.2]).

## [4.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.0 ~> 4.0.1]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [3.0.5] - 2022-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.0]).

## [3.0.4] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.1 ~> 1.4.2], `@semcore/utils` [3.31.2 ~> 3.31.2]).

## [3.0.3] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [3.0.2] - 2022-03-04

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.3.3 ~> 1.4.0]).

## [3.0.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.0.0] - 2021-08-27

### Changed

- Changed animation `Dot` to `@semcore/animation`.

### Removed

- removed deprecated property `invisible`.

## [2.2.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.2] - 2021-06-29

### Fixed

- Fixed animation `Dot`.

## [2.2.1] - 2021-06-08

### Changed

- Rewrite code from TS to JS 🧑‍💻
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

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

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

## [1.0.6] - 2019-10-09

### Fixed

- Увеличен паддинг в размере xl

## [1.0.5] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.4] - 2019-05-14

### Fixed

- Осправленна анимация при появлении в режиме `up`

## [1.0.2] - 2019-05-14

### Fixed

- Отображение `Dot` со счетчиком

## [1.0.1] - 2019-02-21

### Changed

- `line-height` для текста внутри компонента

## [1.0.0] - 2019-02-13

### Added

- свойство `up` для отображение компонента в верхнем-правом углу
- анимацию при появлении и скрытии компонента

### Changed

- изменили размера ['m', 's'] -> ['m', 'l']

## [1.0.0-0] - 2018-12-26

### Added

- Initial release
