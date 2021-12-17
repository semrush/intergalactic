# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.5.1] - 2021-12-17

### Added

- Added primary-muted theme

## [3.5.0] - 2021-12-08

### Added

- Added property for Tag color

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
