# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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

### Changed

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
