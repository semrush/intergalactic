# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.2.1] - 2021-08-18

### Fixed

- Changed height of the inner real input to fix horizontal display with adjacent elements.

## [2.2.0] - 2021-04-26

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.1.3] - 2021-04-16

### Changed

- Changed line-height value

## [2.1.2] - 2021-01-28

### Fixed

- Fixed type of second argument(event) for `onChange` prop

## [2.1.1] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.3] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.2] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.1] - 2020-07-13

### Changed

- Теперь z-index изменяется на +1 при фокусе, для правильного отображения бордера с соседними элементами.

## [2.0.0] - 2020-05-29

### BREAK

- Изменения описаны в [migration guide](/internal/migration-guide)

### Changed

- Изменился цвет Addon по ховеру, c 16% на 12%

## [1.7.1] - 2020-02-13

### Fixed

- Переименовали сбилженные файлы с 'sm.style.css' -> 'style.css'

## [1.7.0] - 2020-02-12

### Added

- Добавлена тема `sellerly`, фокус у контрола по умолчанию цвета `light-ultramarine`

## [1.6.2] - 2020-02-04

### Fixed

- `ref` компонента `Input` теперь возвращает ноду, а не инстанс класса

## [1.6.1] - 2019-12-17

### Fixed

- Исправлен транспайл цветовых переменных для стилей без префиксов (build.css)

## [1.6.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивноссть
- Появилась возможность изолировать стили даже в пределах одной страницы

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [1.5.2] - 2019-11-28

### Changed

- переписан `Input.Value` на функцию с пробросом `ref`

## [1.5.1] - 2019-11-25

### Fixed

- Исправлен тип `size` для `Input.Value`

## [1.5.0] - 2019-11-14

### Added

- Добавлена адаптивность на маленьких экранах(<768px)

## [1.4.0] - 2019-10-11

### Added

- Добавлен `forwardRef` на компонент

## [1.3.2] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.3.1] - 2019-08-21

### Fixed

- Исправлено отображение бордеров инпута при автозаполнении.

## [1.3.0] - 2019-08-07

### Added

- Добавлен `disabled` для `<Input.Addon/>`

## [1.2.4] - 2019-07-31

### Fixed

- Исправлена сборка для рендера css на сервере

### Changed

- Добавлен `line-height: 1;` для `Input.Value`

## [1.2.3] - 2019-07-05

### Fixed

- Убрана специфика у классов размера у `Addon`

## [1.2.2] - 2019-07-05

### Fixed

- Привели цвет placeholdre'a в соответствие с макетом

## [1.2.1] - 2019-06-25

### Changed

- Обновлена версия `@semcore/utils`

## [1.2.0] - 2019-06-24

### Fixed

- Исправлены ошибки в типизации
- Испавлен цвет disable placeholdre'a с gray70 на gray20 с .3 alpha

### Added

- `Input.Value` обернут в HOC `EnhancedWithAutoFocus`

### Changed

- Изменен цвет интерактивного аддона с `gray70` на `stone`
- Изменен цвет hover'a интерактивного аддона с `gray70 .3 alpha` на `stone .3 alpha`

## [1.1.1] - 2019-06-03

### Added

- Добавлено css-свойство `font-family: inherit;`

## [1.1.0] - 2019-05-14

### Added

- Добавлен `vertical-align: middle` для выравнивания с другими элементами формы

## [1.0.5] - 2019-04-01

### Fixed

- Исправлена не корректная верстка при использовании Addon для Firefox

## [1.0.4] - 2019-03-29

### Fixed

- Исправлены отступы у `Input.Addon`

## [1.0.3] - 2019-03-15

### Fixed

- Исправлено наследование интерфейса `Input.Addon`

## [1.0.2] - 2019-03-15

### Fixed

- стили для `Input.Addon`

## [1.0.1] - 2019-02-26

### Fixed

- Исправлена проблема с z-index

## [1.0.0] - 2019-01-18

### Added

- Initial release
