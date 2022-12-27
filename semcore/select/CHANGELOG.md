# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.4.4] - 2022-12-27

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown-menu` [3.6.1 ~> 3.6.2]).

## [3.4.2] - 2022-12-21

### Fixed

- Fixed display of placeholder with empty value.

## [3.4.1] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.4.0 ~> 3.4.1], `@semcore/checkbox` [6.3.2 ~> 6.3.3], `@semcore/divider` [3.2.2 ~> 3.2.3], `@semcore/dropdown-menu` [3.6.0 ~> 3.6.1], `@semcore/flex-box` [4.7.2 ~> 4.7.3], `@semcore/icon` [3.4.2 ~> 3.4.3], `@semcore/input` [3.5.2 ~> 3.5.3], `@semcore/utils` [3.44.0 ~> 3.44.1]).

## [3.4.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [3.3.2] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.1] - 2022-12-12

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.3.0 ~> 3.3.1]).

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.18] - 2022-12-06

### Fixed

- Fixed screen readers support for `Select.List`

## [3.2.17] - 2022-12-01

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown-menu` [3.4.1 ~> 3.4.2]).

## [3.2.1] - 2022-10-17

### Fixed

- Fixed unexpected verbose console warnings.

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [3.1.7] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.24 ~> 3.1.0], `@semcore/dropdown-menu` [3.1.1 ~> 3.1.2], `@semcore/input` [3.0.16 ~> 3.1.0]).

## [3.1.0] - 2022-09-25

### Added

- Screen readers support.

## [3.0.25] - 2022-09-20

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.17 ~> 3.0.18]).

## [3.0.11] - 2022-07-13

### Fixed

- Fixed color of Addon icons in `InputSearch`.

## [3.0.10] - 2022-07-13

### Changed

- Version patch update due to children dependencies update (`@semcore/dropdown-menu` [3.0.5 ~> 3.0.6]).

## [3.0.3] - 2022-05-19

### Fixed

- Fixed non-closing popper after clicking on an Option

## [3.0.2] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [3.0.1 ~> 3.0.2], `@semcore/checkbox` [6.0.0 ~> 6.0.1]).

## [3.0.0] - 2022-05-17

### BREAK

- Remove support to used `Select.InputSearch`
- Remove support properties `selectedOptions, defaultSelectedOptions` for `Select`
- Remove support `Select.OptionCheckbox`
- `Select.Option.Checkbox` used only two sizes `l, m`
- Updated styles according to the library redesign policy.

## [2.7.12] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/base-trigger` [2.6.4 ~> 2.6.5], `@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.7.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.7.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.6.3] - 2021-11-16

### Added

- [TS] Added type for `Select.Option.Checkbox`.

### Fixed

- Fixed import styles in `InputSearch`.

## [2.6.2] - 2021-11-16

### Added

- Added class name to InputSearch.

## [2.6.1] - 2021-9-28

### Fixed

- Fixed the check for the presence of `Select.Option`.

## [2.6.0] - 2021-9-20

### Added

- Added component `Select.Option.Checkbox`.

## [2.5.11] - 2021-8-26

### Changed

- Revert 'sideEffect=false' for more optimal build via webpack

## [2.5.10] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.5.9] - 2021-08-02

### Fixed

- [ts] correct types.

## [2.5.8] - 2021-07-21

### Fixed

- Fixed set value for `Select.InputSearch`.

## [2.5.7] - 2021-07-16

### Changed

- [TS] Added type `null` for `value` prop in `Select`.
- Fixed warning in console for `InputSearch`.

## [2.5.6] - 2021-07-06

### Fixed

- Fixed set theme for `Select.OptionCheckbox`.

## [2.5.5] - 2021-07-05

### Fixed

- Add default type for generic value

## [2.5.4] - 2021-06-08

### Fixed

- Fix TS type

## [2.5.3] - 2021-05-31

### Fixed

- Fixed ts type for `Select`.

## [2.5.2] - 2021-05-27

### Fixed

- Fixed paddings in `InputSearch`.

## [2.5.1] - 2021-05-17

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

## [2.4.1] - 2021-02-12

### Fixed

- Fixed to show components for tag in Select.Trigger, example `<Select.Trigger tag={FilterTrigger}`

## [2.4.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.3.0] - 2020-12-03

### Added

- Added hidden input for correct work of forms

## [2.2.6] - 2020-12-03

### Fixed

- Fixed export SelectOption

## [2.2.5] - 2020-12-03

### Changed

- InputSearch moved out of Select

## [2.2.4] - 2020-11-19

### Fixed

- Scroll to the first selected option in multiselect instead of the last

## [2.2.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.2.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.2.1] - 2020-08-26

### Fixed

- Исправлен тип `SelectValue`

## [2.2.0] - 2020-08-25

### Added

- Добавлен generic, задающий тип `value` и аргументу ф-ции `onChange`

### Changed

- Поднята версия @semcore/core до ^1.7

### Fixed

- Исправлена типизация второго аргумента (handlers) render-функции

## [2.1.1] - 2020-08-03

### Fixed

- [ts] Поправили свойство `onChange`

### Added

- Добавили второй аргумент (`event`) для `onChange`, где его не хвататало в `Select`.

## [2.1.0] - 2020-07-14

### Added

- Добавлены типы к `Select` от `Select.Trigger`, которые нужны когда компоненты не разворачивается.

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [2.0.9] - 2020-06-30

### Fixed

- Исправлено описание типов рендер-функции для `Select.Trigger`

## [2.0.8] - 2020-06-30

### Fixed

- Убрана подсветка выбранных опций в режиме `multiselect`
- Исправлено описание типов рендер-функции для `Select.Trigger`

## [2.0.7] - 2020-06-26

### Fixed

- Добавлен экспорт внутренних интрефейсов и типов компонента

## [2.0.6] - 2020-06-10

### Fixed

- Исправлены TS типы
- Исправлено получение полного контекста в Trigger

## [2.0.2] - 2020-06-08

### Fixed

- Исправлена типизация дочерних компонентов
- Исправлена типизация `ISelectContext`

## [2.0.1] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.10.0] - 2020-02-03

### Added

- Добавлено свойство `theme` для `Checkbox` в `Select.OptionCheckbox`

## [1.9.1] - 2020-01-27

### Fixed

- Исправлена проблема вызова `onVisibleChange` при изменение видимости `Select`

## [1.9.0] - 2020-01-16

### Added

- Компонент `Select.OptionTitle` для отображениия заголовков

### Changed

- Компонент `Select.OptionHint` теперь унаследован от `DropdownMenu.ItemHint`

## [1.8.1] - 2020-01-14

### Fixed

- Исправлена ошибка отсутствия статического компонента `Text` при передаче своего кастомного тега в `Select.Trigger`
- Исправлена проблема при которой не подскроливало к выбранному элементу при открытии селекта

## [1.8.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head
- Исправили поведение при передаче `selected` в `OptionCheckbox`

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.7.2] - 2019-10-11

### Fixed

- Исправлен отображение placeholder

## [1.7.1] - 2019-10-09

### Fixed

- Исправлен отступ у `Addon`

### Changed

- Обновлен `base-trigger`

## [1.7.0] - 2019-10-07

### Added

- Добавлен `FilterTrigger`

## [1.6.7] - 2019-10-04

### Fixed

- Исправлено отображение иконки очистки при заполненом `value` в `Select.InputSearch`

## [1.6.6] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.6.5] - 2019-09-13

### Added

- Стили для ховера `Select.Trigger`

## [1.6.4] - 2019-09-05

### Fixed

- Исправлена ошибка в типизации `Select`

## [1.6.3] - 2019-08-12

### Changed

- Обновлены `utils`

- Улучшена функция оборачивания в `Text`

## [1.6.2] - 2019-08-02

### Changed

- Обновлены зависимости

- Добавлен `Item.Addon` от `DropdownMenu.Item.Addon`

## [1.6.1] - 2019-08-02

### Fixed

- Исправлена сборка для SSR

## [1.6.0] - 2019-07-26

### Added

- Добавлен `Select.OptionHint`
- Добавлено свойство `cleared` в `Select.InputSearch`

## [1.5.5] - 2019-07-05

### Fixed

- Убраны лишние дом ноды в `OptionCheckbox`
- Цвет текста выбранного элемента исправлен с `#666` на `#333`
- Убрали обрезание части текста снизу в триггере

### Removed

- Зависимость от `@semcore/control`

## [1.5.4] - 2019-07-04

### Added

- Возможность передавать в функцию `selectOption` список опций

### Fixed

- Исправлен TS тип для `children` `<Select.Trigger/>`

## [1.5.3] - 2019-06-25

### Added

- Добавлен `Select.InputSearch`

## [1.4.0] - 2019-06-21

### Fixed

- Убрана подсветка заселекченого `Select.OptionCheckbox`

### Added

- Добавлен `Select.Divider` - компонент divider с преднастроенными отступами

## [1.3.4] - 2019-06-20

### Fixed

- Добавлен атрибут `type="button"` к дефолтному `Select.Trigger`

## [1.3.3] - 2019-06-11

### Fixed

- Исправлено отображение `Select.Trigger` мультиселекта

## [1.3.2] - 2019-06-07

### Changed

- Исправлены TS типы, `value` на `Option` стал опциональным

## [1.3.1] - 2019-06-03

### Changed

- Обновлена версия `@semcore/control`

## [1.3.0] - 2019-05-27

### Changed

- Заменено внутренние представление Trigger-а, раньше использовался Button, теперь собственный компонент

## [1.2.2] - 2019-04-30

### Fixed

- Исправлено выделение заселекченого `Select.Option` при `optionToValue={o => o.children}`
- В зависимости добавлен пакет `@semcore/icon`

## [1.2.1] - 2019-04-12

### Changed

- Обновлена версия @semcore/checkbox с ^3.0.3 до ^4.0.0

## [1.2.0] - 2019-04-09

### Added

- Добавлена абстракция `Select.Popper`
- Добавлена абстракция `Select.List`

## [1.1.2] - 2019-04-01

### Fixed

- Исправлена ошибка с отображением значений в `ButtonTrigger` multiselect'a

## [1.1.1] - 2019-03-25

### Fixed

- Исправленна ошибка [Object object] в `ButtonTrigger`

## [1.1.0] - 2019-03-18

### Added

- возможность отменить цепочку событий для `onSelect`
- завимость от `@semcore/button` (переписали `ButtonTrigger`)

### Fixed

- Исправлена работа children as function в `Select.Menu`
- Испоравлено отображение jsx в `Select.Trigger`

## [1.0.1] - 2019-02-20

### Changed

- Дефолтное значение `boundary` изменено с `viewport` на `window`

### Fixed

- Интерфейс `ISelectProps` теперь наследуется от `IDropdownMenuProps`

## [1.0.0] - 2019-02-01

### Added

- Экспорт `PortalProvider`

## [1.0.0-1] - 2019-01-28

### Added

- Initial release
