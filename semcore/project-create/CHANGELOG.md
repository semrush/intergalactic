# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [5.1.25] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0], `@semcore/modal` [3.0.23 ~> 3.0.24]).

## [5.2.0] - unreleased

### Added

- Added Turkish langauge support.

## [5.1.12] - 2022-08-19

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.12 ~> 4.0.13]).

## [5.1.0] - 2022-06-21

### Changed

- Updated `react-final-form` to `6.5.2` to support React 17.

## [5.0.10] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/button` [4.0.5 ~> 4.0.6], `@semcore/checkbox` [6.0.4 ~> 6.0.5], `@semcore/flex-box` [4.5.4 ~> 4.5.5], `@semcore/icon` [2.26.1 ~> 2.27.0], `@semcore/input` [3.0.4 ~> 3.0.5], `@semcore/modal` [3.0.5 ~> 3.0.6]).

## [5.0.3] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [5.0.2] - 2022-05-18

### Changed

- Version patch update due to children dependencies update (`@semcore/button` [4.0.0 ~> 4.0.1], `@semcore/checkbox` [6.0.0 ~> 6.0.1]).

## [5.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.

## [4.0.8] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0], `@semcore/modal` [2.4.8 ~> 2.4.9]).

## [3.4.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.4.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.3.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.3.1] - 2021-07-12

### Changed

- Updated version `@semcore/spin-container`.

## [3.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.2.0] - 2021-02-20

### Added

- Added support two languages `Korean, Vietnamese`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.0] - 2020-07-14

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавили зависимость от пакета `core`

### Changed

- Обновлен перевод поля `description` локали `es`

## [2.2.2] - 2020-02-27

### Added

- зависимость от `final-form`, потому как она указана в `peerDependencies` для пакета `final-form-focus`

## [2.2.1] - 2020-02-20

### Added

- Добавили португальский язык (`locale="pt"`)

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

## [2.0.1] - 2019-09-30

### BREAK

- Обвнавлен `react-final-form (^4.1 -> ^6.3)`

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.0] - 2019-09-23

### Added

- Initial release
