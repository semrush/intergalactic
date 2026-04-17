# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [17.0.1] - 2026-04-16

### Fixed

- Build processing to correct extract styles.

## [17.0.0] - 2026-04-15

### BREAK

- New major version.
- Removed `WithI18n`. Use `useI18n`.
- Removed `WithCSS`. Use `useCss`.
- Removed `WithAutoFocus` and `autoFocusEnhance`.
- Removed `WithKeyboardFocus`. Just don't use.
- Removed `WithRef`. Use `useForkRef`.

## [16.5.2] - 2026-04-01

### Changed

- Moved css-variables to separate package - `@semcore/theme`.

### Fixed

- Prevent `body` pollution in `usePreventScroll`.

## [16.5.1] - 2025-10-30

### Fixed

- Unnecessary calculations in `sstyled` wrapper.

## [16.5.0] - 2025-10-03

### Changed

- Values for `keyboard-focus` tokens.
- Inverted outline token moved from keyboard-focus group to keyboard-focus-invert group: `keyboard-focus-outline-invert` changed to `keyboard-focus-invert-outline` for consistency.
- Grouping for `keyboard-focus` tokens in the design json files.

## [16.4.0] - 2025-09-20

### Added

- Ability to use two tags in `tag` property. First for some logic like `Ellipsis` or `Select.Trigger` and second for real `html` tag.

## [16.3.1] - 2025-09-12

### Changed

- Prevent scroll on focus by mouse interaction.

## [16.3.0] - 2025-09-08

### Added

- New group of tokens for our `Illustration` component.

## [16.2.0] - 2025-09-03

### Added

- New tokens for secondary button from the `feature-highlight` package.

### Fixed

- Some inconsistencies and missing tokens/descriptions in `dark.json`.

## [16.1.1] - 2025-08-29

### Changed

- FocusLock work when popper opened without focus and trigger has few focusable elements.

## [16.1.0] - 2025-07-24

### Added

- New tokens for FeaturePopover's new theme styles: `feature-popover-bg`, `feature-popover-bg-neutral`, `feature-popover-dot-neutral`, `feature-popover-dot-neutral-outer-border`.

## [16.0.4] - 2025-07-07

### Added

- `featureHighlight` tokens to dark.json.
- `newInstance` method for create new component instances from the existing.

## [16.0.3] - 2025-07-02

### Added

- `useScrollBarWidth` hook.
- Container focus if there aren't focusable children while `autoFocus='enforced'`

## [16.0.2] - 2025-06-23

### Added

- `focusVisible` option to `setFocus` util method with value from last interaction type.

## [16.0.1] - 2025-06-16

### Added

- Tokens from basic palette to themed .css files.

### Changed

- Value for `--intergalactic-sidebar-nav-control-hover` token (was updated to match gray palette) and fixed lightness for `--intergalactic-violet-dusty-50` token.

## [16.0.0] - 2025-05-19

### Added

- `utils` functions as part of Core.
- `LastInteractionType` class to check last interaction was from keyboard or mouse.

### Fixed

- Return type for `findComponent` util. It could be only `ReactElement` or `undefined`.

## [2.39.4] - 2025-05-13

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.4 ~> 4.48.5]).

## [2.39.3] - 2025-05-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.2 ~> 4.48.4]).

## [2.39.2] - 2025-04-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.1 ~> 4.48.2]).

## [2.39.1] - 2025-03-20

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.48.0 ~> 4.48.1]).

## [2.39.0] - 2025-02-21

### Added

- Build for ESM.

## [2.38.1] - 2025-02-05

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.45.0 ~> 4.45.1]).

## [2.38.0] - 2025-02-03

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.44.1 ~> 4.45.0]).

## [2.37.1] - 2024-12-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.44.0 ~> 4.44.1]).

## [2.37.0] - 2024-11-29

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.43.3 ~> 4.44.0]).

## [2.36.2] - 2024-11-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.2 ~> 4.43.3]).

## [2.36.1] - 2024-11-08

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.43.0 ~> 4.43.2]).

## [2.36.0] - 2024-11-01

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.42.0 ~> 4.43.0]).

## [2.35.0] - 2024-10-28

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.41.0 ~> 4.42.0]).

## [2.34.0] - 2024-10-18

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.39.0 ~> 4.41.0]).

## [2.33.0] - 2024-10-11

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.38.0 ~> 4.39.0]).

## [2.32.0] - 2024-10-04

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.36.2 ~> 4.38.0]).

## [2.31.1] - 2024-09-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.36.0 ~> 4.36.2]).

## [2.31.0] - 2024-09-20

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.35.0 ~> 4.36.0]).

## [2.30.0] - 2024-09-06

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.32.2 ~> 4.35.0]).

## [2.29.2] - 2024-08-05

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.1 ~> 4.32.2]).

## [2.29.1] - 2024-07-30

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.32.0 ~> 4.32.1]).

## [2.29.0] - 2024-07-26

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.31.0 ~> 4.32.0]).

## [2.28.0] - 2024-07-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.30.0 ~> 4.31.0]).

## [2.27.0] - 2024-06-26

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.29.0 ~> 4.30.0]).

## [2.26.0] - 2024-06-13

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.28.2 ~> 4.29.0]).

## [2.25.2] - 2024-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.1 ~> 4.28.2]).

## [2.25.1] - 2024-05-28

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.28.0 ~> 4.28.1]).

## [2.25.0] - 2024-05-23

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.27.0 ~> 4.28.0]).

## [2.24.0] - 2024-05-22

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.26.2 ~> 4.27.0]).

## [2.23.1] - 2024-05-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.26.1 ~> 4.26.2]).

## [2.23.0] - 2024-05-17

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.25.0 ~> 4.26.1]).

## [2.22.0] - 2024-05-16

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.23.2 ~> 4.24.0]).

## [2.20.2] - 2024-04-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.1 ~> 4.23.2]).

## [2.20.1] - 2024-04-16

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.23.0 ~> 4.23.1]).

## [2.20.0] - 2024-04-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.22.2 ~> 4.23.0]).

## [2.19.2] - 2024-04-10

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.1 ~> 4.22.2]).

## [2.19.1] - 2024-04-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.22.0 ~> 4.22.1]).

## [2.19.0] - 2024-03-27

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.21.1 ~> 4.22.0]).

## [2.18.1] - 2024-03-26

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [4.21.0 ~> 4.21.1]).

## [2.18.0] - 2024-03-15

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.20.5 ~> 4.21.0]).

## [2.17.5] - 2024-03-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.4 ~> 4.20.5]).

## [2.17.4] - 2024-03-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.3 ~> 4.20.4]).

## [2.17.3] - 2024-02-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.2 ~> 4.20.3]).

## [2.17.2] - 2024-02-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.1 ~> 4.20.2]).

## [2.17.1] - 2024-02-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.20.0 ~> 4.20.1]).

## [2.17.0] - 2024-02-01

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.19.1 ~> 4.20.0]).

## [2.16.1] - 2024-02-01

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.19.0 ~> 4.19.1]).

## [2.16.0] - 2024-01-31

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.18.0 ~> 4.19.0]).

## [2.15.0] - 2024-01-19

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.17.0 ~> 4.18.0]).

## [2.14.0] - 2024-01-19

### Added

- `wrapIntergalacticComponent` utility for wrapping components.

## [2.13.1] - 2024-01-10

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.16.0 ~> 4.16.2]).

## [2.13.0] - 2023-12-22

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.15.1 ~> 4.16.0]).

## [2.12.1] - 2023-12-14

### Fixed

- Internal types in `Component`.

## [2.12.0] - 2023-11-29

### Changed

- Renamed type `RemoveFields` to `EfficientOmit` and moved it into `InternalTypings`. For INTERNAL usage only. Don't use it.

## [2.11.0] - 2023-12-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.13.0 ~> 4.14.0]).

## [2.10.0] - 2023-11-24

### Changed

- Types for `abstract class RootComponent`.

## [2.9.2] - 2023-11-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.2 ~> 4.10.3]).

## [2.9.1] - 2023-11-09

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.10.1 ~> 4.10.2]).

## [2.9.0] - 2023-11-06

### Fixed

- Fixed components CSS output of complex selectors.

## [2.8.0] - 2023-10-27

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.8.4 ~> 4.9.0]).

## [2.7.7] - 2023-10-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.3 ~> 4.8.4]).

## [2.7.6] - 2023-10-16

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.2 ~> 4.8.3]).

## [2.7.5] - 2023-10-06

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.1 ~> 4.8.2]).

## [2.7.4] - 2023-10-03

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.8.0 ~> 4.8.1]).

## [2.7.3] - 2023-10-02

### Changed

- Improved core component typings flexibility

## [2.7.2] - 2023-09-20

### Fixed

- Release doesn't contain any meaningful changes but contains inner dependencies fixes required by the previous release.

## [2.7.1] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.7.0 ~> 4.7.1]).

## [2.7.0] - 2023-09-13

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.6.3 ~> 4.7.0]).

## [2.6.3] - 2023-09-12

### Fixed

- Fixed `locale` propagation in complex components.

## [2.6.2] - 2023-09-08

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.6.1 ~> 4.6.2]).

## [2.6.1] - 2023-09-05

### Fixed

- Functional component default props warnings from the nextjs.

## [2.6.0] - 2023-09-04

### Changed

- Core types compilation speed up.

## [2.4.1] - 2023-08-24

### Changed

- Version prepatch update due to children dependencies update (`@semcore/utils` [4.4.0 ~> 4.4.1]).

## [2.4.0] - 2023-08-23

### Changed

- Version preminor update due to children dependencies update (`@semcore/utils` [4.3.1 ~> 4.4.0]).

## [2.3.1] - 2023-08-21

### Fixed

- Component types edge case when two nested prop with same name from different components create conjunction instead of disjunction.

## [2.3.0] - 2023-08-18

### Added

- Exported type `Intergalactic.DomProps` that may be helpful for typing component wrappers.

## [2.2.1] - 2023-08-14

### Changed

- Internal typings update that fixes edge cases of props nesting.

## [2.2.0] - 2023-08-07

### Changed

- Version minor update due to children dependencies update (`@semcore/utils` [4.0.0 ~> 4.1.0]).

## [2.1.0] - 2023-08-01

### Change

- Supported `tag={React.Fragment}` for all root components.

## [2.0.0] - 2023-06-20

### Break

- Strict typings.

## [1.16.0] - 2023-06-20

### Changed

- Internal API for exposing component destructuring children.

## [1.15.8] - 2023-06-30

## [1.15.7] - 2023-06-27

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.4 ~> 3.54.0]).

## [1.15.6] - 2023-06-14

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.3 ~> 3.53.4]).

## [1.15.5] - 2023-06-12

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.2 ~> 3.53.3]).

## [1.15.4] - 2023-06-09

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.1 ~> 3.53.2]).

## [1.15.3] - 2023-06-07

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.53.0 ~> 3.53.1]).

## [1.15.2] - 2023-05-31

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.52.0 ~> 3.53.0]).

## [1.15.1] - 2023-05-25

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.51.1 ~> 3.52.0]).

## [1.15.0] - 2023-05-24

### Changed

- Prop `locale` default value is provided for all Intergalactic components under this `I18nProvider`.

## [1.14.12] - 2023-05-22

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.7 ~> 3.51.0]).

## [1.14.11] - 2023-05-11

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.6 ~> 3.50.7]).

## [1.14.10] - 2023-05-04

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.5 ~> 3.50.6]).

## [1.14.8] - 2023-04-24

## [1.14.7] - 2023-04-17

### Changed

- Version patch update due to children dependencies update (`@semcore/utils` [3.50.0 ~> 3.50.3]).

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

- Изменено свойство с `CSS` на `styles`

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

## [0.0.1-prerelease.10] - 2020-03-24

### Added

- Beta release
