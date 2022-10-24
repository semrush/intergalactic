# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.2.3] - 2022-10-24

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [3.0.2 ~> 3.1.0]).

## [4.2.0] - 2022-10-10

### Changed

- Added support for React 18 🔥
- Extended version range for dependency `@semcore/icons`.

## [4.1.6] - 2022-10-06

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.32.2 ~> 2.33.0]).

## [4.1.1] - 2022-09-07

### Fixed

- Enforced inner text font line height to prevent possible bottom cut.

## [4.1.0] - 2022-09-05

### Added

- Added screen reader support

## [4.0.17] - 2022-08-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.0 ~> 3.37.1], `@semcore/icon` [2.30.1 ~> 2.30.2], `@semcore/flex-box` [4.5.10 ~> 4.5.11]).

## [4.0.16] - 2022-08-24

### Fixed

- Update version `@semcore/utils` to use additional color changing functions.

## [4.0.15] - 2022-08-18

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.30.0 ~> 2.30.1]).

## [4.0.6] - 2022-06-07

### Fixed

- Fixed non default colors resolving.

## [4.0.5] - 2022-06-02

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.32.2 ~> 3.33.0], `@semcore/icon` [2.26.1 ~> 2.27.0], `@semcore/flex-box` [4.5.4 ~> 4.5.5]).

## [4.0.0] - 2022-05-17

### BREAK

- Updated styles according to the library redesign policy.
- Set `primary` as default component theme.

### Added

- Added `additional` theme.

## [3.7.3] - 2022-05-16

### Changed

- Version patch update due to children dependencies update (`@semcore/icon` [2.21.0 ~> 2.24.0]).

## [3.7.0] - 2022-03-18

### Fixed

- Fixed previously lost overflowed text ellipsis.

## [3.6.5] - 2022-03-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.31.2 ~> 3.31.2], `@semcore/icon` [2.19.3 ~> 2.19.4], `@semcore/flex-box` [4.5.0 ~> 4.5.1]).

## [3.6.4] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.6.3] - 2022-02-22

### Fixed

- Fixed colors for `primary-warning`.

## [3.6.2] - 2022-01-18

### Fixed

- Tag text vertical cut in some rare cases.

## [3.6.0] - 2022-01-18

### Changed

- Up version icons and use new icon.

## [3.5.4] - 2021-12-28

### Fixed

- [ts] Added type `custom` in property `use`.

## [3.5.3] - 2021-12-23

### Changed

- Changed `line-height` from 1.2 to 1.1 for correct display in all browsers.

## [3.5.2] - 2021-12-17

### Fixed

- Fixed hover for non-interactive tag

## [3.5.1] - 2021-12-17

### Added

- Added primary-muted theme

## [3.5.0] - 2021-12-08

### Added

- Added property for Tag color

### Changed

- Changed the opacity of the Tag color from 0.15 to 0.5.

## [3.4.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.4.1] - 2021-07-30

### Added

- Added line-height value

## [3.4.0] - 2021-06-22

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.
- Rewrite from TS to JS code.

## [3.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.2.0] - 2020-11-05

### Added

- Added new warning theme

## [3.1.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.1.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [3.1.0] - 2020-10-13

### Added

- Added alternative api for inserting `Addon`.

### Changed

- Removed `neighbor-location` package dependency

## [3.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.1] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

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

## [2.0.5] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.0.4] - 2019-09-13

### Fixed

- Пользовательский цвет фона при состоянии active стал такой же как и при hover

## [2.0.3] - 2019-09-05

### Fixed

- Исправлена ошибка в типизации `Tag.BoxWithNeighborLocation`

## [2.0.2] - 2019-08-29

### Fixed

- Исправлено отображение для `size="m"`, текст больше не обрезается снизу

## [2.0.1] - 2019-04-19

### Added

- текст в `Tag.Text` сворачивается в `ellipsis`

## [2.0.0] - 2019-03-21

### Added

- компонет `Tag.Text`
- стили для отображения `theme="invert" use="secondary"`

### Changed

- задание катомного цвета на `theme="нужный вам цвет"`

### Removed

- поддержку свойства `loading`
- компонет `Tag.Mask`

## [1.0.1] - 2019-02-27

### Changed

- Подняли версию @semcore/typography
- Добавили исходники в сборку

## [1.0.0] - 2018-12-19

### Fixed

- Исправлен баг покраски компонента через свойства `bg` и `color`

## [1.0.0-1] - 2018-11-22

### Added

- Initial release
