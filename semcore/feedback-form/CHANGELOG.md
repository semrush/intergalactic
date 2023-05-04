# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [5.4.14] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.22 ~> 4.3.23], `@semcore/utils` [3.50.5 ~> 3.50.6]).

## [5.4.12] - 2023-04-24

## [5.4.11] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.19 ~> 4.3.20], `@semcore/utils` [3.50.0 ~> 3.50.3]).

## [5.4.9] - 2023-04-11

### Changed

- Updated `final-form` version to meet `react-final-form` peer dependency.

## [5.4.8] - 2023-04-11

### Changed

- Patched `react-final-form` to the latest version.

## [5.4.7] - 2023-04-03

### Changed

- Version patch update due to children dependencies update (`@semcore/tooltip` [5.3.24 ~> 5.4.0]).

## [5.4.4] - 2023-03-27

### Fixed

- Added a11y error binding to field.

## [5.4.3] - 2023-03-24

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.15 ~> 4.3.16], `@semcore/utils` [3.48.1 ~> 3.49.0]).

## [5.4.0] - 2023-03-22

### Added

- Added properties `backgrouund` and `theme` responsible for spinner theme.

## [5.3.15] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.12 ~> 4.3.13], `@semcore/utils` [3.47.3 ~> 3.47.4]).

## [5.3.13] - 2023-03-16

### Fixed

- Fixed padding for the success state of the feedback form.

## [5.3.12] - 2023-03-13

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.10 ~> 4.3.11], `@semcore/utils` [3.47.1 ~> 3.47.2]).

## [5.3.8] - 2023-02-09

### Changed

- Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).

## [5.3.7] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.6 ~> 4.3.7], `@semcore/utils` [3.45.0 ~> 3.46.0]).

## [5.3.5] - 2023-01-10

## [5.3.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.3.3 ~> 4.3.4], `@semcore/utils` [3.44.1 ~> 3.44.2]).

## [5.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [5.3.0] - 2022-12-12

### Added

- Design tokens based theming.

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
