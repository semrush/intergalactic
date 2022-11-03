# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.13.4] - 2022-10-30

### Changed

- Updated `focus-lock`.

## [4.13.3] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.6.2 ~> 4.6.3], `@semcore/neighbor-location` [3.1.2 ~> 3.1.3], `@semcore/outside-click` [2.5.2 ~> 2.5.3], `@semcore/utils` [3.40.0 ~> 3.40.0]).

## [4.13.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.12.0] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [4.11.31] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.5.11 ~> 4.5.12], `@semcore/neighbor-location` [2.3.15 ~> 2.3.16], `@semcore/outside-click` [2.4.13 ~> 2.4.14], `@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.11.30] - 2022-09-30

### Fixed

- Removed aria attributes that were breaking components a11y.

## [4.11.29] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.5.10 ~> 4.5.11], `@semcore/neighbor-location` [2.3.14 ~> 2.3.15], `@semcore/outside-click` [2.4.12 ~> 2.4.13], `@semcore/utils` [3.37.0 ~> 3.37.1]).

## [4.11.24] - 2022-07-18

### Fixed

- Fixed possibility to insert render function into `Popper.Trigger`.

## [4.11.23] - 2022-07-14

### Changed

- Version patch update due to children dependencies update (`@semcore/neighbor-location` [2.3.9 ~> 2.3.10]).

## [4.11.19] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [4.11.17] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/neighbor-location` [2.3.4 ~> 2.3.5], `@semcore/outside-click` [2.4.2 ~> 2.4.3], `@semcore/utils` [3.31.2 ~> 3.31.2]).

## [4.11.16] - 2022-02-24

### Added

- Added repository field to package.json file.

## [4.11.15] - 2021-12-22

### Changed

- remove functionality for stop propagation of events `onMouseEnter, onMouseLeave` from the `<Popper.Popper/>`.

## [4.11.14] - 2021-12-07

### Fixed

- Property `root` for Popper set to `OutsideClick`.

## [4.11.13] - 2021-10-18

### Changed

- Up version package `focus-lock`.

## [4.11.12] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.11.11] - 2021-07-06

### Fixed

- Fixed cjs build package.

## [4.11.10] - 2021-06-22

### Changed

- Improved render performance

## [4.11.9] - 2021-06-18

### Fixed

- Fixed forwarding properties to the `Box` in `Popper.Popper`.

## [4.11.8] - 2021-06-10

### Fixed

- Fixed set prop `returnFocus` for Focus-Lock

## [4.11.7] - 2021-06-08

### Fixed

- Fix TS type

## [4.11.6] - 2021-06-04

### Fixed

- [A11] Fixed set `aria-pressed` for `Popper.Trigger`.

## [4.11.5] - 2021-05-17

### Fixed

- Add type for handlers for render function

## [4.11.4] - 2021-05-11

### Fixed

- Fix TS type

## [4.11.3] - 2021-05-05

### Changed

- Rewrite code from TS to JS 🧑‍💻

### Fixed

- Fix position arrow after change version `popperjs`.

## [4.10.1] - 2021-04-28

### Fixed

- Fixed the setting of attributes in HTML.

## [4.10.0] - 2021-4-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [4.9.0] - 2021-04-20

### Added

- Added functions `setTrigger, setPopper` in context for Popper.

### Changed

- Bump `poperjs` to `2.9.2`.

## [4.8.0] - 2020-12-17

### Added

- Added supported react@17.

## [4.7.2] - 2020-12-16

### Fixed

- Сomponent has become friendlier to SSR. Replace random generate number to get uid from function `useUID`.

## [4.7.1] - 2020-11-25

### Fixed

- Fixed import paths from `@popperjs`.
- Refactor modifier `arrowOffset` that calculates arrow position.

## [4.7.0] - 2020-11-10

### Added

- Added the ability to use one `<Popper.Popper/>` with multiple `<Popper.Trigger/>`

### Changed

- Removed the display of the popper by focus when navigating from the keyboard, it caused many bugs 🤷‍♂️

## [4.6.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [4.6.1] - 2020-09-30

### Added

- Added generic for better `value` and `onChange` typings

### Changed

- Update @semcore/core version to ^1.8

- Update dependency package `@popperjs/core` version from `2.4.0` to `2.5.3`

## [4.5.0] - 2020-09-11

### Added

- Add functionality for stop propagation of events from the `<Popper.Popper/>`, more details [here](https://github.com/facebook/react/issues/11387).

## [4.4.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.4.1] - 2020-08-17

### Fixed

- Исправлены ts типы для `offset`

## [4.4.0] - 2020-08-05

### Added

- Зависимость от `neighbor-location` для обнуления расположения соседних элементов внутри `Popper.Popper`.

## [4.3.0] - 2020-07-22

### Fixed

- Оптимизировали перерендеры триггера и поппера

### Added

- Добавили `ResizeObserver` для слежения за изменением размеров триггера или поппера для правильного позиционирования поппера

## [4.2.2] - 2020-07-15

### Fixed

- Зафиксирована версия `@popperjs/core`, так как последняя версия вызывает ошибку с бесконечным циклом

## [4.2.1] - 2020-07-06

### Fixed

- Убраны `import type` из Popper.tsx

## [4.2.0] - 2020-07-06

### Added

- Добавлен кастомный модификатор `arrow` для корректного выравнивания стрелки в `Popper.Popper`

## [4.1.1] - 2020-06-26

### Fixed

- Восстановлены экспорты типов `Placement`, `Modifiers`, `Strategy`

## [4.1.0] - 2020-06-08

### Added

- Добавлено свойство `interaction='none'` для выключения реакции на любые события.

## [4.0.3] - 2020-06-02

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [3.6.3] - 2020-03-25

### Fixed

- Добавлена пропущенная зависимость `@semcore/ui`

## [3.6.1] - 2019-12-27

### Fixed

- Исправлена ошибка при который TS не мог найти типы, так как конфликтовали `Popper/index.ts` и `Popper.ts`.

## [3.6.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.5.1] - 2019-11-14

### Fixed

- Поправили доступ к `DOM` нодам `Trigger, Popper`

## [3.5.0] - 2019-10-10

### Changed

- Убрано `inline` свойство для дефолтного триггера

## [3.4.0] - 2019-10-08

### Added

- Добавлен `resize-observer` для автоматического выравнивания при изменении размеров

## [3.3.5] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [3.3.4] - 2019-09-05

### Fixed

- Исправлена ошибка типизации `Popper`

## [3.3.3] - 2019-07-05

### Fixed

- Исправлена ошибка при отсутствии `onOutsideClick`

## [3.3.1] - 2019-07-05

### Fixed

- Убрал лишний рендер, улучшена производительность

## [3.3.0] - 2019-06-25

### Added

- Добавлен доступ к пропу `ecludedRefs` вложенного `@semcore/outside-click`

## [3.2.3] - 2019-06-13

### Fixed

- Исправлена проблема открытия `Popper` при начале клика на `Trigger`-е, а заканчивание на `Popper`-е

## [3.2.2] - 2019-06-06

### Fixed

- Отключение перерендера `Trigger` при закрытом `Popper`

## [3.2.1] - 2019-06-04

### Changed

- Расчет положения `Popper` для крайних положений ("start", "end").

## [3.2.0] - 2019-04-17

### Added

- Добавлен Box в `Popper` и `Trigger`

### Changed

- Увеличен `z-index` до 110
- Расширен контекст в `Popper` и `Trigger`

## [3.1.5] - 2019-03-21

### Fixed

- Добавлено предсказуемое поведение на закрытие при размещении одного `Popper` в другом `Popper`

## [3.1.4] - 2019-03-13

### Added

- Добавлено св-во `popperZIndex`, отвечает за `z-index` выпадающего окна

## [3.1.3] - 2019-02-20

### Fixed

- Баг с отсутствием ререндера `Popper.Popper` при именении стилей popper.js

## [3.1.2] - 2019-01-22

### Added

- Экспорт `PortalProvider`

### Changed

- Переименован props `disablePortalRender` -> `disablePortal`

## [3.1.1] - 2019-01-21

### Changed

- Поднята версия зависимости @semcore/utils до 2.0.0

## [3.1.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE

## [3.0.0] - 2018-11-01

### BREAK

- переименован export компоненетов с `{ Manage, Reference, Popper }` на статичные default компонента
- переименован компонент `Reference` в `Trigger`
- удалено свойство `popperDisplayEvents` и его функционал
- переименовано свойство `referenceDisplayEvents` в `displayEvents`
- переименовано свойство `showTimeout` и `hideTimeout` в `displayTimeout.show` и `displayTimeout.hide`

## [2.0.0] - 2018-10-11

### BREAK

- изменено возвращаемое значение с `ref, handlers, ...` на `getPopperProps`, `getArrowProps` и `getTriggerProps` для `Reference` и `Popper` компонентов
- возможность изменить `default` значения свойств для `Manager`
- возможность подменить контекст у всех компонентов
- добавлен обязательное свойство `tag` компонент для `Reference`
- переименован функциональный аргумент передаваемый в функцию рендера с `onVisibleChane` на `changeVisible`

## [1.0.2] - 2018-09-27

### Changed

- версию пакета `@semcore/utils`

## [1.0.1] - 2018-09-27

### Added

- зависимость в `package.json` от `@semcore/portal`

## [1.0.0] - 2018-09-27

### Added

- Initial release
