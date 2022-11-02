# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [6.1.4] - 2022-11-03

### Fixed

- Fixed displaying in unchecked and disabled state.

## [6.1.3] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0]).

## [6.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [6.0.13] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [6.0.12] - 2022-09-30

### Fixed

- Added missing `aria-checked` a11y attribute.

## [6.0.11] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [6.0.3] - 2022-05-31

### Fixed

- Fixed problem show `Checkbox` in `Modal` (Checkbox added scroll on page).

## [6.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1], `@semcore/typography` [4.0.1 ~> 4.0.3], `@semcore/flex-box` [4.5.1 ~> 4.5.3]).

## [6.0.1] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [6.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" for "size".

## [5.2.8] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/typography` [3.4.1 ~> 3.4.2]).

## [5.2.4] - 2022-02-24

### Added

- Added repository field to package.json file.

## [5.2.3] - 2022-02-03

### Fixed

- Add line-height for lable text to not depend on external line-height

## [5.2.2] - 2021-12-08

### Changed

- Moved checkbox size vars to style

## [5.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [5.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [5.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [5.0.3] - 2020-12-03

### Added

- Added active invalid state.

## [5.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [5.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [5.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [4.4.2] - 2020-03-11

### Fixed

- Иконка галочки `checked` чекбокса закодирована в `base64`

## [4.4.1] - 2020-02-13

### Fixed

- Переименовали сбилженные файлы с 'sm.style.css' -> 'style.css'

## [4.4.0] - 2020-02-12

### Added

- Добавлена тема `sellerly`, контрол по умолчанию цвета `light-ultramarine`

## [4.3.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [4.3.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [4.2.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)
- Добавлен `forwardRef` на компонент

## [4.1.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [4.1.0] - 2019-09-23

### Added

- Добавлена возможность управления фокусом с помощью клавиатуры

## [4.0.5] - 2019-08-09

### Fixed

- Исправлено отображение `cursor: pointer` при наведении на `Checkbox`

## [4.0.3] - 2019-08-02

### Fixed

- Исправлена сборка для SSR

## [4.0.2] - 2019-07-05

### Fixed

- Исправлен не работающий `onClick` на `Value`

## [4.0.0] - 2019-04-12

### BREAK

- Добавили свойства `Checkbox.Value`, `Checkbox.Text`
- Убрано свойство `inputRef`
- Удалили компонент `CheckboxGroup`
- Изменили размеры на `['m', 'l', 'xl']`
- Убрали свойство `invalid`
- Добавили свойство `state` со значениями `['invalid', 'valid', false]`

## [3.0.3] - 2019-02-20

### Fixed

- Двойной вызов onClick на label

## [3.0.2] - 2019-01-10

### Fixed

- Исправлено отображение в браузере Firefox

### Removed

- Обводку при клике по `checkbox`

## [3.0.1] - 2018-12-28

### Fixed

- Исправлено отображение в состоянии `checked` и `indeterminate`

## [3.0.0] - 2018-12-19

### Removed

- убран prop `gutterBottom`

## [2.0.0] - 2018-11-23

### Fixed

- Переименовано свойство "inValid" -> "invalid" 🤦‍♂️

### Added

- Добавлен autocomplete для IDE

## [1.0.4] - 2018-14-11

### Changed

- отступ сверху от `checkbox` иконки

## [1.0.3] - 2018-09-04

### Added

- стили для `focus` controller input

### Changed

- border-color at var(--stone)

## [1.0.2] - 2018-08-29

### Added

- support React15

## [1.0.1] - 2018-08-28

### Changed

- the behavior indeterminate of input

### Added

- prop inputRef for get DOM node input

## [1.0.0] - 2018-08-25

### Added

- Initial release
