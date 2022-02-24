# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.0.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.0.0] - 2021-08-27

### Changed

- Changed animation `Dot` to `@semcore/animation`.

### Removed

- removed deprecated property `invisible`.

## [2.2.3] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.2.2] - 2021-06-29

### Fixed

- Fixed animation `Dot`.

## [2.2.1] - 2021-06-08

### Changed

- Rewrite code from TS to JS 🧑‍💻
- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

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

## [1.0.6] - 2019-10-09

### Fixed

- Увеличен паддинг в размере xl

## [1.0.5] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.4] - 2019-05-14

### Fixed

- Осправленна анимация при появлении в режиме `up`

## [1.0.2] - 2019-05-14

### Fixed

- Отображение `Dot` со счетчиком

## [1.0.1] - 2019-02-21

### Changed

- `line-height` для текста внутри компонента

## [1.0.0] - 2019-02-13

### Added

- свойство `up` для отображение компонента в верхнем-правом углу
- анимацию при появлении и скрытии компонента

### Changed

- изменили размера ['m', 's'] -> ['m', 'l']

## [1.0.0-0] - 2018-12-26

### Added

- Initial release
