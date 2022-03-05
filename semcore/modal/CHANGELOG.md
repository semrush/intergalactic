# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.4.3] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [2.4.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.4.1] - 2022-01-25

### Changed

- Replaced function `findComponent` to `isAdvanceMode` for check children in `Modal`.

## [2.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.3.4] - 2021-9-13

### Changed

- Changed overlay opacity from 80% to 60%
- Changed overlay opacity for the second modal window from 20% to 40%

## [2.3.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.2] - 2021-06-28

### Changed

- [TS] rewrite code from ts to js.
- [A11y] added role for `Window` and aria-label for `Close` and `Window`.

## [2.3.1] - 2021-04-28

### Changed

- Changed media value to match breakpoints.

## [2.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.4] - 2020-11-09

### Fixed

- Fixed set autofocus/focus for elements inside Modal.

## [2.1.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.2] - 2020-09-11

### Fixed

- Modal.Close now changes visibility state only because of closable prop.

## [2.1.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.0] - 2020-08-14

### Changed

- Логика по отключению скролла страницы перенесена в хук `usePreventScroll`
- Поднята версия `@semcore/utils`

## [2.0.3] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.2] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Changed

- изменили цвет по ховеру для иконки закрытия модального окна, c 16% на 12%

## [1.4.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.3.1] - 2019-12-09

### Fixed

- Получение DOM-ноды через `ref` для всех компонентов

## [1.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.2.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.2.2] - 2019-09-23

### Fixed

- Исправлены ошибки в типизации компонента

## [1.2.1] - 2019-08-05

### Fixed

- Исправлен проброс модальной dom ноды в `PortalProvider` для корректного отображения других выпадающих оконо внутри модалки

## [1.2.0] - 2019-08-02

### Changed

- Удалена зависимость `outsideClick`
- Изменена логика закрытия по клику на оверлей, сейчас срабатывает только при клике на оверлей

## [1.1.5] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [1.1.4] - 2019-07-17

### Fixed

- Исправлена проблема не работающего крестика при вставки `SpinContainer`-а в модалку(добавлен `z-index` для `Close`)

## [1.1.3] - 2019-06-17

### Fixed

- Исправлено удаление `overflow: hidden` с body при закрытие второго окна(модалка в модалке)

## [1.1.1] - 2019-06-11

### Fixed

- Исправлена ошибка в типизации. Интерфейс `IModalProps` теперь наследуется от `IModalWindowProps`

## [1.1.0] - 2019-05-24

### Changed

- Теперь внутренние выподающие окна(Popper) рендряться в div модального окна, а не в body

## [1.0.2] - 2019-03-22

### Fixed

- Испривлено закрытие по ESC
- Оптимизирован рендер компонента

## [1.0.1] - 2019-02-22

### Added

- расчет ширины полосы прокрутки

## [1.0.0] - 2019-02-21

### Added

- Initial release
