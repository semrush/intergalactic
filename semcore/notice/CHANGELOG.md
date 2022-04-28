# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.2.6] - 2022-04-28

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.20.0 ~> 2.21.0]).

## [3.2.5] - 2022-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.5.0 ~> 1.5.0]).

## [3.2.4] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.19.4 ~> 2.20.0]).

## [3.2.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.1 ~> 1.4.2], `@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1], `@semcore/icon` [2.19.3 ~> 2.19.4]).

## [3.2.2] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/animation` [1.4.0 ~> 1.4.1]).

## [3.2.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.2.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.1.2] - 2021-12-08

### Changed

- Moved SLabel colors to style

## [3.1.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.1.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- [A11y] added role for `Alert` and aria-label for `Close`.

## [3.0.0] - 2021-03-15

### BREAK

- Removed global styles
- Removed styles for media queries.
- Replace animation package from `react-transition-group` to `@semcore/animation`
- Update property `theme`, now this property can get any themes
- Added property [`use`](/components/notice/notice-api/)
- Update icon for `Notice.IconClose`

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.5] - 2020-11-18

### Fixed

- Fixed top margin of Notice.Actions

## [2.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.2] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.1] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавлена анимация на скрытие.
- Добавлено свойство `duration` для управления скоростью анимации.

### Changed

- Изменился цвет по ховеру для иконки закрытия нотиса, c 16% на 12%

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

## [1.3.0] - 2019-12-10

### Added

- `display: inline-flex` для уменьшения высоты `Notice.Label`

### Fixed

- Получение DOM-ноды через `ref` для всех компонентов

## [1.2.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.1.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.1] - 2019-09-09

### Changed

- обновил зависимости

### Fixed

- стили для текста и отступ у иконки закрыть `notice`

## [1.1.0] - 2019-03-21

### Added

- возможность задавать цвет из нашей палитры цветов

## [1.0.0] - 2019-03-14

### Added

- зависимость от `flex-box` компонента

### Fixed

- вызов `onClose` для `NoticeSmart`

### Removed

- поддержку свойства `closable` в `Notice`

## [1.0.0-1] - 2018-12-27

### Fixed

- Исправлена работа анимации

## [1.0.0-0] - 2018-09-26

### Added

- Initial release
