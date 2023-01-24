# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.11] - 2023-01-20

### Fixed

- Fix floating sort icon to right align.

## [3.3.10] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/icon` [3.7.0 ~> 3.8.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7], `@semcore/scroll-area` [4.2.6 ~> 4.2.7]).

## [3.3.4] - 2023-01-03

### Fixed

- Fixed css variable design tokens.

## [3.3.1] - 2022-12-27

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.4.3 ~> 3.5.0]).

## [3.3.0] - 2022-12-21

### Changed

- Removed vertical borders from header cells.
- Added props `borderRight` and `borderLeft` to have possibility to render vertical borders.
- Added prop `compact` to reduce table paddings.
- Added gradient to the sorting icon.

## [3.2.3] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1], `@semcore/icon` [3.4.2 ~> 3.4.3], `@semcore/flex-box` [4.7.2 ~> 4.7.3], `@semcore/scroll-area` [4.2.2 ~> 4.2.3]).

## [3.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.1.6] - 2022-11-08

## [3.1.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/icon` [3.1.1 ~> 3.1.2], `@semcore/flex-box` [4.6.2 ~> 4.6.3], `@semcore/scroll-area` [4.1.2 ~> 4.1.3]).

## [3.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.0.21] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [3.0.16] - 2022-09-15

### Changed

- Mark exported functions as deprecated with recommendation to use `@semcore/data-table`.

## [3.0.15] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/icon` [2.30.1 ~> 2.30.2], `@semcore/flex-box` [4.5.10 ~> 4.5.11], `@semcore/scroll-area` [4.0.8 ~> 4.0.9]).

## [3.0.4] - 2022-05-23

### Fixed

- Fixed hover color `Cell` for `theme='default'`.

## [3.0.3] - 2022-05-20

### Fixed

- Fixed memory leak in `StickyHead`

## [3.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/icon` [2.25.0 ~> 2.25.1], `@semcore/flex-box` [4.5.1 ~> 4.5.3], `@semcore/typography` [4.0.1 ~> 4.0.3], `@semcore/scroll-area` [4.0.0 ~> 4.0.1]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [2.5.6] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.5.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.4.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.4.1] - 2022-02-04

### Changed

- Changed background-color from undefined to `#fff` for `<CellHead use="secondary"/>`.

## [2.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.3.0] - 2021-10-13

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- The style processing system has been changed.
- Rewrite from TS to JS code.

## [2.2.4] - 2021-9-21

### Fixed

- Fixed content alignment in cells

## [2.2.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.2] - 2021-06-25

### Added

- [A11y] Added support keyboard for sortable column.

## [2.2.1] - 2021-03-31

### Fixed

- Fixed color Cell for hover in Cell and Row with `theme="default"`

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.6] - 2020-12-09

### Fixed

- Fixed show `secondary` theme for `Table`.

## [2.1.5] - 2020-11-11

### Fixed

- Fixed move props `position` in component `Box`.

## [2.1.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.2] - 2020-08-31

### Fixed

- Removed vertical `ScrollArea.Bar` display in `Table.StickyHead`, because this is unacceptable behavior now

## [2.1.1] - 2020-07-30

### Fixed

- Исправили отображение активной ячейки `th`
- Исправили выравнивание контента в ячейках через свойство `textAlign`

## [2.1.0] - 2020-07-30

### Added

- Добавили `box-sizing: border-box` для таблицы, это решило проблему отображения скролла, когда контента не много

### Changed

- Переписали стили со встраиваемого CSS in JS на новый синтаксис, такой же как у всех компонентов

## [2.0.0] - 2020-07-14

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавили зависимость от `core`

## [1.7.0] - 2020-05-15

### Changed

- Заменили рисование бордеров у ячеек таблицы с `box-shadow` на `border`, это решило проблему отображения бордера у
  последней ячейки `Table.CellHead`
- Перенесли нижний бордер с `Table` на `Table.Body`, это решило проблему двойного бордера снизу у таблицы

## [1.6.3] - 2020-03-12

### Fixed

- Исправлен двойной нижний бордер у `Table.StickyHead`

## [1.6.2] - 2020-02-28

### Fixed

- Поправили расчет ширины скрола в `StickyHead` при изменении контента

## [1.6.1] - 2020-02-14

### Fixed

- Улучшили работу скрола в `StickyHead`

## [1.6.0] - 2020-01-30

### Added

- Свойство `bottom` отвечающее за отступ снизу, на котором нужно остановиться при фиксирование `StickyHead`
- Перерасчет размеров колонок в `StickyHead` при изменении ширины экрана

### Fixed

- Исправлено поведение скролла в `StickyHead`, когда на странице их больше чем одна.

## [1.5.0] - 2020-01-21

### Fixed

- Поправили позиционирование слева для `StickyHead`, когда шапка зафиксирована
- Изменили ширину блока для `StickyHead` на `width: auto`

## [1.4.0] - 2019-12-19

### Added

- Добавлен `MutationObserver` для изменения контента в `StickyHead`

## [1.3.2] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.3.1] - 2019-12-13

### Fixed

- Поправили работу скролов в режиме `master <-> slave`

## [1.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.2.2] - 2019-12-10

### Fixed

- [TS] типы для `Table.Head, Table.Body`

## [1.2.1] - 2019-12-09

### Fixed

- Поправили версию зависимости от `utils`

## [1.2.0] - 2019-12-08

### Fixed

- Получение DOM-ноды через `ref` для всех компонентов

### Added

- Добавили компонент `Table.StickyHead` для фиксации шапки в таблице с горизонтальным скролом

## [1.1.3] - 2019-10-24

### Fixed

- Исправлены ts типы

## [1.1.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.1] - 2019-09-05

### Fixed

- Исправлена ошибка в типизации `Table.Body`

## [1.1.0] - 2019-06-10

### Added

- Добавлена возможность отключения ховера, через `theme=false`

## [1.0.0] - 2019-05-23

### Fixed

- Исправлен ховер на строчку

## [1.0.0-3] - 2019-03-21

### BREAK

- Переименованы свойства `justify` -> `align` / `align` -> `valign`

### Changed

- Убрана прозрачность всех заливок
- Добавлен ховер на `Row` по умолчанию
- Доавлен noWrap для `CellHead`
- Добавлен компонент `Text` на `Cell`

## [1.0.0-2] - 2019-02-21

### Changed

- Цвет активной иконки сортировки в шапке

### Removed

- Прозрачность в заливке шаппки

## [1.0.0-1] - 2019-01-28

### Added

- Initial release
