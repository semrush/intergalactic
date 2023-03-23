# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.10.2] - 2023-03-23

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.13 ~> 4.7.14], `@semcore/illustration` [1.4.8 ~> 1.4.9], `@semcore/utils` [3.47.4 ~> 3.48.0]).

## [3.10.0] - 2023-03-21

### Changed

- Updated `Error` view texts in all languages.
- Updated `NoData` view texts in all languages.

## [3.9.7] - 2023-03-16

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.11 ~> 4.7.12], `@semcore/illustration` [1.4.6 ~> 1.4.7], `@semcore/utils` [3.47.2 ~> 3.47.3]).

## [3.9.3] - 2023-02-09

## [3.9.2] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.6 ~> 4.7.7], `@semcore/illustration` [1.4.1 ~> 1.4.2], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.8.4] - 2023-01-10

## [3.8.3] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.3 ~> 4.7.4], `@semcore/illustration` [1.3.9 ~> 1.3.10], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [3.8.2] - 2022-12-22

### Fixed

- Fixed image size

## [3.8.1] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.7.2 ~> 4.7.3], `@semcore/illustration` [1.3.8 ~> 1.3.9], `@semcore/utils` [3.44.0 ~> 3.44.1]).

## [3.8.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.7.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.7.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.6.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.5.0] - 2022-10-06

### Changed

- Version minor update due to children dependencies update (`@semcore/illustration` [1.1.5 ~> 1.2.0]).

## [3.4.2] - 2022-09-27

### Changed

- Moved svg illustrations to `@semcore/illustration` component.

## [3.4.1] - 2022-09-20

### Fixed

- Widget illustration is aria-hidden now.

## [3.4.0] - 2022-09-16

### Added

- Added Turkish langauge support.

## [3.3.0] - 2022-08-30

### Changed

- Updated svg images for: `coffee`, `duplicates`, `good`, `nexttime`, `other-data`, `processing`, `radial-tree-chart`, `suggestion`, `suggestions`, `table`, `text-links-etc`, `under-construction`, `warning`.

### Added

- Added new svg images — `collection` and `waiting`.

## [3.2.4] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [3.2.0] - 2022-06-30

### Changed

- Updated svg images for all charts, nothing found and congratulations states.

## [3.1.0] - 2022-06-01

### Changed

- Changed type names from 'iconNames' to 'iconNamesWidgetEmpty' so that there are no intersections with other components.

## [3.0.2] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/flex-box` [4.5.3 ~> 4.5.4]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

### Added

- Added `coffee`/`heat-map-chart`/`kagi-chart`/`radial-tree-chart`/`suggestion`/`under-construction` illustrations.

## [2.7.0] - 2022-04-14

### Added

- Added `radial-tree-chart` illustration.

## [2.6.6] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [2.6.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.6.4] - 2022-02-24

### Changed

- Removed unused dependencies `@semcore/link`, `@semcore/button`.

## [2.6.3] - 2022-01-18

### Changed

- Removed unused dependencies `@semcore/icon`.

## [2.6.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.6.1] - 2021-07-02

### Fixed

- [TS] fixed types.

## [2.6.0] - 2021-06-08

### Changed

- Rewrite code from TS to JS 🧑‍💻

### Added

- Added `tag-cloud` illustration

## [2.5.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.4.0] - 2021-02-20

### Added

- Added support two languages `Korean, Vietnamese`.

## [2.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.2.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.2.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.2.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.2.1] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.2.0] - 2020-08-20

### Added

- Добавлено новое изображение `deleted-page`

### Changed

- Изменены изображения `other-data`, `congrats`

## [2.1.0] - 2020-06-22

### Added

- Добавлена новая иконка для виджетов с графиком `sankey-chart`

## [2.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.2] - 2020-06-3

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Changed

- Обновлено поле `description` локали `en` комопнента `NoData`

## [1.5.0] - 2020-03-16

### Added

- Добавлена иконка `good`

### Changed

- Исправлена иконка `congrats`

## [1.4.0] - 2020-03-11

### Added

- Добавлена иконка `radar-chart`

### Fixed

- Исправлены тип `IWidgetEmptyProps.icon`, теперь принимает конкретное имя инкоки, а не `string`
- Добавлены дефолные `width` и `height` для тега `img` внутри `WidgetEmpty`, теперь размер виджета не будет изменяться после загрузки картинки

## [1.3.1] - 2020-01-28

### Fixed

- Приведены в соответствие имена классов стилей для `semrush` и `sellerly`

## [1.3.0] - 202-01-28

### Added

- Добавлена иконка Funnel-Chart
- Добавлен `viewBox` для всех иконок

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

## [1.0.0] - 2019-10-17

### Added

- Initial release
