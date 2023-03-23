# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [1.14.2] - 2023-03-23

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.4 ~> 3.48.0]).

## [1.14.0] - 2023-03-16

### Changed

- Changed logic of merging component styles and context styles due to losing context styles before.

## [1.13.19] - 2023-03-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.47.2 ~> 3.47.3]).

## [1.13.15] - 2023-02-09

## [1.13.14] - 2023-01-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.45.0 ~> 3.46.0]).

## [1.13.12] - 2023-01-10

## [1.13.11] - 2023-01-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.44.1 ~> 3.44.2]).

## [1.13.8] - 2022-12-13

### Changed

- Added `react-dom` to peer dependencies.

## [1.13.7] - 2022-12-12

## [1.13.6] - 2022-11-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.41.0 ~> 3.42.0]).

## [1.13.2] - 2022-10-18

### Fixed

- Fixed calculation children index.

## [1.13.1] - 2022-10-17

### Changed

- Version patch update due to children dependencies update.

## [1.13.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [1.12.0] - 2022-10-04

### Changed

- Changed approach to children index calculation with React parallel rendering.

## [1.11.13] - 2022-10-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.37.1 ~> 3.37.2]).

## [1.11.3] - 2022-02-24

### Added

- Added repository field to package.json file.

## [1.11.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [1.11.1] - 2021-05-11

### Changed

- Extended type for Root

## [1.11.0] - 2021-04-26

### Added

- Added Root type for `babel-plugin-root`.
- Added a new system for processing styles.

## [1.10.0] - 2020-12-28

### Added

- Added support custom enhancement.

## [1.9.0] - 2020-12-17

### Added

- Added supported react@17.

## [1.8.3] - 2020-11-20

### Added

- Add shared types.

## [1.8.2] - 2020-10-14

### Fixed

- fixed wrong path for ES6 build

## [1.8.1] - 2020-10-09

### Fixed

- Fixed transfer of many arguments to handlers

## [1.8.0] - 2020-09-30

### Added

- Added generic type `PropGetterFn` to describe prop-getters

## [1.7.0] - 2020-08-25

### Added

- Добавлена возможность создавать generic-компоненты через `createComponent`

### Fixed

- Исправлена типизация второго аргумента (handlers) render-функций компонентов
- Исправлено объединение prop-getter'ов потомка и родителя в рендер-функциях компонентов

## [1.6.2] - 2020-07-15

### Fixed

- Исправлена типизация children функций у некоторых унаследованных элементов

## [1.6.0] - 2020-07-14

### Added

- Автоматическую установку `data-ui-name` для компонентов созданных через функцию `createBaseComponent`
- Добавлена мемоизация на функции которые начинаются с `bindHandler`, для биндинга значений хендлеров в геттер-функциях

## [1.5.0] - 2020-07-10

### Added

- Добавлено автоматическое расширение контекста рутового компонента контекстом дочерних

## [1.4.2] - 2020-06-24

### Fixed

- Исправлено получение унаследованного контекста у дочерних компонентов

## [1.4.1] - 2020-06-22

### Fixed

- Исправлены названия у геттер функции для дочерних компонентов, теперь их можно взять по имени родителя + свое имя, например getInputAddonProps.

## [1.4.0] - 2020-06-19

### Added

- Добавлена возможность у инстанса класса взять свой экземпляр созданный через `createComponenta`.

## [1.3.2] - 2020-06-10

### Fixed

- Исправлена получение текущего контекста у унаследованных компонентов

## [1.3.1] - 2020-06-10

### Fixed

- Исправлена типизация ф-ции `createComponent`

### Added

- Добавлен тип `MergeGetters` для расширения типов проп-геттеров

## [1.1.0] - 2020-06-02

### Added

- Добавлен статический метод для создания новых инстансов компонентов

## [1.0.2] - 2020-06-01

### Fixed

- Исправлена проблема SSR, при которой использовался `useLayoutEffect`.

## [1.0.1] - 2020-05-28

### Added

- Публикация стабильной версии

## [0.0.1-14] - 2020-05-19

### Changed

- Изменено свойство с `css` на `styles`

## [0.0.1-13] - 2020-05-19

### Changed

- Изменен метод рендера core компонентов при передаче их как статичный метод в другие компоненты
- Теперь в Root компоненте children не вставляется если Children.origin пуст

## [0.0.1-12] - 2020-05-13

### Fixed

- Исправлен тип `Root`
- Оптимизирован создание объекта в `context`
- Оптимизирован создание ref ссылок

## [0.0.1-11] - 2020-04-23

### Changed

- Теперь `styles` нельзя перетереть из пропсов
- Теперь `Children` нельзя передать сверху

### Added

- Добавлено предупреждение при вызове геттеров внутри статичных компонентов
- Добавлена уникальность `INHERITED_NAME`

## [0.0.1-10] - 2020-04-21

### Added

- Добавлена возможность указывать массивы при создании компонентов в статичных чилдренах

## [0.0.1-9] - 2020-04-20

### Changed

- Убран `styledEnhance`
- Оптимизирован алгоритм применения стилей

## [0.0.1-8] - 2020-04-17

### Changed

- Рутовый компонент не вызывает getter функции из контекста

## [0.0.1-7] - 2020-04-16

### BREAK

- Изменен третий аргумент в `createComponent`. Теперь он принимает объект с настройками.
- Контекст можно получить через символ `CONTEXT`, а не как статичный метод context.

## [0.0.1-6] - 2020-04-10

### Added

- Добавлен тип `Merge`
- Исправлена типизация `createComponent`

## [0.0.1-5] - 2020-04-08

### Changed

- `styledEnhance` теперь считается устаревшим, используйте `static style = style;`.

## [0.0.1-4] - 2020-04-02

### Added

- Добавлена возможность переименовывать hoist свойства

### Changed

- Изменился алгоритм сохранения в `register`

## [0.0.1-3] - 2020-03-30

### Changed

- Заменена внутренняя реализация фейкового `this` для функции
- Помечен тип Root как обязательное свойство в функциональных компонентах
- Добавлена утилита `register`, для шаринга данных между пакетами

## [0.0.1-1] - 2020-03-26

### Changed

- Поднята версия `utils`

## [0.0.1-0] - 2020-03-24

### Added

- Beta release
