# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [5.2.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.2.1 ~> 4.2.2], `@semcore/utils` [3.39.0 ~> 3.39.1]).

## [5.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [5.1.15] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.18 ~> 4.1.0]).

## [5.1.12] - 2022-08-30

### Added

- Added aria attributes for better a11y.

## [5.1.11] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.15 ~> 4.0.16], `@semcore/utils` [3.37.0 ~> 3.37.1]).

## [5.1.1] - 2022-06-28

### Fixed

- Fixed feedback image.

## [5.1.0] - 2022-06-21

### Changed

- Updated `react-final-form` to `6.5.2` to support React 17.

## [5.0.8] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/button` [4.0.5 ~> 4.0.6]).

## [5.0.6] - 2022-05-30

### Fixed

- Fixed version `@babel/runtime` for dependency `react-final-form`.

## [5.0.5] - 2022-05-27

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.3 ~> 4.0.4]).

## [5.0.3] - 2022-05-19

### Fixed

- Fixed Item tag property setting

## [5.0.2] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [5.0.1] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.0 ~> 4.0.1]).

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [4.0.5] - 2022-04-25

### Changed

- Version patch update due to children dependencies update (`@semcore/spin-container` [5.0.5 ~> 5.1.0]).

## [3.5.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.5.1] - 2022-02-07

### Fixed

- fixed styles for secondary Notice.

## [3.5.0] - 2022-01-25

### Added

- Added support Tooltip props for `FeedbackForm.Item`.

## [3.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.3.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.2] - 2021-08-17

### Fixed

- Fixed placement warning tooltip for small screens.

## [3.3.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [3.3.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- [TS] Rewrite code from TS to JS.

## [3.2.0] - 2021-04-05

### Changed

- Up version `@semcore/notice` in dependence for package.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.0] - 2020-06-10

### BREAK

- Обновились компоненты `Box, SpinContainer, Tooltip, Button, Notice`

## [2.3.0] - 2020-05-19

### Added

- Добавлена es6 сборка

## [2.2.5] - 2020-05-19

### Added

- [theme] Обновили стили `<FeedbackSuccess>` для `sellerly`

## [2.2.4] - 2020-03-25

### Fixed

- Добавлена пропущенная зависимость `@semcore/flex-box`

## [2.2.1] - 2019-12-25

### Fixed

- `FeedbackForm.validate.description` теперь корректно работает с переносами строк

## [2.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.0.0] - 2019-09-30

### BREAK

- Обвнавлен `react-final-form (^4.1 -> ^6.3)`

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.3.0] - 2019-06-18

### Changed

- Обновлены зависимости `spin-container` и `tooltip`

### Removed

- Зависимость `@semcore/spin`

## [1.2.0] - 2019-04-11

### Changed

- Обновлены зависимости `final-form`/`react-final-form`

### Fixed

- Исправленно отображение `theme="danger"` в `FeedbackForm.Notice`

## [1.1.0] - 2018-11-07

### Added

- Компонент нотис `FeedbackForm.Notice`

### Removed

- Отступы для `FeedbackForm.Item`

## [1.0.0] - 2018-11-07

### Added

- Initial release
