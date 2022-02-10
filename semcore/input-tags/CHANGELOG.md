# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.4.4] - 2021-12-23

### Changed

- Changed `line-height Tag` from 1.2 to 1.1 for correct display in all browsers.

## [2.4.1] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.3.1] - 2021-04-16

### Added

- Added line-height value

## [2.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.2.2] - 2020-11-25

### Fixed

- Fixed cursor position during tag editing

## [2.2.1] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.2.0] - 2020-09-09

### Added

- Added property `editable` in `InputTags.Tag` for called `onRemove` when on click tag

## [2.1.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.1.0] - 2020-08-18

### Added

- [TS] Добавили экспортируемый тип для размеров `InputTagsSize`.

### Fixed

- Поправили отображение для динимически меняющегося `placeholder` для `InputTags.Value`
- Поправили расположение по вертикали для `InputTags.Value`

## [2.0.2] - 2020-08-17

### Fixed

- Поправили установку курсора в поле ввода

## [2.0.1] - 2020-07-15

### Fixed

- Исправлено обрезание box-shadow при фокусе

## [2.0.0] - 2020-06-19

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавлена интеграция с ScrollArea. Теперь можно задавать `h` и `hMax` для появления скролла.

## [1.4.0] - 2020-05-15

### Added

- Вызов функции `onAdd` при вставке данных данных в `InputTags.Value`.

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

## [1.1.0] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [1.0.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.1] - 2019-04-22

### Added

- Initial release
