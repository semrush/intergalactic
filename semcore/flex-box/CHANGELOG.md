# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.7.15] - 2023-03-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.48.0 ~> 3.48.1]).

## [4.7.8] - 2023-02-09

## [4.7.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [4.7.5] - 2023-01-10

## [4.7.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [4.7.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [4.7.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.6.5] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [4.6.4] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0]).

## [4.6.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.5.12] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.5.3] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [4.5.1] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [4.5.0] - 2022-02-24

### Added

- Added `gap`, `rowGap` and `columnGap` css properties support for `Flex` component.

## [4.4.3] - 2021-10-20

### Fixed

- [TS] Fixed type `direction` for `Flex`.

## [4.4.2] - 2021-10-13

### Fixed

- [TS] Fixed type `position` for `Box`.

## [4.4.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [4.3.2] - 2021-03-25

### Fixed

- [TS] Fixed type `boxSize`, value `content-box` set browser by default.

## [4.3.1] - 2021-02-19

### Fixed

- [Box] Added change css styles after change value by props `top, left, right, bottom`.

## [4.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [4.2.0] - 2020-12-03

### Added

- Added new property: `zIndex`.

## [4.1.1] - 2020-12-03

### Changed

- Moved `flex` property from Flex to Box.

## [4.1.0] - 2020-11-05

### Added

- Added new property: `postion, top, left, right, bottom`.

## [4.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [4.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [4.0.1] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [4.0.0] - 2020-05-28

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [3.5.3] - 2020-01-23

### Fixed

- Откатили вставку свойств `inline` (inline-flex), `direction` & `reverse` (flex-direction), `wrap` (flex-wrap) через CSS-класс, т.к. это ломало обратную совметсимость.

## [3.5.2] - 2020-01-16

### Changed

- Свойство `inline` (inline-flex), `direction` & `reverse` (flex-direction), `wrap` (flex-wrap) выставляется через CSS-класс, это улучшает производиительность

## [3.5.1] - 2020-01-15

### Fixed

- Возвращены единицы измерения отступов в px(были в rem)

## [3.5.0] - 2019-12-26

### Added

- Появилась свойство собирательное свойство `flex`

## [3.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [3.2.0] - 2019-10-10

### Added

- Добавлен `ref` на дом ноду

### Changed

- Переписано на функциональный компонент

## [3.1.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [3.1.0] - 2019-02-11

### Added

- Добавлены свойства `wMin`, `wMax`, `hMin` и `hMax`

## [3.0.0] - 2019-01-18

### BREAK

- У `Flex` переименовано свойство `flex` -> `flexWrap`
- У `Flex` свойства `alignItems`, `alignContent`, `justifyContent` теперь принимают значения соответствующие значениям в css

### Added

- Добавлен `export default {Flex, Box}`

### Fixed

- Исправлены не корректное поведение при отрицательных значениях рассчете размера и отступов а `Box`

## [2.0.1] - 2018-12-11

### Removed

- Убран `display: block` по умолчанию

## [2.0.0] - 2018-12-10

### BREAK

- Убраны свойства `alignSelf`, `flexBasis` , `flexGrow`, `flexShrink`, `flex`, `order`
- Переименованны свойства `height` -> `h`, `width` -> `w`

### Added

- Добавленно свойство `inline` для `Box`

## [1.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [1.0.1] - 2018-11-07

### Fixed

- исправлена работа свойств `width`/`height`

## [1.0.0] - 2018-10-02

### Added

- Initial release
