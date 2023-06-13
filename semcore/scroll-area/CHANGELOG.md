# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.3.11] - 2023-06-13

### Fixed

- Fixed setting aria attribute on initial render.

## [4.3.10] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3], `@semcore/flex-box` [4.7.29 ~> 4.7.30]).

## [4.3.9] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2], `@semcore/flex-box` [4.7.28 ~> 4.7.29]).

## [4.3.8] - 2023-06-07

### Added

- Allowed to set scroll container tab index by setting it on scroll area root element.

## [4.3.7] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0], `@semcore/flex-box` [4.7.26 ~> 4.7.27]).

## [4.3.6] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0], `@semcore/flex-box` [4.7.25 ~> 4.7.26]).

## [4.3.5] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1], `@semcore/flex-box` [4.7.24 ~> 4.7.25]).

## [4.3.4] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0], `@semcore/flex-box` [4.7.23 ~> 4.7.24]).

## [4.3.3] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7], `@semcore/flex-box` [4.7.22 ~> 4.7.23]).

## [4.3.2] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6], `@semcore/flex-box` [4.7.21 ~> 4.7.22]).

## [4.3.1] - 2023-05-03

### Fixed

- `<ScrollArea.Bar />` component might break app in some rare use cases.

## [4.3.0] - 2023-05-03

### Changed

- Added required `role` and `aria` attributes for better screen readers support.
- Scroll area container are now focusable by keyboard.

## [4.2.20] - 2023-04-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3], `@semcore/flex-box` [4.7.18 ~> 4.7.19]).

## [4.2.8] - 2023-02-09

### Fixed

- Fixed scroll bars rounding (`3px` -> `4px`).

## [4.2.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7]).

## [4.2.5] - 2023-01-10

## [4.2.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/flex-box` [4.7.3 ~> 4.7.4]).

## [4.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.1.6] - 2022-12-09

### Fixed

- Fixed calculation size when changing height of the container.

## [4.1.5] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.41.0 ~> 3.42.0], `@semcore/flex-box` [4.6.4 ~> 4.6.5]).

## [4.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.0.10] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/flex-box` [4.5.11 ~> 4.5.12]).

## [4.0.0] - 2022-05-17

### BREAK

- Remove named imports.
- Updated styles according to the library redesign policy.

## [3.7.1] - 2022-04-25

### Fixed

- Made `onScroll` property optional.

## [3.7.0] - 2022-04-21

### Added

- Added `onScroll` property.

## [3.6.4] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [3.6.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.6.2] - 2022-01-25

### Changed

- Replaced function `findComponent` to `isAdvanceMode` for check children in `ScrollArea`.

## [3.6.1] - 2021-10-22

### Fixed

- [TS] Fixed types.

## [3.6.0] - 2021-10-22

### Changed

- Rewrite code from ts to js.
- Changed interception event of mouse for cursor in `ScrollBar`.

- Call calculate position scroll when change size container

## [3.5.3] - 2021-9-24

### Fixed

- Call calculate position scroll when change size container

## [3.5.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.5.1] - 2021-05-17

### Fixed

- Add import type for ResizeObserver

## [3.5.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.4.0] - 2021-02-16

### Added

- Added supported react-dom@17.

## [3.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.2.3] - 2020-11-19

### Fixed

- Fixed problem used `ScrollArea` for SSR.

## [3.2.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.2.1] - 2020-10-22

### Fixed

- [TS] fixed types for `ScrollArea.Bar.Slider`

## [3.2.0] - 2020-09-11

### Added

- Add handler `onResize` which called when triggered ResizeObserver.

## [3.1.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.1.0] - 2020-07-30

### Changed

- Убрали `overflow: hidden` с `ScrollArea`, это свойство не использовалось.

## [3.0.2] - 2020-06-24

### Fixed

- Исправлена проблема не работающего скролла на последних версиях core из-за не правильного указания имени компонента.

## [3.0.1] - 2020-06-10

### Fixed

- Исправлены TS типы

## [3.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.4.3] - 2020-03-05

### Added

- Пересчет размера скролла, когда контент внутри динамический и `refInner` (внутренняя обертка) изменена на обертку динамического контента.

## [2.4.2] - 2020-01-14

### Fixed

- Исправили баг в позиционировании `ScrollBar` если его положить в `ScrollContainer`

## [2.4.1] - 2019-12-30

### Fixed

- Исправлена ошибка в хроме при фокусе в скрытый контрол, происходил автоматический скролл `ScrollArea` и конетент уезжал вместе с контаинером (`ScrollContainer`).

## [2.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.3.2] - 2019-12-10

### Fixed

- Расчет размера контейнера, когда обертка не доступна

## [2.3.1] - 2019-12-09

### Fixed

- Поправили версию зависимости от `utils`

## [2.3.0] - 2019-12-08

### Added

- Добавили свойство `shadow`, которое отвечает за отображение тени для контента который скрыт в `ScrollArea`

### Fixed

- Получение DOM-ноды через `ref` для всех компонентов

### Changed

- Убрали передачу свойства `orientation` для `ScrollContainer`
- Сделали автоматический расчет `orientation` для `ScrollBar`

## [2.2.5] - 2019-12-05

### Added

- Добавлена возможность переопределить `tag` любой части `ScrollArea`

### Changed

- `ScrollBar` теперь отрисоввывает `ScrollBar.Slider` по-умолчанию

## [2.2.4] - 2019-10-17

### Fixed

- поиск `ref` ноды для `ScrollArea` изменили на `findDOMNode`

## [2.2.3] - 2019-10-11

### Changed

- Обновлены версии пакетов

- Убран `root-ref` пакет

## [2.2.2] - 2019-10-03

### Fixed

- Исправлена ошибка скрития части контента в горизонтальном режиме
- Исправлена ошибка в сафари при появлении новых элементов

## [2.2.1] - 2019-10-01

### Fixed

- Исправлена ошибка не работаюшего горизонтального скрола

## [2.2.0] - 2019-09-30

### Changed

- Изменен алгоритм апдейта перерасчета с `MutationObserver` на `ResizeObserver`

### Fixed

- Исправлена ошибка не появления скрола

## [2.1.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.1.3] - 2019-08-02

### Fixed

- Уменьшин размер скролл контейнера для вертикального скролла(12px => 8px)

## [2.1.2] - 2019-06-11

### Fixed

- Исправлена проблема авторасчета слайдера относительно контента

## [2.1.0] - 2019-06-10

### Changed

- Полнята версия React до 16.6 для использования contextType

## [2.0.2] - 2019-05-16

### Fixed

- MutationObserver создается только просле проверки на наличие window

## [2.0.1] - 2019-04-12

### Fixed

- Добавлена пропущенная зависимость `root-ref`

## [2.0.0] - 2019-04-09

### BREAK

- Изменен внутренний api компонентов(смотреть демо)

### Added

- Добавленна поддержка max-width и max-height
- Добавлен компонент `Box` для обертки

### Fixed

- Исправлена ошибка рассчета скролла в Firefox
- Исправленны ошибки при изменении контента

## [1.0.1] - 2019-03-15

### Fixed

- Исправлена ошибка в типах ScrollArea

## [1.0.0] - 2019-03-11

### Fixed

- добавили requestAnimationFrame
- добавили проверки на вызвовы браузерных API

## [1.0.0-3] - 2019-02-21

### Added

- атрибут `theme` для `ScrollBar.Slider`

## [1.0.0-2] - 2018-12-21

### Added

- Добавлен autocomplete для IDE
- перерасчет свойств для скролла, при изменении размеров окна
- перерасчет свойств для скролла, при изменении контента в блоке

## [1.0.0-1] - 2018-11-13

### Added

- Initial release
