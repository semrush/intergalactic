# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.6.13] - 2023-02-22

## [3.6.12] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.4.8 ~> 3.4.9], `@semcore/utils` [3.47.0 ~> 3.47.1]).

## [3.6.10] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

## [3.6.9] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.4.5 ~> 3.4.6], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.6.6] - 2023-01-10

### Fixed

- Fixed error loading styles in correct order for `mini-css-extract-plugin`.

## [3.6.5] - 2023-01-10

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.4.1 ~> 3.4.2], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [3.6.3] - 2022-12-27

### Changed

- `DropdownMenu.Popper` closes when the `Enter` button is pressed.

## [3.6.2] - 2022-12-27

### Added

- Added `box-sizing` for correct offset display.

## [3.6.1] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.4.0 ~> 3.4.1], `@semcore/utils` [3.44.0 ~> 3.44.1]).

## [3.6.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.5.2] - 2022-12-13

### Fixed

- Fix tabulation and moving highlighted items

## [3.5.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.5.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.4.2] - 2022-12-01

### Changed

- Changed size of shadow in `DropdownMenu.List` from `9px` to `16px`.

## [3.4.1] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.2.5 ~> 3.2.6], `@semcore/flex-box` [4.6.4 ~> 4.6.5], `@semcore/utils` [3.41.0 ~> 3.42.0]).

## [3.4.0] - 2022-11-30

### Changed

- Due to the effect of cutting off the last line, it was decided to add a shadow to the container (`DropdownMenu.List`) when scrolling.
- Changed `margin` to `padding` to make the scrollbar look better.

## [3.3.4] - 2022-11-28

### Changed

- Now highlighted tabs are also browser focused.

## [3.3.3] - 2022-11-03

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.2.3 ~> 3.2.4]).

## [3.3.0] - 2022-10-17

### Fixed

- Fixed wrong setting of `type=button` attribute for every `DropdownMenu.Trigger` based component.

## [3.2.1] - 2022-10-17

### Changed

- Version patch update due to children dependencies update.

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.1.2] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown` [3.1.1 ~> 3.1.2]).

## [3.1.0] - 2022-09-07

### Added

- Screen readers support.

## [3.0.12] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/dropdown` [3.0.10 ~> 3.0.11]).

## [3.0.6] - 2022-07-12

### Fixed

- Remove deprecated size (`xl`) type.

## [3.0.5] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/dropdown` [3.0.4 ~> 3.0.5]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Removed deprecated props `onSelect, optionCount, triggerType`.
- Removed value "xl" for "size".

## [2.3.12] - 2022-04-25

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [3.7.0 ~> 3.7.1]).

## [2.3.9] - 2022-03-09

### Fixed

- Fixed enter space in input trigger for `DropdownMenu.Trigger`.

## [2.3.8] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.3.7] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.6] - 2021-08-18

### Fixed

- Fixed typo in class names.

## [2.3.5] - 2021-07-06

### Changed

- Changed `tabIndex` to `0` and styles for `DropdowmMenu.Popper`.

## [2.3.4] - 2021-06-10

### Changed

- Moved logic for checking interactive trigger to `Dropdown`.

## [2.3.3] - 2021-06-08

### Fixed

- Fix TS type

## [2.3.2] - 2021-05-17

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.1.0] - 2020-09-30

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

### Changed

- Update @semcore/core version to ^1.8

## [2.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.4] - 2020-07-14

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [2.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.1] - 2020-06-08

### Fixed

- Исправлена типизация дочерних компонентов
- Исправлена типизация `IDropdownMenuContext`

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.4.0] - 2020-01-16

### Added

- Добавлен компонент `DropdownMenu.ItemHint` и `DropdownMenu.ItemTitle` для отображениия подсказок и заголовков

## [1.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.2.10] - 2019-10-23

### Fixed

- При нажатии на пробел в Input не происходит выбор подсвеченого элемента

## [1.2.8] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.2.6] - 2019-09-13

### Fixed

- События клавиатуры для открытия всплывающего окна (для button - "enter", "arrowDown", input - "arrowDown")

## [1.2.5] - 2019-09-05

### Fixed

- Исправлены ошибки типизации `DropdownMenu` & `Trigger`

## [1.2.4] - 2019-08-02

### Changed

- Обновлены зависимости
- Добавлен `Item.Addon` от `MenuList.Item.Addon`

## [1.2.3] - 2019-08-01

### Fixed

- Удалено поле `"": function(){}`, возвращаемое ф-цией `getTriggerProps` при `triggerType="input"`

## [1.2.2] - 2019-06-25

### Added

- Добавлен `size="xl"`

## [1.2.1] - 2019-05-13

### Changed

- Обновлена зависимость @semcore/scroll-area

## [1.2.0] - 2019-05-13

### Added

- Добавлена функция `getTriggerProps` для инпутов(например для фильтрации)

### Changed

- Контекст DropdownMenu и Popper смерджен

## [1.1.0] - 2019-04-09

### Added

- Добавлена абстракция `DropdownMenu.Popper`
- Добавлена абстракция `DropdownMenu.Menu`
- В `DropdownMenu.Menu` добавлен компонент `@semcore/scroll-area`

## [1.0.4] - 2019-03-28

### Added

- `IDropdowMenuCtx` расширен св-вом `multiselect`

## [1.0.3] - 2019-03-18

### Added

- новое свойство `triggerType`

### Changed

- `DropdownMenu.List` теперь принимает в children не только jsx, но и ф-цию

## [1.0.2] - 2018-02-26

### Fixed

- Добавлены пропущенные типы для TS

## [1.0.1] - 2018-01-02

### Changed

- Экспорт `PortalProvider`

## [1.0.0] - 2019-01-25

### Added

- Initial release
