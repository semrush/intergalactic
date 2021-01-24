# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.3.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.2.3] - 2020-11-25

### Fixed

- Fixed disabled pills styles

## [3.2.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.2.1] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [3.2.0] - 2020-10-13

### Added

- Added alternative api for inserting `Addon`.

## [3.1.0] - 2020-09-30

### Added

- Added generic for better `value` and `onChange` typings

### Changed

- Update @semcore/core version to ^1.8

## [3.0.5] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.4] - 2020-08-16

### Changed

- Добавлен line-height для Addon для корректного выравнивания при использовании текста(например счетчика).

## [3.0.3] - 2020-07-14

### Changed

- Улучшена производительность. Теперь внутренние компоненты не перерендриваються из-за создания новых функций-хендлеров.

## [3.0.2] - 2020-06-10

### Fixed

- Исправлены TS типы

## [3.0.1] - 2020-06-01

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.2.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [2.2.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность опционально подключать адаптивность
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.1.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.0.8] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.0.7] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text`

## [2.0.6] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [2.0.5] - 2019-07-20

### Fixed

- Исправлено описание типов для `Pills.Item`

## [2.0.4] - 2019-07-08

### Fixed

- Исправлены не работающие размеры

## [2.0.3] - 2019-07-05

### Fixed

- Исправлены отступы внутри компонента и цвет текста

## [2.0.2] - 2019-06-03

### Changed

- Обновлена версия `@semcore/button`
- Обновлена версия `@semcore/flex-box`
- Обновлена версия `@semcore/select-of-group`

## [2.0.1] - 2019-02-12

### Fixed

- Фон пилов исправлен с `transparent` на `#fff`
- Проп className на Pill.Item больше не переопределяет класс компонента

## [2.0.0] - 2019-01-18

### BREAK

- Обновлена зависимость от `Button`(Добавлены `Addon`, `Text`)
- Обновлена зависимость от `select-of-group`(убрано рутовое свойство `getSelected`)
- Убрана возможность использовать children как функцию
- Изменен экспорт компонентов

## [1.0.0] - 2018-10-09

### Added

- Initial release
