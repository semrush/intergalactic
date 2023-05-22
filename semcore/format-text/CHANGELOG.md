# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.2.25] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7], `@semcore/flex-box` [4.7.22 ~> 4.7.23]).

## [3.2.24] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6], `@semcore/flex-box` [4.7.21 ~> 4.7.22]).

## [3.2.22] - 2023-04-24

## [3.2.21] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3], `@semcore/flex-box` [4.7.18 ~> 4.7.19]).

## [3.2.10] - 2023-02-09

## [3.2.9] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0], `@semcore/flex-box` [4.7.6 ~> 4.7.7]).

## [3.2.7] - 2023-01-10

## [3.2.6] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2], `@semcore/flex-box` [4.7.3 ~> 4.7.4]).

## [3.2.5] - 2023-01-03

### Fixed

- Fixed css variable design tokens.

## [3.2.4] - 2022-12-21

### Fixed

- Fixed underline for links from the design system.

## [3.2.3] - 2022-12-19

### Fixed

- Fixed syntax css.

## [3.2.2] - 2022-12-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.43.0 ~> 3.44.0], `@semcore/flex-box` [4.7.1 ~> 4.7.2]).

## [3.2.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.2.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.1.5] - 2022-11-30

### Fixed

- Fixed showing types in autocomplete IDE.

## [3.1.4] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.41.0], `@semcore/flex-box` [4.6.3 ~> 4.6.4]).

## [3.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.0.10] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2], `@semcore/flex-box` [4.5.11 ~> 4.5.12]).

## [3.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Changed sizes from m/l/xl to s/m/l

## [2.3.1] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [2.3.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [2.2.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [2.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.1] - 2021-04-16

### Changed

- Resized bullet points in `li`

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-06-22

### Fixed

- Убрано подчеркивание у abbr при наведении.

## [2.0.0] - 2020-04-20

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Changed

- Увеличен отступ параграфов для размера `m` c `8px` до `18px`
- Увеличен отступ параграфов для размера `l` c `12px` до `20px`
- Увеличен отступ параграфов для размера `xl` c `16px` до `24px`
- Изменился цвет по ховеру ссылки, c 16% на 12%
- Отсутпы для параграфов при размере `m` увеличены до `18px`
- Отсутпы для параграфов при размере `l` увеличены до `20px`
- Отсутпы для параграфов при размере `xl` увеличены до `24px`

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

## [1.0.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [1.0.1] - 2019-05-07

### Fixed

- Свойство `size` помечано как не обязательное

## [1.0.0] - 2019-05-07

### Added

- Initial release
