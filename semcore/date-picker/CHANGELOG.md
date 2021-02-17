# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
