# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [5.0.11] - 2022-09-22

### Fixed

- Fixed arrangement of internal and external circles in `checked` state.

## [5.0.10] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [5.0.9] - 2022-08-23

### Added

- Added missing type `defaultValue` in `index.d.ts`.

## [5.0.8] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0], `@semcore/flex-box` [4.5.9 ~> 4.5.10]).

## [5.0.7] - 2022-08-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.35.1 ~> 3.36.0], `@semcore/flex-box` [4.5.8 ~> 4.5.9], `@semcore/typography` [4.0.11 ~> 4.1.0]).

## [5.0.6] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0], `@semcore/flex-box` [4.5.6 ~> 4.5.7]).

## [5.0.5] - 2022-07-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.33.0 ~> 3.34.0], `@semcore/flex-box` [4.5.5 ~> 4.5.6]).

## [5.0.4] - 2022-06-27

### Fixed

- Change inherited TS type for Radio (IFlexProps -> IBoxProps)

## [5.0.3] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/flex-box` [4.5.4 ~> 4.5.5]).

## [5.0.2] - 2022-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.1 ~> 3.32.2], `@semcore/flex-box` [4.5.3 ~> 4.5.4]).

## [5.0.1] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" for "size".

## [4.2.6] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/typography` [3.4.1 ~> 3.4.2]).

## [4.2.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [4.2.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [4.2.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [4.2.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [4.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [4.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [4.0.7] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [4.0.6] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [4.0.5] - 2020-10-09

### Fixed

- Fixed getting the last argument(event) in the handler(onChange)

## [4.0.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [4.0.3] - 2020-07-14

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [4.0.2] - 2020-06-10

### Fixed

- Исправлены TS типы

## [4.0.1] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [3.2.3] - 2020-05-21

### Fixed

- Исправлено некорректное отображение состояния `checked` для `Radio`, обернутых в `RadioGroup`

## [3.2.2] - 2019-12-26

### Fixed

- Исправлена проблема выбора при работе с `RadioGroup`

## [3.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [3.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [3.0.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [3.0.3] - 2019-07-31

### Fixed

- Исправлены ошибки типизации `Radio.Value`

## [3.0.2] - 2019-08-09

### Fixed

- Исправлено отображение `cursor:pointer` при наведении ка компонент

## [3.0.1] - 2019-04-15

### Fixed

- навешивание свойства `checked` для `Radio` внутри `RadioGroup`

## [3.0.0] - 2019-04-12

### BREAK

- Добавили свойства `Radio.Value`, `Radio.Text`
- Изменили компонент `RadioGroup`
- Изменили размеры на `['m', 'l', 'xl']`
- Убрали свойство `invalid`
- Добавили свойство `state` со значениями `['invalid', 'valid', false]`

## [2.0.1] - 2019-02-20

### Fixed

- Двойной вызов onClick на label

## [2.0.0] - 2018-12-19

### Added

- Добавлен autocomplete для IDE

### Changed

- переименовано св-во `inValid` -> `invalid`

### Removed

- убрано св-во `gutterBottom`

## [1.0.3] - 2018-11-14

### Changed

- отступ сверху от `radio` иконки

## [1.0.2] - 2018-09-04

### Added

- style for focus controller input

## [1.0.1] - 2018-09-12

### Changed

- Обновили размер бордера в `checked` состоянии

## [1.0.0] - 2018-08-25

### Added

- Добавленна поддержка рендера произвольных радио кнопок

## [1.0.0-1] - 2018-08-22

### Added

- Initial release
