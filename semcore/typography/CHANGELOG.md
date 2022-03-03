# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.4.0] - 2021-03-04

### Added

- Disabled animation if reduce motion is preferred.

## [3.3.2] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.3.1] - 2022-02-22

### Fixed

- Remove css specificity for props lineHeight/fontSize for `Text`.

## [3.3.0] - 2022-01-18

### Changed

- Up version icons and use new icon.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.2.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.2.1] - 2021-08-02

### Fixed

- [ts] correct types.

## [3.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.9] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.8] - 2020-09-16

### Fixed

- Set props `fontSize`, `lineHeight` for component`Text`. Now it independent from prop `size`.
- Problem use prop `noWrap` for `List.Item`. Now text reduce in ellipsis for `<List.Item noWrap>`

## [3.0.7] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.6] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [3.0.5] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [3.0.4] - 2020-08-14

### Fixed

- Исправлены не работающие props `fontSize` и `lineHeight` у компонента `Text`

## [3.0.3] - 2020-06-22

### Fixed

- Убрано подчеркивание у Hint при наведении.

## [3.0.2] - 2020-06-10

### Fixed

- Исправлены TS типы

## [3.0.1] - 2020-06-08

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Added

- Добавили свойство `ellipsis` для компонента `Text`

### Changed

- Изменили цвет `Hint` активного и по ховеру c 16% на 12%

## [2.6.2] - 2020-03-24

### Fixed

- Добавлена пропущенная зависимость `@semcore/flex-box`/`@semcore/icon`

## [2.6.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [2.6.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.5.1] - 2019-12-08

### Fixed

- Получение DOM-ноды через `ref` для всех компоненетов

## [2.5.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.4.5] - 2019-10-24

### Changed

- Поднята зависимость `utils`

## [2.4.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.4.3] - 2019-09-11

### Fixed

- Изменен `span` -> `div` в `List.Item`

## [2.4.2] - 2019-09-05

### Fixed

- Исправлена ошибка в типизации `Hint`
- Заменены устаревшие типографические переменные в `Blockquote`

### Changed

- Размеры шрифта и межстрочного интервала теперь берутся из `style/var.css` утилит

## [2.4.1] - 2019-08-12

### Changed

- Обновлены `utils`
- Улучшена функция оборачивания в `Text` у `Hint`

## [2.4.0] - 2019-07-31

### Added

- У `Text` добавлен сброс отступов

### Fixed

- Исправлена сборка для рендера css на сервере

## [2.3.1] - 2019-06-24

### Fixed

- Исправлена ошибка в типизации компонента Hint

## [2.3.0] - 2019-05-15

### Added

- Добавлен `Hint` компонент

## [2.2.0] - 2019-02-26

### Added

- Добавлено `noWrap` свойство

### Changed

- Обновлена зависимость `paint`

## [2.1.0] - 2019-02-18

### Added

- Добавлено `medium` свойство

### Changed

- Обновлена зависимость `paint`

## [2.0.0] - 2019-02-08

### BREAK

- Удалены компоненты `P`/`H`/`Small`/`UL`/`OL`/`CheckList`
- Удалено свойство `gutterBottom`
- Изменены значения `size` у всех компонентов(0, 2, 3 -> 100, 200, 300)

### Added

- Унаследовано от `Box`/`Print`
- В `List` можно передовать пользовательский маркер

## [1.0.3] - 2018-14-11

### Added

- Размеры `line-height` для `Text`, `CheckList`, `Ol`, `Ul`

## [1.0.2] - 2018-10-09

### Fixed

- Исправлена проблема отображения `CheckList` в production-сборке

## [1.0.1] - 2018-10-09

### Fixed

- Paragraph `m` высота строки исправлена с 1.5 на 1.42

## [1.0.0] - 2018-08-29

### Added

- Component CheckList

## [1.0.0-1] - 2018-08-14

### Added

- Initial release
