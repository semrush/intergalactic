# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.3.0] - 2021-05-13

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
