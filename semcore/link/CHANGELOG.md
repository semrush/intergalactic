# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.3.21] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0], `@semcore/flex-box` [4.7.17 ~> 4.7.18]).

## [4.3.11] - 2023-02-09

## [4.3.10] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7]).

## [4.3.8] - 2023-01-10

## [4.3.7] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/flex-box` [4.7.3 ~> 4.7.4]).

## [4.3.6] - 2022-12-21

### Fixed

- Fixed vertical align for use as a text link.

## [4.3.5] - 2022-12-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.0 ~> 3.44.1], `@semcore/flex-box` [4.7.2 ~> 4.7.3]).

## [4.3.3] - 2022-12-14

### Fixed

- Fixed supporting ellipsis links with addon.

## [4.3.2] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [4.3.1] - 2022-12-12

### Changed

- `Link.Addon` is centered vertically.

## [4.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.2.3] - 2022-10-26

### Fixed

- Lazy checks for necessity of `aria-label` in non production environment.

## [4.2.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.39.0 ~> 3.39.1], `@semcore/flex-box` [4.6.1 ~> 4.6.2]).

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.1.5] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/flex-box` [4.5.11 ~> 4.5.12]).

## [4.1.3] - 2022-08-29

### Fixed

- Fixed aria warning detection.

## [4.1.2] - 2022-08-26

### Fixed

- Change tag for `Link.Addon` from `div` to `span`

## [4.1.1] - 2022-08-24

### Fixed

- Update version `@semcore/utils` to use additional functions.

## [4.1.0] - 2022-08-19

### Added

- Added screen reader support and empty link aria-label check

## [4.0.11] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/flex-box` [4.5.9 ~> 4.5.10]).

## [4.0.2] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [4.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.24.0 ~> 2.25.0]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [3.5.2] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/typography` [3.4.1 ~> 3.4.2]).

## [3.5.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [3.4.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.4.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.2.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.2.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [3.2.0] - 2020-10-13

### Added

- Added alternative api for inserting `Addon`.

## [3.1.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.1.0] - 2020-07-15

### Fixed

- Вернули свойсво `noWrap={true}` для управления css свойством `white-space` компонента `<Link>`
- Вернули свойсво `inline` для управления css свойством `display` компонента `<Link>`

## [3.0.2] - 2020-07-09

### Fixed

- Убрали цвет для ссылки по событию `:visited`. Управлять цветом для `visited` можно только при помощи свойтва `enableVisited`.

## [3.0.1] - 2020-06-25

### Fixed

- Исправлена проблема неправильной автоматической обертки в `Link.Text`.

## [3.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Changed

- Изменился цвет активной и по ховеру ссылки c 16% на 12%

## [2.4.1] - 2020-02-13

### Fixed

- Переименовали сбилженные файлы с 'sm.style.css' -> 'style.css'

## [2.4.0] - 2020-02-12

### Added

- Добавлена тема `sellerly`, контрол по умолчанию цвета `light-ultramarine`

## [2.3.1] - 2020-02-04

### Fixed

- `ref` ссылки теперь возвращает DOM-ноду, а не инстанс класса
- [TS] Изменили свойство `active` для `Link` как необязательный

## [2.3.0] - 2020-02-03

### Added

- Добавлены стили для :active
- Добавлен проперти active, отвечает за отрисовку `:active` кнопки

### Fixed

- Исправлен transition нижнего бордера копонента при `:hover` и `:active`

## [2.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [2.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.1.1] - 2019-12-02

### Fixed

- Добавлен `backgound: none` для перекрытия дефолтных стилей в Safari при `tag="button"`

## [2.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.0.11] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.0.10] - 2019-09-27

### Added

- свойство `font-family: inherit`

## [2.0.9] - 2019-09-03

### Fixed

- Исправлена ошибка в типизации

## [2.0.8] - 2019-08-14

### Fixed

- Исправлена ошибка в типизации

## [2.0.7] - 2019-08-13

### Fixed

- Убран `user-select: none;`

## [2.0.6] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text`

## [2.0.5] - 2019-08-02

### Fixed

- Исправлена ошибка в типизации

## [2.0.4] - 2019-07-31

### Fixed

- Изменен отступ от правого аддона(8px -> 4px)

## [2.0.3] - 2019-07-04

### Fixed

- Исправлена работа св-ва `noWrap`

## [2.0.2] - 2019-05-30

### Fixed

- Исправлено отображение подчеркивания при наведении на ссылку

## [2.0.1] - 2019-05-23

### Added

- Добавлено св-во `inline`

### Fixed

- Исправлена работа св-ва `noWrap`

## [2.0.0] - 2019-05-08

### BREAK

- `LinkCore` теперь экспорт по умолчанию
- Удалены `theme`
- `use=hint` переехал в отдельный компонент
- Убран `size`, теперь он берется из типографики

## [1.1.2] - 2019-03-01

### Fixed

- Исправлено поведение св-ва `enableVisited`, теперь позволяет включить браузерную подсветку `:visited` ссылок

## [1.1.1] - 2018-02-11

### Changed

- цвет ссылки с темой `link`, поведение по ховеру ссылки с темой `hint`
- обновили пакет `typography`

## [1.1.0] - 2018-12-26

### Added

- автокомплит для IDE

## [1.0.3] - 2018-14-11

### Changed

- `line-height` текста

## [1.0.2] - 2018-10-24

### Changed

- добавили возможность переопределить размер шрифта

## [1.0.1] - 2018-09-14

### Added

- `LinkCore` элемент для ручной настройки компонента

## [1.0.0] - 2018-08-29

### Added

- Release
