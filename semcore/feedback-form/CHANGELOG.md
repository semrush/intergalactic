# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.0.2] - 2022-03-05

### Changed

- Version patch update due to children dependencies update (`@semcore/spin-container` [5.0.2 ~> 5.0.3], `@semcore/notice` [3.2.1 ~> 3.2.2]).

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
