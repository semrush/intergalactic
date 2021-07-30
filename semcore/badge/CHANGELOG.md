# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.3.1] - 2021-07-30

### Changed

- Changed line-height value

## [2.3.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.2.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.1.5] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.1.4] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.3] - 2020-07-13

### Fixed

- Исправили проблему отображения текста внутри компонента на 1px ниже в FF.

## [2.1.2] - 2020-06-30

### Fixed

- Исправили проблему некорректного отображения компонента, при наследовании `line-height`. Заменили `height: 12px` на `line-height: 1.2em`

## [2.1.1] - 2020-06-24

### Fixed

- Добавилась высота компонента, теперь он корректно отображается.

## [2.1.0] - 2020-06-22

### Changed

- Изменился шрифт внутри компонента с `PFLink` на `Ubuntu`, компонент изменился по высоте с 11px до 13px.

## [2.0.0] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [1.5.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.4.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.3.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.3.1] - 2019-07-31

### Fixed

- Добавлены ts типы от унаследованного `Paint`
- Исправлена сборка для рендера css на сервере

## [1.3.0] - 2019-02-18

### Changed

- Обновлена версия `paint`

## [1.2.0] - 2019-02-05

### Added

- Унаследовано от `Box`

### Changed

- Обновленны зависимости `paint`/`utils`

## [1.1.1] - 2018-11-23

### Fixed

- Исправлен autocomplete для IDE

## [1.1.0] - 2018-11-23

### Changed

- Подняли версию "@semcore/paint"

## [1.0.0] - 2018-11-22

### Added

- Initial release
