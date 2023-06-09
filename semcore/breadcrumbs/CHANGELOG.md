# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.5.1] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2], `@semcore/icon` [3.14.16 ~> 3.15.0]).

## [4.5.0] - 2023-06-09

### Added

- Polish (`pl`) locale support.

## [4.4.36] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1]).

## [4.4.35] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [4.4.34] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [4.4.33] - 2023-05-24

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.0 ~> 3.51.1]).

## [4.4.32] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [4.4.31] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [4.4.30] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [4.4.28] - 2023-04-24

## [4.4.27] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

## [4.4.16] - 2023-03-01

## [4.4.15] - 2023-02-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.12.0 ~> 3.13.0]).

## [4.4.14] - 2023-02-22

## [4.4.13] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1]).

## [4.4.10] - 2023-02-13

## [4.4.9] - 2023-02-09

### Fixed

- Fixed hovered state color.

## [4.4.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/icon` [3.7.0 ~> 3.8.0]).

## [4.4.6] - 2023-01-19

### Fixed

- Removed font-family enforcement.

## [4.4.5] - 2023-01-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [4.4.0] - 2022-12-14

### Added

- Added internationalization of aria attributes.

## [4.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [4.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [4.2.6] - 2022-11-08

## [4.2.5] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0], `@semcore/icon` [3.1.1 ~> 3.1.2]).

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [4.1.10] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [4.1.0] - 2022-08-10

### Changed

- Added essential `aria-\*` attributes.

## [3.0.10] - 2022-07-25

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.29.1 ~> 2.29.2]).

## [3.0.6] - 2022-06-10

### Fixed

- Fixed separator's margin.

## [3.0.5] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/icon` [2.26.1 ~> 2.27.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.Updated styles according to library redesign policy.
- Increased gap between elements to match planned design.

## [2.6.5] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [2.6.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.6.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [2.5.0] - 2021-11-22

### Changed

- Rewrite code from TS to JS

## [2.4.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.1] - 2021-08-24

### Fixed

- Fixed style separator when a custom font-size.

## [2.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.3.0] - 2021-03-23

### Fixed

- Added `aria-label` for `Breadcrumbs`.
- Changed default tag `li` to `div` for wrap separator in `Breadcrumbs.Item`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.1] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.0] - 2020-09-24

### Fixed

- Remove set css property `max-width` for `Breadcrumbs.Item`

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-06-10

### Fixed

- Исправлены TS типы

## [2.0.0] - 2020.06.03

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.0.4] - 2019-10-08

### Changed

- Обноdвился `separated-list`, теперь не обязательно указывать для последнего элемента `disableSeparator`

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-05

### Fixed

- Исправлены ошибки типизации `Breadcrumbs.Item`

## [1.0.1] - 2019-05-30

### Changed

- Цвет разделителя заменен на \$gray60

## [1.0.0] - 2019-05-30

### Added

- Initial release
