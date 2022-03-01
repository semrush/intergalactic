# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.1.3] - 2022-03-01

### Fixed

- Fixed `viewBox` for `BarChartSkeleton`.

## [3.1.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.1.1] - 2022-02-22

### Fixed

- Added export type for Bubble, ScatterPlot, Venn charts

## [3.1.0] - 2022-01-21

### Added

- Added Bubble and ScatterPlot chart

## [3.0.1] - 2021-10-19

### Fixed

- Fixed typo in ts.

## [3.0.0] - 2021-10-15

### Changed

- Rewrite code from ts to js.

### BREAK

- change default `height` for `Skeleton` from 100px to 100%.
- remove support props `visible, speed` for `Skeleton`.

## [2.3.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.6] - 2020-12-16

### Fixed

- Сomponent has become friendlier to SSR. Replace random generate number to get uid from function `useUID`.

## [2.1.5] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.3] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.1.2] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.1.1] - 2020-07-08

### Added

- Добавлен скелетон для компонента `VennChart`, `VennChartSkeleton`

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.5.2] - 2020-01-28

### Fixed

- Приведены в соответствие имена классов стилей для `semrush` и `sellerly`

## [1.5.1] - 2020-01-27

### Fixed

- Поправили навешивание `className` на `Skeleton.Text`

### Removed

- Убрана возможность указывать размеры в `rem`

## [1.5.0] - 2020-01-24

### Changed

- заменили анимацию градиента на анимацию цвета через `opacity`

## [1.4.0] - 2019-12-27

### Added

- Добавили скелетоны графиков

### Changed

- Заменили `SMIL` анимацию на `CSS`, тем самым оптимизировав потребление CPU

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

## [1.1.1] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.1.0] - 2019-07-12

### Changed

- Ширина и высота вложенного `rect` равны 100% для корректной работы с `viewBox`

## [1.0.3] - 2019-07-01

### Added

- Возможность передать функцию в `children` (`({gradientUrl}) => ()`) для того, чтобы можно было наложить градиент на любой `svg` элемент

## [1.0.2] - 2019-06-14

### Fixed

- Исправлена типизация компонентов

## [1.0.1] - 2019-04-10

### Fixed

- Исправлено отображение в Firefox 🤦‍

## [1.0.0] - 2019-02-21

### Added

- Initial release
