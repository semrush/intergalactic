# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.5.3] - 2023-05-03

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.5.22 ~> 3.5.23], `@semcore/utils` [3.50.4 ~> 3.50.5], `@semcore/flex-box` [4.7.20 ~> 4.7.21]).

## [4.5.1] - 2023-04-24

## [4.5.0] - 2023-04-17

### Changed

- Remove `aria-invalid` because you can't enter the wrong value.
- Added hint for screen reader.
- Controls are now `display:none` rather than `visibility:hidden`, this gives more space for placeholder.

## [4.4.19] - 2023-03-28

### Changed

- Changed color in default and focused states as in `Figma`.

## [4.4.18] - 2023-03-28

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.5.17 ~> 3.5.18], `@semcore/utils` [3.49.1 ~> 3.50.0], `@semcore/flex-box` [4.7.17 ~> 4.7.18]).

## [4.4.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [4.4.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.3.7] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [4.3.6] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.3.0 ~> 3.3.1], `@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/flex-box` [4.6.3 ~> 4.6.4]).

## [4.3.4] - 2022-11-03

### Fixed

- Fixed mask and text line-height mismatch.

## [4.3.3] - 2022-10-28

### Added

- Allowed to pass children.

## [4.3.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.2.2 ~> 3.2.3], `@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/flex-box` [4.6.2 ~> 4.6.3]).

## [4.3.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [4.2.1] - 2022-10-10

### Fixed

- Fixed displaying of addons placed on the end (right in ltr languages) of input.
- Fixed mask underlay position desynchronization with html input content;
- Hidden placeholders and mask from real DOM to exclude it from copied content.

## [4.2.0] - 2022-10-07

### Changed

- Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

## [4.1.2] - 2022-10-06

### Fixed

- Fixed addon placed before input value may be overlayed by input value.
- Fixed previously broken in previous version backward compatibility of piping api.

## [4.1.1] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/input` [3.0.15 ~> 3.0.16], `@semcore/utils` [3.37.1 ~> 3.37.2]).

## [4.1.0] - 2022-09-20

### Added

- Added accessibility for screen reader.

## [4.0.14] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/input` [3.0.14 ~> 3.0.15]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Major dependency update Input.

## [3.2.3] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/input` [2.2.4 ~> 2.2.5]).

## [3.2.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.1] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.0] - 2020-09-28

### BREAK

- Property `placeholderChar`, it is everything have to use `\_`, because mask show in value to input

### Added

- Manage cursor position for `InputMask.Value` with show mask
- Export function `getAfterPositionValue`. It use when need to know where last symbol of value.

### Fixed

- Show mask for `InputMask.Value` when size input less than size mask

## [2.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.0] - 2020-06-18

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.1.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.0.4] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-05

### Fixed

- Исправлена ошибка в типизации `InputMask.Value`

## [1.0.1] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [1.0.0] - 2019-07-26

### Added

- Initial release
