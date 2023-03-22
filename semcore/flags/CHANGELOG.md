# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.4.5] - 2023-03-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.3 ~> 3.47.4]).

## [3.4.2] - 2023-03-01

### Fixed

- European Union flag with 2x size was fixed again and never again :D.

## [3.4.1] - 2023-03-01

### Fixed

- European Union flag with 2x size was fixed.

## [3.4.0] - 2023-02-28

### Added

- New European Union flag has been added to the set.

## [3.3.11] - 2023-02-21

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.0 ~> 3.47.1]).

## [3.3.9] - 2023-02-09

## [3.3.8] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [3.3.6] - 2023-01-10

### Fixed

- Fixed internal imports after babel transformation were causing "named import from json" errors in some bundlers.

## [3.3.4] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [3.3.1] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [3.3.0] - 2022-12-12

### Added

- Design tokens based theming.

## [3.2.4] - 2022-12-05

### Fixed

- Fixed exporting `iso2Name`, `iso3iso2` and `nameWithoutIso` because of linter warnings.

## [3.2.3] - 2022-12-02

### Added

- Added missed object `iso3iso2` in `index.d.ts` for exporting.

## [3.2.2] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/flex-box` [4.6.4 ~> 4.6.5], `@semcore/utils` [3.41.0 ~> 3.42.0]).

## [3.2.0] - 2022-11-23

### Changed

- Fixed few countries flag displaying.
- Removed North Ireland flag as far as image of North Ireland flag was always missing in repository and random image was displayed instead.

## [3.1.3] - 2022-10-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.40.0 ~> 3.40.0]).

## [3.1.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.0.12] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [3.0.11] - 2022-09-15

### Added

- Added access to flags that don't have ISO code.

### Fixed

- Fixed flag name return type.

## [3.0.10] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1]).

## [3.0.9] - 2022-08-25

### Added

- Added `aria-label` attribute for better accessibility.

## [3.0.8] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.36.0 ~> 3.37.0]).

## [3.0.6] - 2022-08-09

### Fixed

- Fixed broken display of Cote d'Ivoire's flag.
- Fixed broken display of United States Minor Outlying Islands' flag.

## [3.0.5] - 2022-07-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.34.0 ~> 3.35.0]).

## [3.0.0] - 2022-05-17

### BREAK

- Changed size flags from 14x11 to 16x16.

## [2.2.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2]).

## [2.2.4] - 2022-02-25

### Added

- Added repository field to package.json file.

## [2.2.2] - 2021-09-09

### Fixed

- [ts] correct types.

## [2.2.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.4] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.3] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.2] - 2020-06-05

### Changed

- Поправили отображения флага `Saint Pierre and Miquelon`

## [2.0.1] - 2020-06-04

### Changed

- Поправил выранивание заглавных букв для заглушек флагов

## [2.0.0] - 2020-05-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Заглушка для отсутствующих стран, берутся первые заглавные буквы(максимум 2 символа).

## [1.4.3] - 2020-05-19

### Added

- Добавлен iso2-код для `Saint Pierre and Miquelon`
- Добавлен iso2-код для `North Korea`

## [1.4.2] - 2020-02-19

### Fixed

- Исправлен iso2-код для Saint Vincent And The Grenadines

## [1.4.1] - 2020-02-11

### Fixed

- Исправлено отображение стран с пробелами в названиях для iso2 и iso3

### Added

- Добавлен iso3-код для `Netherlands Antilles`

## [1.4.0] - 2020-02-11

### Fixed

- Имена стран теперь можно передавать, как с пробелами так и без них

### Changed

- Имена стран в объекте `iso2Name` теперь храняться с пробелами

## [1.3.3] - 2020-02-03

### Added

- добавили соответствующий флаг для `Macao`

## [1.3.2] - 2020-02-03

### Added

- добавили iso-код и соответствующий флаг для `United States Minor Outlying Islands`

## [1.3.1] - 2020-02-03

### Fixed

- перезаллили файлы для флагов

## [1.3.0] - 2020-02-03

### Added

- добавили iso-код и соответствующий флаг для `British Indian Ocean Territory`
- добавили iso-код и соответствующий флаг для `British Virgin Islands`
- добавили iso-код и соответствующий флаг для `Bonaire, Sint Eustatius and Saba`
- добавили iso-код и соответствующий флаг для `Bouvet Island`
- добавили iso-код и соответствующий флаг для `Cocos Islands`
- добавили iso-код и соответствующий флаг для `Republic of the Congo`
- добавили iso-код и соответствующий флаг для `Curacao`
- добавили iso-код и соответствующий флаг для `French Guiana`
- добавили iso-код и соответствующий флаг для `Guadeloupe`
- добавили iso-код и соответствующий флаг для `Heard Island and McDonald Islands`
- добавили iso-код и соответствующий флаг для `Kosovo`
- добавили iso-код и соответствующий флаг для `SintMaarten`
- добавили iso-код и соответствующий флаг для `South Sudan`
- добавили iso-код и соответствующий флаг для `Svalbard and Jan Mayen`
- добавили iso-код и соответствующий флаг для `United States Virgin Islands`

## [1.2.1] - 2019-12-13

### Fixed

- Исправлена проблема с отображением флагов

## [1.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.1.0] - 2019-12-12

### Added

- Добавлен флаг Reunion

### Changed

- Изменился способ доставки спрайтов, теперь они берутся как png, а не base64

## [1.0.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.2] - 2019-09-27

### Fixed

- Уменьшен размер сборки засчет `require('./package.json')`

## [1.0.1] - 2019-06-07

### Added

- импорт стран в формате `iso2 -> name` (`iso2Name`), `iso3 -> iso2` (`iso3iso2`)

## [1.0.0] - 2019-04-05

### Added

- Initial release
