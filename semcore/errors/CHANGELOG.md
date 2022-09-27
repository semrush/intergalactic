# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.5] - 2022-09-27

### Changed

- Moved svg illustrations to `@semcore/illustration` component.

## [3.3.4] - 2022-09-20

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.16 ~> 4.0.17]).

## [3.3.3] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/button` [4.0.15 ~> 4.0.16]).

## [3.3.2] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.14 ~> 4.0.15]).

## [3.3.1] - 2022-08-25

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.13 ~> 4.0.14]).

## [3.3.0] - 2022-08-22

### Changed

- Updated translations.

### Added

- Added Turkish langauge support.

## [3.2.2] - 2022-08-19

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.12 ~> 4.0.13]).

## [3.2.1] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/button` [4.0.11 ~> 4.0.12]).

## [3.2.0] - 2022-08-12

### Added

- Added `role="alert"` attributes to increase support for a11y.

## [3.1.4] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/button` [4.0.10 ~> 4.0.11], `@semcore/typography` [4.0.11 ~> 4.1.0]).

## [3.1.3] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0], `@semcore/button` [4.0.8 ~> 4.0.9]).

## [3.1.2] - 2022-07-14

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.7 ~> 4.0.8]).

## [3.1.1] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/button` [4.0.6 ~> 4.0.7]).

## [3.1.0] - 2022-06-01

### Changed

- Changed type names from 'iconNames' to 'iconNamesErrors' so that there are no intersections with other components.

## [3.0.5] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/button` [4.0.4 ~> 4.0.5]).

## [3.0.4] - 2022-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.3 ~> 4.0.4]).

## [3.0.3] - 2022-05-23

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.2 ~> 4.0.3]).

## [3.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/button` [4.0.1 ~> 4.0.2], `@semcore/flex-box` [4.5.1 ~> 4.5.3], `@semcore/typography` [4.0.1 ~> 4.0.3]).

## [3.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.0 ~> 4.0.1]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [2.5.6] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/typography` [3.4.1 ~> 3.4.2]).

## [2.5.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/button` [3.3.6 ~> 3.3.7]).

## [2.5.4] - 2022-03-04

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [3.3.5 ~> 3.3.6], `@semcore/format-text` [2.2.2 ~> 2.3.0], `@semcore/typography` [3.3.2 ~> 3.4.0]).

## [2.5.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.5.1] - 2022-01-18

### Changed

- Removed unused dependency `@semcore/icon`.

## [2.4.3] - 2021-9-24

### Changed

- Updated the `title`, `text` and `btnHome` fields for the `en` locale in the `PageNoData` component.
- Updated the `title` and `btnHome` fields for the `en` locale in the `Maintenance` component.
- Updated the `btnHome` field for the `en` locale in the `AccessDenied` component.

## [2.4.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.1] - 2021-08-04

### Fixed

- [TS] fixed types.

## [2.4.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.3.0] - 2021-02-20

### Added

- Added support two languages `Korean, Vietnamese`.

## [2.2.0] - 2021-02-15

### Added

- Added supported react@17.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.7] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.6] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.5] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.4] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.3] - 2020-06-19

### Fixed

- Исправлена ошибка в обаботчка клика по кнопке компонента `PageError`

## [2.0.1] - 2020-06-18

### Fixed

- Убран некорректный импорт из `widget-empty/src`, ломающий проверку типов `typescript`

## [2.0.0] - 2020-06-17

### BREAK

- Из комопнента `AccessDenied` убраны кнопка `Contact Us` и проперти `contactsLink`
- Обновлена иконка компонента `AccessDenied`
- Обновлен тексты и локализация в компоненте `AccessDenied`
- Из комопнента `PageNotFound` убрана кнопка `Contact Us` и проперти `contactsLink`
- В компонент `ProjectNotFound` добавлена кнопка `Contact Us` и проперти `contactsLink`
- Обновлен текст и локализация компонента `ProjectNotFound`

## [1.3.3] - 2020-02-04

### Fixed

- Исправлен проброс свойства `homeLink` на компонент `AccessDenied`

## [1.3.2] - 2020-01-29

### Added

- Добавилось прокидывание children в дефолтные ошибки

## [1.2.1] - 2020-01-22

### Fixed

- Исправлена не корректная проверка на доступность `document` при клике на рефреш страниицы

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.0.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.3] - 2019-09-27

### Fixed

- Уменьшен размер сборки засчет `require('./package.json')`

## [1.0.2] - 2019-09-06

### Added

- Initial release
