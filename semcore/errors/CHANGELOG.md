# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [2.4.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [2.4.1] - 2021-08-04

### Fixed

- [TS] fixed types.

## [2.4.0] - 2021-07-05

### Changed

- Version of dependence `@semcore/core` has been changed to `1.11`.
- Improved performance. Removed one component wrapper.
- The style processing system has been changed.
- Removed the ability to apply media styles via a plugin `babel-plugin-react-semcore`.

## [2.3.0] - 2021-02-20

### Added

- Added support two languages `Korean, Vietnamese`.

## [2.2.0] - 2021-02-15

### Added

- Added supported react@17.

## [2.1.0] - 2020-12-17

### Added

- Added supported react@17.

## [2.0.7] - 2020-10-29

### Fixed

- Added the placeholder for ID style tag to improve collision protection.

## [2.0.6] - 2020-09-08

### Fixed

- Fixed possible styles collisions between components with different versions, but same styles

## [2.0.5] - 2020-09-07

### Fixed

- Flag `sideEffects` now contain list of files with side effects

## [2.0.4] - 2020-09-03

### Fixed

- Added flag `sideEffects: false` to package.json

## [2.0.3] - 2020-06-19

### Fixed

- Исправлена ошибка в обаботчка клика по кнопке компонента `PageError`

## [2.0.1] - 2020-06-18

### Fixed

- Убран некорректный импорт из `widget-empty/src`, ломающий проверку типов `typescript`

## [2.0.0] - 2020-06-17

### BREAK

- Из комопнента `AccessDenied` убраны кнопка `Contact Us` и проперти `contactsLink`
- Обновлена иконка компонента `AccessDenied`
- Обновлен тексты и локализация в компоненте `AccessDenied`
- Из комопнента `PageNotFound` убрана кнопка `Contact Us` и проперти `contactsLink`
- В компонент `ProjectNotFound` добавлена кнопка `Contact Us` и проперти `contactsLink`
- Обновлен текст и локализация компонента `ProjectNotFound`

## [1.3.3] - 2020-02-04

### Fixed

- Исправлен проброс свойства `homeLink` на компонент `AccessDenied`

## [1.3.2] - 2020-01-29

### Added

- Добавилось прокидывание children в дефолтные ошибки

## [1.2.1] - 2020-01-22

### Fixed

- Исправлена не корректная проверка на доступность `document` при клике на рефреш страниицы

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

## [1.0.4] - 2019-09-30

### Changed

- Нужные зависимости перенесены в `utils`, размер должен стать меньше

## [1.0.3] - 2019-09-27

### Fixed

- Уменьшен размер сборки засчет `require('./package.json')`

## [1.0.2] - 2019-09-06

### Added

- Initial release
