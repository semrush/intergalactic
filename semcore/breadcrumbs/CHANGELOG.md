# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.2.2] - 2022-10-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.39.0 ~> 3.39.1]).

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
