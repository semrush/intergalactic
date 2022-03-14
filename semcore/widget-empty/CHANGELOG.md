# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.6.6] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [2.6.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.6.4] - 2022-02-24

### Changed

- Remove don't use dependency `@semcore/link`, `@semcore/button`.

## [2.6.3] - 2022-01-18

### Changed

- Remove don't use dependency `@semcore/icon`.

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
