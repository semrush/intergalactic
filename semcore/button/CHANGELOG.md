# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.2.3] - 2022-10-26

### Fixed

- Lazy checks for necessity of `aria-label` in non production environment.

## [4.2.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.39.0 ~> 3.39.1]).

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.1.0] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [4.0.18] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.0.15] - 2022-08-29

### Fixed

- Fixed aria warning detection.

## [4.0.14] - 2022-08-24

### Fixed

- Update version `@semcore/utils` to use additional functions.

## [4.0.13] - 2022-08-19

### Added

- Added empty button aria-label check.

## [4.0.12] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0]).

## [4.0.4] - 2022-05-27

### Fixed

- Fixed `width, height` for size Button.

## [4.0.3] - 2022-05-23

### Fixed

- Fixed background-color active state for `<Button use='primary' theme='warning'/>`.

## [4.0.2] - 2022-05-19

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.0 ~> 3.32.1]
  , `@semcore/flex-box` [4.5.1 ~> 4.5.3]).

## [4.0.1] - 2022-05-19

### Fixed

- Updated Intergalactic internal dependencies to the latest.

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Remove value "xl" and "s" for "size".

## [3.3.7] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [3.3.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.3.4] - 2021-12-23

### Changed

- Changed `line-height` from 1.2 to 1.1 for correct display in all browsers.

## [3.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.2.1] - 2021-04-16

### Changed

- Changed line-height value

## [3.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.1.4] - 2020-12-02

### Fixed

- My little fix build 😬

## [3.1.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.1.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [3.1.0] - 2020-10-13

### Added

- Added alternative api for inserting `Addon`.

## [3.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.2] - 2020-07-13

### Changed

- Теперь z-index изменяется на +1 при фокусе с клавиатуры, для правильного отображения бордера с соседними элементами.

## [3.0.1] - 2020-06-22

### Fixed

- Поменялся цвет текста с `gray40` на `gray60` у `secondary-muted` и `tertiary-muted`.

## [3.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.5.1] - 2020-02-14

### Added

- [theme] Обновили стили `<Button use="tertiary">` для `sellerly`

## [2.5.0] - 2020-02-13

### Added

- Добавлена тема `sellerly`, фокус у контрола по умолчанию цвета `light-ultramarine`

## [2.4.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [2.4.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы
- Добавлено прокидываение классов на `Spin` внутри кнопки

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.3.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.2.0] - 2019-09-30

### Added

- Добавлен `forwardRef` на компонент

## [2.1.13] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.1.12] - 2019-09-23

### Changed

- Обоновлена типизация. Теперь компонент принимает св-ва от `React.LinkHTMLAttributes`

## [2.1.11] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text`

## [2.1.10] - 2019-08-07

### Fixed

- Исправлено отоборажение в NeighborLocation для `use="primary"`

## [2.1.9] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [2.1.8] - 2019-07-24

### Fixed

- Добавлен `font-weight: normal`

## [2.1.7] - 2019-07-05

### Removed

- Зависимость от `@semcore/control`

## [2.1.6] - 2019-06-03

### Changed

- Обновлена версия `@semcore/control`

## [2.1.5] - 2019-05-27

### Fixed

- Добавлен пропущенный `color`

## [2.1.4] - 2019-05-13

### Changed

- Обнавлена версия `Spin` и изменена верстка

### Fixed

- Добавлен `line-height: 1` для выравнивания текста
- Добавлен `border: transparent` по умолчанию
- Исправлено добавление лишнего `Button.Text` при вставке через фрагмент

## [2.1.3] - 2019-05-07

### Changed

- Исправлены стили для корректной работы с `@semcore/control`
- Обновлена версия `@semcore/control`

## [2.1.2] - 2019-04-24

### Fixed

- Добавили `line-height: 1` к тексту кнопки

### Changed

- Изменены отступы `Button.Addon` для размера `xl` с 8px на 12px

## [2.1.1] - 2019-03-18

### Fixed

- Исправлена работа свойства `active`

## [2.1.0] - 2019-02-13

### Added

- Зависимость от комопнента `Control`

## [2.0.0] - 2019-01-18

### BREAK

- Убрано свойство `before`/`after`
- Убрано свойство `fullWidth`
- Убрано свойство `inputRef`
- Убраны стили для не используемых тем
- Добавленно свойство css `vertical-align: middle;`

### Added

- Компонент унаследован от `Box`
- Добавлены статические компоненты `Text`, `Addon`
- Добавлена возможность сбрасывать темы и размеры

### Fixed

- Корректное отобрежение цветной темы в `Spin`

## [1.3.0] - 2018-11-17

### Fixed

- Исправлены стили для корректной работы с другим тэгом
- Добавлены недостающие HTML-attributes

## [1.2.0] - 2018-11-23

### Added

- Добавлен autocomplete для IDE
- Добавлена возможность изменять тег на произвольный
- Добавлена возможность отключать размер и стили

## [1.1.1] - 2018-10-09

### Fixed

- Цвет текста для типа `tertiary` с темой `info` изменен на `--denim-blue`

### Added

- `warning` для типа `primary` с темой `muted`

## [1.1.0] - 2018-08-17

### Added

- Добавленна возможность работы с компонентом `ControlsGroup`

### Removed

- Убрали поддержку зависимости от React15

## [1.0.0] - 2018-08-08

### Added

- Добавленна поддержка зависимости от React15

### Changed

- Обновлена зависимость от utils

## [1.0.0-3] - 2018-07-13

### Added

- Свойсво "fullWidth" для растягивания кнопки по всей ширине
- Добавлен spin для состояния loading

## [1.0.0-2] - 2018-07-06

### Added

- Инкапсуляция стилей

## [1.0.0-1] - 2018-06-04

### Added

- Initial release
