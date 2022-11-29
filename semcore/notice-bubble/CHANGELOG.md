# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.2.10] - 2022-11-24

### Fixed

- Replaced `NoticeBubbleManager` instance typings with `NoticeBubbleManager` typing.

## [4.2.9] - 2022-11-17

### Fixed

- Export of `NoticeBubbleManager` was missing in typings.

## [4.2.8] - 2022-11-14

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.2.0 ~> 3.3.0]).

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.1.7] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [4.1.0] - 2022-08-24

### Changed

- Animation styles moved to css file and now available for theming.

## [4.0.14] - 2022-08-23

### Added

- Added role and aria-live attribute for better accessibility.

## [4.0.13] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.30.0 ~> 2.30.1]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [3.3.7] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [3.3.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.3.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.2.2] - 2021-8-26

### Fixed

- Remove `console.log`.

## [3.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.2.0] - 2021-07-29

### Changed

- Number of simultaneous notifications can be more than one

### Added

- `visible` property can run in uncontrolled mode

## [3.0.0] - 2021-07-05

### BREAK

- Replace animation package from `react-transition-group` to `@semcore/animation`
- Remove property `offset` and added `Box` inside `NoticeBubbleContainer`

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- [TS] rewrite code from TS to JS.
- [A11y] added role for `Alert` and aria-label for `Close`.

## [2.1.1] - 2021-04-28

### Changed

- Changed media value to match breakpoints.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.9] - 2020-12-16

### Fixed

- Сomponent has become friendlier to SSR. Replace random generate number to get uid from function `useUID`.

## [2.0.8] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.7] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.0.6] - 2020-10-03

### Fixed

- generate css without collapsing property `margin`

## [2.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.4] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.3] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.2] - 2020-08-07

### Fixed

- Поправили рендер `NoticeBubbleWarning` при инициализации через `NoticeBubbleManager`

## [2.0.1] - 2020-07-22

### Fixed

- Поправили проброс стилей на `NoticeBubble`, когда он лежит рядом с `NoticeBubbleContainer`

## [2.0.0] - 2020-07-14

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавили свойство `visible` в `NoticeBubble`, `NoticeBubbleWarning` для управления видимостью
- Добавили поддержку свойства от `Box` в `NoticeBubble`, `NoticeBubbleWarning`

## [1.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.2.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.1.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.3] - 2019-08-13

### Fixed

- Убрано предупреждение реакта о устаревшем методе(`componentWillMount => componentDidMount`)

## [1.1.2] - 2019-06-11

### Fixed

- Обновились TS типы

## [1.1.1] - 2018-12-27

### Fixed

- Анимации работаю корректно

### Changed

- Обновлена зависимость react-transition-group

## [1.1.0] - 2018-11-29

### Added

- Добален warning нотис
- Добавлен автокомплит

### Changed

- Обновлена зависимость от utils
- Обновлена зависимость от icon

### Fixed

- Добавлена возможность отображение одновременно 2х нотисов (разных типов)
- Цвет обычного нотиса исправлен на \$gray20

## [1.0.0] - 2018-08-08

### Changed

- Обновлена зависимость от utils
- Обновлена зависимость от icon

## [1.0.0-2] - 2018-07-06

### Added

- Инкапсуляция стилей

## [1.0.0-1] - 2018-06-28

### Added

- Initial release
