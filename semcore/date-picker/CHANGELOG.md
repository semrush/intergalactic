# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.6.6] - 2023-01-19

### Fixed

- Fixed `DatePicker.InputTrigger` edited text highlight color.

## [3.6.6] - 2023-01-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/base-trigger` [3.4.3 ~> 3.4.4], `@semcore/button` [4.3.3 ~> 4.3.4]).

## [3.6.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.5.2] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.5.1] - 2022-12-12

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.3.0 ~> 3.3.1]).

## [3.5.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.4.14] - 2022-11-29

### Fixed

- Fixed InputTrigger subcomponent types.

## [3.4.13] - 2022-11-28

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.2.8 ~> 3.2.9]).

## [3.4.8] - 2022-11-05

### Fixed

- Fixed input trigger visual divergence from initial design.

## [3.4.7] - 2022-11-03

### Fixed

- Removed lock on fixed version of `@semcore/input`.

## [3.4.6] - 2022-11-03

### Changed

- Version patch update due to children dependencies update (`@semcore/input-mask` [4.3.3 ~> 4.3.4]).

## [3.4.1] - 2022-10-17

### Changed

- Reverting changes from version `3.3.12` as these changes are implemented in the `utils/lib/addonTextChildren`.

## [3.4.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.3.14] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.24 ~> 3.1.0], `@semcore/button` [4.0.18 ~> 4.1.0]).

## [3.3.12] - 2022-10-04

### Changed

- Changed the way to check the contents of the trigger for `ButtonTrigger`

## [3.3.11] - 2022-10-04

### Changed

- Changed utils function for `ButtonTrigger`

## [3.3.10] - 2022-10-03

### Fixed

- Fixed unexpected margin of calendar grid cells in Safari browser.

## [3.3.9] - 2022-10-03

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.21 ~> 3.0.22], `@semcore/icon` [2.32.0 ~> 2.32.1]).

## [3.3.0] - 2022-08-22

### Added

- Added Turkish langauge support.

## [3.2.1] - 2022-08-19

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.12 ~> 4.0.13]).

## [3.2.0] - 2022-08-18

### Changed

- Removed spaces around dash in formatted date.

## [3.1.4] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.15 ~> 3.0.16], `@semcore/icon` [2.30.0 ~> 2.30.1]).

## [3.1.0] - 2022-07-29

### Added

- Added new button components `Apply` and `Reset` for `DateRangePicker` and `MonthRangePicker`.

## [3.0.13] - 2022-07-25

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.10 ~> 3.0.11], `@semcore/icon` [2.29.1 ~> 2.29.2]).

## [3.0.2] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [3.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.0 ~> 3.0.1], `@semcore/icon` [2.24.0 ~> 2.25.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" for "size".

## [2.8.5] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [2.6.4 ~> 2.6.5], `@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.8.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.7.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.7.1] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.5.6] - 2021-10-22

### Fixed

- Fixed clear highlighted data after close popup in `DataRangePicker`.

## [2.5.5] - 2021-9-21

### Changed

- Changed WeekDay styles from uppercase to capital case

## [2.5.4] - 2021-9-1

### Fixed

- Fixed change `displayedPeriod` after change `value` for family pickers.

## [2.5.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.5.2] - 2021-08-20

### Fixed

- [TS] added types for default values.
- Fixed set `displayedPeriod` for family pickers.

## [2.5.0] - 2021-07-13

### Fixed

- [TS] fixed types.
- Added styles for element `today` in Calendar.
- Fixed show title for `MonthRangePicker`.

## [2.4.1] - 2021-06-21

### Fixed

- Сorrect access to properties from getters function

## [2.4.0] - 2021-06-10

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- Added support keydown arrows for choose date to calendar.

## [2.3.2] - 2021-05-05

### Fixed

- Fixed short display date for identity months for Trigger.

## [2.3.1] - 2021-02-24

### Fixed

- Fixed set `weekStart` for component `Calendar`. Now you can change `weekStart` for global object `Ls`.

## [2.3.0] - 2021-02-20

### Added

- Added support two languages `Korean, Vietnamese`.

## [2.2.1] - 2021-02-17

### Fixed

- Fixed display if one day is selected and if the same month of a different year is selected.

## [2.2.0] - 2021-02-16

### Added

- Added supported react@17.

## [2.0.8] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.7] - 2020-10-26

### Fixed

- Getting options from `dayjs` for current localization.

## [2.0.6] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.0.5] - 2020-10-09

### Fixed

- Add margin bottom for the block with periods

## [2.0.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.3] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.2] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.1] - 2020-07-14

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [2.0.0] - 2020-06-19

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Changed

- изменили цвет по ховеру для дней в календаре, c 16% на 12%

## [1.5.0] - 2020-04-09

### Fixed

- Исправли поведение проставления дней недели в календаре, теперь она зависит от локали, которую вы выбираете. Для
  локалолей `en, ja` началом недели будет воскресенье, для всех остальных - понедельник.

## [1.4.1] - 2020-02-18

### Fixed

- Обнуляем так же и милисекунды для всех компонентов использующих `new Date()`

## [1.4.0] - 2020-02-12

### Fixed

- Обнуляем текущее время для сегодняшней даты во всех компонентах использующих `new Date()`

### Added

- Добавили на каждый компонент `data-testid` атрибут с его именем

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

## [1.2.1] - 2019-11-25

### Fixed

- Исправлен тип методов `onChange` всех Picker'ов

- Исправлена ошибка при передаче значения `null` в `value` всех Picker'ов

## [1.2.0] - 2019-10-23

### Added

- Добавлена локализация для кнопок Apply/Reset

## [1.1.3] - 2019-10-14

### Added

- Добавлен `forwardRef` для `ButtonTrigger`

## [1.1.2] - 2019-10-09

### Changed

- Добавлен импорт `ButtonTrigger`

## [1.1.1] - 2019-10-07

### Changed

- Добавлена зависимость от `@semcore/base-trigger`

## [1.1.0] - 2019-10-04

### Added

- Добавлен свойство `unclearable`

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-27

### Fixed

- Исправлен дефолтный список периодов

## [1.0.1] - 2019-09-25

### Fixed

- Исправлена верствка кнопок `Apply`/`Reset`

## [1.0.0] - 2019-09-25

### Added

- Добавлен `MonthPicker`/`MonthRangePicker`

### Fixed

- Исправлены ошибки типизации `DatePicker` & `DateRangePicker`

## [1.0.0-6] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text`

## [1.0.0-5] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [1.0.0-4] - 2019-07-25

### Changed

- Исправлены ts типы

## [1.0.0-3] - 2019-07-25

### Added

- Добавлен правильный триггер-кнопка

## [1.0.0-1] - 2019-07-25

### Added

- Initial release
