# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [5.3.16] - 2023-03-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.48.0 ~> 3.48.1]).

## [5.3.9] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

## [5.3.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [5.3.6] - 2023-01-10

## [5.3.5] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [5.3.4] - 2023-01-03

### Fixed

- Fixed css variable design tokens.

## [5.3.3] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1]).

## [5.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [5.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [5.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [5.1.8] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [5.1.6] - 2022-09-15

### Changed

- Mark exported functions as deprecated with recommendation to use `@semcore/d3-chart`.

## [5.1.5] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [5.1.0] - 2022-06-01

### Changed

- Changed type names from 'IPieProps' to 'IRechartsPieProps' so that there are no intersections with other components.

## [5.0.4] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2]).

## [5.0.1] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Removed media.

## [4.3.12] - 2022-04-03

### Fixed

- Fixed lost typings of `@semcore/chart/utils/colors` utility.

## [4.3.11] - 2022-03-23

### Fixed

- Rewrite file colors from tsx to js, for correct parsing in `babel-plugin-react-semcore`.

## [4.3.10] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/checkbox` [5.2.7 ~> 5.2.8]).

## [4.3.8] - 2022-02-24

### Added

- Added repository field to package.json file.

## [4.3.7] - 2022-02-07

### Fixed

- Rename deprecate color `white-01` to `white`.

## [4.3.6] - 2022-02-03

### Fixed

- Fixed list colors to get from a function `getColor`.

## [4.3.5] - 2022-01-13

### Fixed

- Fixed filtering colors without index.

## [4.3.4] - 2022-01-10

### Fixed

- Revert color `gray` in object `colors`.

## [4.3.2] - 2021-12-23

### Changed

- Changed `line-height Axis` from 1.2 to 1.1 for correct display in all browsers.

## [4.3.1] - 2021-12-08

### Changed

- Moved chart colors vars to style

## [4.3.0] - 2021-12-07

### Changed

- Change processing style to new `@semrush/babel-plugin-styles`.

## [4.2.5] - 2021-12-06

### Fixed

- Remove 'sideEffect=false' because bug in `recahrts` lib.

## [4.2.4] - 2021-11-12

### Changed

- Changed package from `venn.js` to `@upsetjs/venn.js`.

## [4.2.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.2.2] - 2021-04-16

### Changed

- Changed line-height value

## [4.2.1] - 2021-03-31

### Changed

- Optimized the code for venn chart.

## [4.2.0] - 2021-02-15

### Added

- Added supported react@17.

## [4.1.1] - 2020-12-28

### Fixed

- [ts] fixed types for function `timeFormat`.

## [4.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [4.0.10] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [4.0.9] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [4.0.8] - 2020-10-07

### Fixed

- Fixed "any" types for some charts.

## [4.0.7] - 2020-09-17

### Fixed

- Render label in Tooltip for first dot in chart.

## [4.0.6] - 2020-09-09

### Fixed

- Fixed show tooltip for `VennChart`

## [4.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.4] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [4.0.1] - 2020-08-05

### Fixed

- Исправлен warning компонента `Legend` о не валидных атрибутах, попадающих на DOM-элемент

## [4.0.0] - 2020-07-09

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [3.10.0] - 2020-03-25

### Added

- Pie, добавлены св-ва `shapeAnimationBegin`, `shapeAnimationDuration`, `shapeAnimationEasing`, `shapeOuterRadius`, отвечающие за анимацию активного сектора

### Fixed

- Pie, исправлена анимация активного сектора, теперь она работает и при активации и при деактивации сектора.

## [3.9.0] - 2020-02-18

### Added

- Добавлен импорт `LegendContext`, чтобы была возможность получить данные из `rechart` и нарисовать свои контролы для легенды

### Removed

- Убрали дефолтные свойства `layout, align, verticalAlign` с `Legend.Controls`, теперь они такие же как и у `Legend`

## [3.8.0] - 2020-02-13

### Added

- Добавлен новый компонент `Legend`, упращает работу с версткой легенды для графиков

## [3.7.0] - 2020-02-07

### Added

- Добавлены обработчики `onClick`, `onMouseEnter`, `onMouseLeave` для VennChart'a
- `payload` графика добавлен в обработчки VennChart вторым аргументом

## [3.6.2] - 2020-02-05

### Changed

- Изменена дефолтная скорость анимации для `Pie` c 1500ms на 350ms
- Изменена тайминг-функция анимации `Pie` с `ease` на `ease-in-out`

## [3.6.1] - 2019-12-27

### Changed

- перенесены скелетоны графиков в пакет `@semcore/skeleton`, но так же доступы по старому `API`

## [3.6.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.5.0] - 2019-12-10

### Added

- Добавлен Histogram-chart

## [3.4.0] - 2019-11-14

### Added

- Добавлен `VennChart` 🎉

## [3.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [3.2.4] - 2019-10-08

### Fixed

- Увеличили стандартные отступы для граффиков

## [3.2.3] - 2019-10-03

### Fixed

- Оптимизирован импорт `rechart

## [3.2.2] - 2019-10-03

### Fixed

- Исправлена ошибка отображения `Area` и `Line` чартов, когда нужно отобразить одну точку

## [3.2.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [3.2.0] - 2019-09-20

### Fixed

- обновлен шаблон рендера тултипа для `PieChart`

## [3.1.0] - 2019-09-05

### Added

- точки `dot` для `Area, Line` рисуются и для крайних случаев если следующая или предыдущая точка без данных.

### Fixed

- Убран `console.log` из `Area.tsx`

### Removed

- Передачу свойств `commonValue, fieldName` в объекте `dataPieChart` тултипа в `PieChart`. Теперь расчет происходит автоматически

## [3.0.0] - 2019-08-22

### BREAK

- `Area`, изменено дефолтное поведение св-ва `dot`. Теперь при `dot={false}` на графике рисуются точки при невозможности нарисовать линию.
- `Line`, изменено дефолтное поведение св-ва `dot`. Теперь при `dot={false}` на графике рисуются точки при невозможности нарисовать линию.
- Зафиксирована версия библиотеки `recharts` v 1.7.1

## [2.0.2] - 2019-07-31

### Fixed

- Добавлен минимальный размер бара(2px)
- Убрано предупреждение react об отсутствие key

## [2.0.1] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [2.0.0] - 2019-07-30

### BREAK

- `Area`, изменено дефолтное поведение `recharts`, св-во `connectNulls` теперь рисует пунктир в соответствии с гайдами
- `Area` со `stackId` при `connectNulls={false}` сохраняет дефолтное поведение `recharts`
- `Line`, изменено дефолтное поведение `recharts`, св-во `connectNulls` теперь рисует пунктир в соответствии с гайдами

## [1.1.4] - 2019-07-17

### Fixed

- Добавлены ts типы для `Chart.Skeleton`

## [1.1.1] - 2019-07-09

### Fixed

- Исправлена ошибка импорта `rechart` компонентов

## [1.1.0] - 2019-07-08

### Changed

- значение `preserveAspectRatio` для скелетонов измели на `"xMidYMid meet"`

### Added

- Добавлен экспорт компонента `DefaultTooltipContent`
- Добавлена ф-ция `getColor` для автоматической генерации цветов графиков

## [1.0.6] - 2019-06-26

### Added

- `export` основных цветов

## [1.0.5] - 2019-06-24

### Added

- скелетоны для `Line`, `Bar`, `Area` графиков

## [1.0.4] - 2019-04-19

### Added

- Добавлен Bar-chart

## [1.0.3] - 2019-03-11

### Added

- Добавлен Area-chart

### Fixed

- Исправлены стили для XAxis и Dots

## [1.0.2] - 2019-02-22

### Fixed

- Исправлено применение стилей к стандартным классам

## [1.0.1] - 2019-02-21

### Added

- Initial release
