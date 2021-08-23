# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [3.2.2] - 2021-08-23

### Fixed

- [TS] Fixed type `onChange` for `ITextareaProps`.

## [3.2.1] - 2021-06-16

### Changed

- [TS] Rewrite code from TS to JS.

## [3.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [3.1.1] - 2021-01-20

### Fixed

- Updated padding to be better ☺️

## [3.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.0.2] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [3.0.1] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [3.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

## [2.5.2] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [2.5.1] - 2019-12-16

### Fixed

- Исправлено автоматическое изменение размера при изменении `value`, раньше изменялось только на `onChange`

## [2.5.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [2.4.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [2.3.0] - 2019-10-14

### Added

- Добавлен `forwardRef` на компонент

## [2.2.4] - 2019-10-08

### Fixed

- Исправлен вызов передаваемого `onChange`, теперь он не перетирает внутренную реализацию

## [2.2.3] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [2.2.2] - 2019-09-27

### Fixed

- Добавлено пропущенное свойство `resize=none`

## [2.2.1] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

## [2.2.0] - 2019-07-05

### Added

- Добавлена возможность автоматического увеличения поля ввода в зависимости от количества введенного текста
- Добавлены свойства `minRows` и `maxRows` для

## [2.1.0] - 2019-06-24

### Added

- Компонент обернут в HOC `EnhancedWithAutoFocus`

## [2.0.2] - 2019-05-31

### Added

- Добавлено css-свойство `font-family: inherit;`

## [2.0.2] - 2019-03-11

### Fixed

- Исправлен TS тип с `React.HTMLAttributes` -> `React.TextareaHTMLAttributes`

## [2.0.0] - 2019-01-18

### BREAK

- Убран компонент `Autosize`
- Убрано свойство `fullWidth`
- Убрано свойство `inputRef`
- Убрано свойство `focused`
- Добавлено свойство css `width: 100%;`

### Added

- Компонент унаследован от `Box`

## [1.1.0] - 2018-12-26

### Added

- Автокомплит для IDE
- Исходники включены в сборку

### Fixed

- Баг с дублированием пропов на внутренности компонента

### Removed

- Внутренний label компонента

## [1.0.0] - 2018-09-17

### Removed

- Отображение контента в `label`
- Отображение лимитов

## [1.0.0-1] - 2018-09-10

### Added

- Initial release
