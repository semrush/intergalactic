# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.5.3] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.19.4 ~> 2.20.0]).

## [3.5.2] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [3.5.1] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [3.5.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [3.4.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.3.4] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.2] - 2021-07-05

### Fixed

- Add default type for generic value

## [3.3.1] - 2021-06-08

### Changed

- Fix TS type

## [3.3.0] - 2021-05-17

### Changed

- Rewrite code from TS to JS 🧑‍💻

## [3.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.1.1] - 2020-12-25

### Changed

- Update version package `animation`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.7] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.6] - 2020-10-20

### Fixed

- Added `null` ts type for `value`.

## [3.0.5] - 2020-10-20

### Fixed

- Added keyboard interaction for `Toggle`.

## [3.0.1] - 2020-10-14

### Fixed

- Fixed wrong path for ES6 build

## [3.0.0] - 2020-10-08

### BREAK

- Remove wrapper node for `Accordion`.
- Remove style for `Trigger` and rename in `Toggle`.
- Rename Content to `Collapse`.
- Remove margin for `Chevron`.
- Remove export `AccordionItem`.
- Remove prop `selectedValues`.
- Change animation way.

## [2.1.0] - 2020-09-30

### Added

- Added generic for better `value` and `onChange` typings

### Changed

- Update @semcore/core version to ^1.8

## [2.0.3] - 2020-09-18

### Fixed

- Bubbling event from interaction components inside `Accordion.Item.Content` for listener `onChange` in `Accordion`

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-07-21

### Fixed

- Исправили баг в Chrome, когда при скрытии контента вызывался скролл всей страницы

### Added

- Установили z-index для триггера, когда на него приходит фокус, для нормального отображения тени вокруг

## [2.0.0] - 2020-07-10

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.4.0] - 2020-02-14

### Added

- Добавили функцию `selectedValues` для управления активностью вкладок, возвращаемый массив `value` будет отображен

### Fixed

- Поправили лишние перерендеры компонентов при изменении активной вкладки

## [1.3.2] - 2020-01-10

### Fixed

- Убрали повторный вызов `onChange` для `Accordion` с массивом данных

## [1.3.1] - 2019-12-31

### Added

- Добавили ширину в `100%` для обертки контента в всплывающем окне

## [1.3.0] - 2019-12-31

### Fixed

- Поправили вызов `onChange` для `Accordion`
- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

### Added

- Добавлена адаптивность на маленьких экранах(<768px)
- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.0.1] - 2019-11-06

### Changed

- свойство `value` для `Accordion` теперь не обязательный параметр

## [1.0.0] - 2019-11-01

### Added

- Initial release
