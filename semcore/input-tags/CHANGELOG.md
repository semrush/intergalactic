# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.27] - 2023-04-11

### Fixed

- Non-interactive container are not focusable by keyboard now.

## [3.3.26] - 2023-03-31

### Fxed

- Fixed scrolling when paste and enter items.

## [3.3.25] - 2023-03-30

### Added

- Added checking if the input `ref` has `scrollIntoView` method.

## [3.3.24] - 2023-03-30

### Fixed

- Fixed checking if the input `ref` is exists.

## [3.3.23] - 2023-03-29

### Added

- Added auto scroll when paste and enter items.

## [3.3.22] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.49.1 ~> 3.50.0], `@semcore/input` [3.5.17 ~> 3.5.18]).

## [3.3.16] - 2023-03-21

### Fixed

- Fixed alignment cursor when without tags.

## [3.3.15] - 2023-03-20

### Fixed

- Fixed tag display when crossing the border during scroll.
- Fixed tag alignment when set minimum height.

## [3.3.14] - 2023-03-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.2 ~> 3.47.3], `@semcore/input` [3.5.11 ~> 3.5.12]).

## [3.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.9] - 2022-12-06

### Fixed

- Fixed `Value` type

## [3.2.8] - 2022-12-02

### Fixed

- Fixed exported types of components.

## [3.2.7] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [3.2.6] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/input` [3.3.0 ~> 3.3.1]).

## [3.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.1.3] - 2022-10-10

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.16 ~> 3.1.0]).

## [3.1.0] - 2022-09-05

### Added

- Added screen reader support

## [3.0.16] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/input` [3.0.14 ~> 3.0.15]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Major update components.

## [2.5.2] - 2022-04-25

### Changed

- Version patch update due to children dependencies update (`@semcore/scroll-area` [3.7.0 ~> 3.7.1]).

## [2.5.0] - 2022-04-11

### Changed

- Deprecated `onAdd` callback property in favor of new `onAppend` one.
- Provided SyntheticEvents to second callbacks argument.

## [2.4.9] - 2022-04-01

### Fixed

- Component may fire `onRemove` event even when new tag text field is filled with space symbols.

## [2.4.8] - 2022-03-21

### Changed

- Version patch update due to children dependencies update (`@semcore/tag` [3.7.0 ~> 3.7.1]).

## [2.4.5] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.4.4] - 2021-12-23

### Changed

- Changed `line-height Tag` from 1.2 to 1.1 for correct display in all browsers.

## [2.4.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.3.1] - 2021-04-16

### Added

- Added line-height value

## [2.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.2.2] - 2020-11-25

### Fixed

- Fixed cursor position during tag editing

## [2.2.1] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.2.0] - 2020-09-09

### Added

- Added property `editable` in `InputTags.Tag` for called `onRemove` when on click tag

## [2.1.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.0] - 2020-08-18

### Added

- [TS] Добавили экспортируемый тип для размеров `InputTagsSize`.

### Fixed

- Поправили отображение для динимически меняющегося `placeholder` для `InputTags.Value`
- Поправили расположение по вертикали для `InputTags.Value`

## [2.0.2] - 2020-08-17

### Fixed

- Поправили установку курсора в поле ввода

## [2.0.1] - 2020-07-15

### Fixed

- Исправлено обрезание box-shadow при фокусе

## [2.0.0] - 2020-06-19

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавлена интеграция с ScrollArea. Теперь можно задавать `h` и `hMax` для появления скролла.

## [1.4.0] - 2020-05-15

### Added

- Вызов функции `onAdd` при вставке данных данных в `InputTags.Value`.

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

## [1.1.0] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [1.0.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.1] - 2019-04-22

### Added

- Initial release
