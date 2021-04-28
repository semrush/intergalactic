# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.7.0] - 2021-04-28

### Added

- Added support accessibility.

## [2.6.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.5.2] - 2021-04-20

### Fixed

- Fixed calculate size for `Tabline.Item` when value don't change.

## [2.5.1] - 2021-04-16

### Changed

- Changed line-height value

## [2.5.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.4.0] - 2020-12-09

### Added

- Added `ResizeObserver` for update style tab when used dynamic data.

### Fixed

- Uptimize animation change position active tab.

## [2.3.3] - 2020-11-06

### Fixed

- Fixed set indicator for `Tabline.Item` wrapped `Tooltip`.

## [2.3.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.3.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [2.3.0] - 2020-10-13

### Added

- Added alternative api for inserting `Addon`.

## [2.2.0] - 2020-09-30

### Added

- Added generic for better `value` and `onChange` typings

### Changed

- Update @semcore/core version to ^1.8

## [2.1.0] - 2020-09-18

### Added

- Animation for change position active `Tab`.

## [2.0.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.3] - 2020-07-14

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [2.0.2] - 2020-06-22

### Fixed

- Исправлен line-height для корректного отображения Addon-ов

## [2.0.1] - 2020-06-10

### Fixed

- Исправлены TS типы

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

## [1.0.6] - 2019-10-16

### Fixed

- `Tabpanel.Item` исправлена перезапись `className` компонента

## [1.0.5] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.4] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text`

## [1.0.3] - 2019-07-31

### Fixed

- Исправлен ts тип для `Item`

## [1.0.2] - 2019-07-05

### Removed

- Зависимость от `@semcore/control`

## [1.0.1] - 2019-06-03

### Changed

- Обновлена версия `@semcore/control`

## [1.0.0] - 2019-05-20

### Added

- Добавлено свойство `underlined`

### BREAK

- Удалено свойство `theme`
- Изменены размеры в соответствии с типографикой

## [1.0.0-1] - 2019-02-13

### Added

- Initial release
