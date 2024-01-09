# Changelog

CHANGELOG.md standards are inspired by [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [4.16.1] - 2024-01-09

### Fixed

- Fixed name for `--intergalactic-text-secondary-invert` (from `--intergalactic-text-secondary-Invert`) for the dark theme json.

## [4.16.0] - 2023-12-22

### Changed

- `keyboardFocusEnhance` got context based keyboard focus enforcing.

## [4.15.1] - 2023-12-14

### Fixed

- Types in `splitProps` function.

## [4.15.0] - 2023-12-06

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.11.0 ~> 2.12.0]).

## [4.14.0] - 2023-11-28

### Added

- New `--intergalactic-border-critical-pattern` token for marking controls invalid state.
- Fixed output of css utils.

## [4.13.0] - 2023-11-24

### Added

- Types for enhances.

## [4.12.0] - 2023-11-23

### Added

- Pass `props` from component into `onNeighborChange` in `a11yEnhance` as a second args.

## [4.11.0] - 2023-11-22

### Added

- New `findAllComponents` (for passed `Children`) util method.

## [4.10.3] - 2023-11-21

### Changed

- Values for `--facebook`, `--twitter` and `--linkedIn` variables to new ones.

## [4.10.2] - 2023-11-09

### Fixed

- Fixed old palette colors resolving that was broken in `@semcore/utils@4.9.0`.

## [4.10.1] - 2023-10-27

### Changed

- Updated colors of hover/active states a little to sync it across components.
- Tag component design tokens are transformed from rgba colors with opacity to hex colors without opacity.

## [4.10.0] - 2023-11-01

### Changed

- Don't animate the width/height of a node if they are specified as a percentage.

## [4.9.1] - 2023-10-27

### Changed

- Values for tag and icon tokens that are built with CSS filters.

## [4.9.0] - 2023-10-26

### Added

- Internal api for design tokens resolving.

## [4.8.4] - 2023-10-13

### Fixed

- Focus lock merging was causing invalid hooks order error.

## [4.8.3] - 2023-10-13

### Changed

- Fixed name for `--intergalactic-text-secondary-invert` (from `--intergalactic-text-secondary-Invert`) and changed it's value, from `0.75` to `0.8`.

## [4.8.2] - 2023-10-06

### Fixed

- Duplicated ref function callback.

## [4.8.1] - 2023-10-03

### Fixed

- After getting disabled components were not loosing focus visual state.

## [4.8.0] - 2023-10-02

### Fixed

- Extended internal mechanism of component wrapper props modifying.

## [4.7.3] - 2023-09-28

### Fixed

- React invalid Hooks call caused by `useFocusLock` in some rare cases from it's nested hooks.

## [4.7.2] - 2023-09-20

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.7.1 ~> 2.7.2]).

## [4.7.1] - 2023-09-18

### Fixed

- Reversed focus trap looping.

## [4.7.0] - 2023-09-13

### Added

- Added new design tokens for period comparison in DatePicker: `date-picker-cell-comparison-active`, `date-picker-cell-comparison-active-hover`, `border-date-picker-range-comparison`.

### Changed

- Changed colors of `--intergalactic-date-picker-cell-current` and `--intergalactic-date-picker-cell-current-invert` design tokens to make them more contrast against background.
- Removed design tokens `--intergalactic-bg-tertiary-neutral` and `--intergalactic-brand-tertiary` that was added by mistake.

## [4.6.3] - 2023-09-12

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.2 ~> 2.6.3]).

## [4.6.2] - 2023-09-08

### Fixed

- Focus lock version merger was not respecting React version and was causing React#321 error.

## [4.6.1] - 2023-09-05

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.6.0 ~> 2.6.1]).

## [4.6.0] - 2023-09-04

### Changed

- Version preminor update due to children dependencies update (`@semcore/core` [2.5.0 ~> 2.6.0]).

## [4.5.0] - 2023-08-28

### Changed

- Focus lock got focus war surrender mechanism to prevent page freeze if page contains older focus lock. In such case the error is logged into console.
- Focus lock got improved focus control in multiple nested modals (or side-panels) when modals count is bigger then 2.
- Focus lock uses only one version of it if multiple focus lock versions are present on same page.

## [4.4.1] - 2023-08-24

### Fixed

- Keyboard triggered focus was not properly detected for recently mounted components.

### Added

- Improved modals and side panels focus lock behavior by adding "single focus owner mode" to focus lock handler.

## [4.4.0] - 2023-08-23

### Changed

- Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.

## [4.3.1] - 2023-08-21

### Changed

- Version prepatch update due to children dependencies update (`@semcore/core` [2.3.0 ~> 2.3.1]).

## [4.3.0] - 2023-08-18

### Changed

- Made `resolveColor` types generic.

## [4.2.0] - 2023-08-14

### Fixed

- Fixed colors of `--intergalactic-table-td-cell-hover` and `--intergalactic-table-td-cell-active` design tokens to a lighter ones.

## [4.1.0] - 2023-08-07

### Fixed

- Fixed core invalid peer dependencies warning.

## [4.0.0] - 2023-07-17

### Break

- Strict, backward incompatible typings.

## [3.54.1] - 2023-06-29

### Fixed

- `usePreventScroll` was causing 150px right padding.

## [3.54.0] - 2023-06-23

### Added

- Exposed internal util for setting focus on top focusable child.

## [3.53.4] - 2023-06-14

### Fixed

- AutoFocus in the animated popovers might be causing instant scroll to the page top.

## [3.53.3] - 2023-06-12

### Fixed

- Animations in complex components (e.g. `FilterTrigger`) might not be finished.

## [3.53.2] - 2023-06-07

### Fixed

- Fixed defaults event handlers calling when same, non-function handler provided.

## [3.53.1] - 2023-06-07

### Fixed

- Fixed color SSR hydration.

## [3.53.0] - 2023-05-25

### Added

- All focusable components get `autoFocus` prop via `keyboardFocusEnhance`.

## [3.52.1] - 2023-06-07

### Changed

- Switched `useFocusLock` from listening to `focusin` body event to `focusout` to catch focus.

## [3.52.0] - 2023-05-25

### Added

- Added new `--keyboard-focus-invert` token for using with dark background.

## [3.51.2] - 2023-04-11

### Changed

- Add lighten modifier to table cell tokens, to remove the opacity.

## [3.51.1] - 2023-05-24

### Fixed

- Fixed error if token for localization is not defined.

## [3.51.0] - 2023-05-22

### Changed

- Updated reference for `--text-placeholder` token from `--gray-300` to `--gray-400`, to add more contrast to all placeholder texts in all components.

## [3.50.7] - 2023-05-11

### Fixed

- Fixed `i18n` interpolation of falsable values.

## [3.50.6] - 2023-05-04

### Fixed

- Made automatic focus return more friendly for modals and side panels.

## [3.50.5] - 2023-05-03

### Changed

- During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [3.50.4] - 2023-04-24

### Fixed

- Fixed `usePreventScroll` (used in `<Modal />` and `<ScrollBar />`) might totally block document body scroll with async components appearing and fading.

## [3.50.3] - 2023-04-17

### Fixed

- Fixed behavior when returning focus. Now focus return does not work if user used the mouse.

### Change

- Added `id` property for `ScreenReaderOnly` component.

## [3.50.1] - 2023-04-13

### Fixed

- Keyboard focus highlight wasn't working until keyboard focuses any focusable element second time.
- Delayed focus return in the macrotask to prevent focus return trigger event passing to to the return focus target.

## [3.50.0] - 2023-03-27

### Added

- Small internal util for context consuming in class-based components.

## [3.49.1] - 2023-03-28

### Fixed

- Utils package was breaking building via webpack and vite.

## [3.49.0] - 2023-03-24

### Added

- Supported portalled local theme reapplying in class-based components.

## [3.48.1] - 2023-03-23

### Removed

- Removed `Status` group in semantic tokens.

### Changed

- Moved the gray-white token in front of the gray-50, slightly tweaked the order.

## [3.48.0] - 2023-03-23

### Added

- Added internal util `ScreenReaderOnly` to declaratively put screen reader only text in the components.

## [3.47.4] - 2023-03-22

### Fixed

- Focus locked tab navigation might cause scrolling to the end or to the start of the page.

## [3.47.3] - 2023-03-16

### Fixed

- Fixed focus lock might cause infinite focus war when multiple focus locks exist on same page.

## [3.47.2] - 2023-03-09

### Added

- Added `lib/use/useFocusLock` util to control focus lock in popup components (like `Popper`-based, `Modal` and `Sidebar`).

## [3.47.1] - 2023-02-21

### Fixed

- In some cases `<ThemeProvider />` was breaking rendering process.

## [3.47.0] - 2023-02-20

### Added

- Added semcore enhance to animate component dimensions on change of specific props.

## [3.46.1] - 2023-01-20

### Changed

- Changed design tokens facebook color (`#3b5998` -> `#1877f2`).
- Changed design tokens linkedIn color (`#1a7ab2` -> `#0a66c2`).
- Changed design tokens twitter color (`#2bafeb` -> `#1d9bf0`).

## [3.46.0] - 2023-01-20

### Changed

- Put all css `:hover` selectors into `@media(hover: hover)` block.

## [3.45.0] - 2023-01-09

### Changed

- Renamed `--intergalactic-border-danger` token name to `--intergalactic-border-critical`.
- Renamed `--intergalactic-border-danger-active` token name to `--intergalactic-border-critical-active`.
- Renamed `--intergalactic-border-table-accent-border` token name to `--intergalactic-border-table-accent`.
- Added description for every design token.
- No other renaming expected in the future.

## [3.44.3] - 2023-01-09

### Fixed

- Removed unexpected log statement.

## [3.44.2] - 2023-01-09

### Fixed

- Fixed internal mechanism of interpolating variables into translated texts.

## [3.44.1] - 2022-12-16

### Fixed

- Fixed non-react node detection for `addonTextChildren`.

## [3.44.0] - 2022-12-14

### Changed

- Supported semi-async internationalization.

## [3.43.0] - 2022-12-12

### Added

- Added `ThemeProvider`.

## [3.42.0] - 2022-11-30

### Changed

- Changed `keyboard-focus` opacity

## [3.41.0] - 2022-11-30

### Added

- Added ability to merge `styles` field for `assignProps` function.

## [3.40.0] - 2022-10-26

### Added

- Added `hasLabels` utility.

## [3.39.1] - 2022-10-20

### Fixed

- Removed `@types/react`, `@types/react-dom` and `@types/node` from package direct dependencies.

## [3.39.0] - 2022-10-10

### Added

- Added new property for `utils/lib/addonTextChildren` to be able to control how children are wrapped in `Text`.

## [3.38.0] - 2022-10-10

### Changed

- Added support for React 18 🔥

## [3.37.2] - 2022-09-30

### Fixed

- Added a check for empty children for `addonTextChildren` function.

## [3.37.1] - 2022-08-30

### Fixed

- Added dependency `@types/react-dom` and fix type for `getNodeByRef` function.

## [3.37.0] - 2022-08-12

### Added

- Added util function `reactToText` to convert react component to text.

## [3.36.0] - 2022-08-11

### Added

- Added support of `elementtiming` attribute passing on all components.

## [3.35.1] - 2022-08-01

### Fixed

- Fixed package `.mjs` artifacts cross-imports to support modern js bundlers.

## [3.35.0] - 2022-07-19

### Fixed

- Fixed package compatibility with ES modules.

## [3.34.0] - 2022-06-16

### Fixed

- Fixed the brand colors: `--orange-400` and `--violet-700`.

## [3.33.0] - 2022-06-01

### Changed

- Changed type names from 'ChildrenType' to 'IfChildrenType' so that there are no intersections with other components.

## [3.32.2] - 2022-05-31

### Changed

- Update version dependency `@babel/runtime`.

## [3.32.1] - 2022-05-19

### Fixed

- Synced dependencies versions to remove duplicates in the single export package.

## [3.32.0] - 2022-05-17

### Added

- Added `light` function for increasing `l` axes in hsl color space of `rgb(a)` and hex colors

### Fixed

- Remove react warning when accessing "ref" property

## [3.31.2] - 2022-03-05

### Fixed

- Fixed set property in body (when window inside window and body don't have `box-sizing`) in `usePreventScroll`.

## [3.31.1] - 2022-02-24

### Added

- Added repository field to package.json file.

## [3.31.0] - 2022-01-25

### Added

- Added function `isAdvanceMode` in `findComponent`.

## [3.30.5] - 2021-12-22

### Fixed

- Fixed opacity calculation regardless of case.

## [3.30.4] - 2021-12-15

### Fixed

- Fixed logic to function `defaultFindNeighbor` for `a11yEnhance`.

## [3.30.3] - 2021-11-29

### Changed

- Added magic comment in `color.ts` for update values in themes.

## [3.30.2] - 2021-8-26

### Changed

- Add 'sideEffect=false' for more optimal build via webpack

## [3.30.1] - 2021-04-28

### Changed

- Changed breakpoints value.

## [3.30.0] - 2021-04-28

### Added

- Added function enhance `a11yEnhance`.

## [3.29.0] - 2021-04-26

### Changed

- Added processing `forwardRef` for `assignProps`.
- Removed the ability to apply media variables.

## [3.28.0] - 2021-03-15

### Fixed

- Update function `opacity`, now this function can set opacity for rgb color.

## [3.27.0] - 2021-02-20

### Changed

- [TS] Update types interface `IWithI18nEnhanceProps`.

## [3.26.0] - 2021-02-11

### Added

- Added vars for media query.

## [3.24.0] - 2020-12-16

### Added

- Added enhance for set `uid` and `useUID` to set random numbers.

## [3.23.2] - 2020-10-06

### Fixed

- Revert move .d.ts files because typescript does not see types on import.

## [3.23.1] - 2020-10-06

### Fixed

- Change "any" type for createHoc function

## [3.23.0] - 2020-09-30

### Changed

- Build changed from rollup to babel
- Move .d.ts files from /lib to /lib/types directory

## [3.22.1] - 2020-09-11

### Added

- Add helper function `syncScroll`.
- Add special key-prop for exclude valid property for `propsForElement`.

### Fixed

- Return work function `assignHandlers` to default state

## [3.21.0] - 2020-08-16

### Added

- Добавлена функция `brightness` в `color` для вычисления контраста

## [3.20.0] - 2020-08-14

### Added

- Добавлен hook `usePreventScroll`, блокирующий скролл страницы

## [3.19.1] - 2020-08-13

### Added

- Добавилась возможность передавать ref в element для `useEventListener`.

## [3.18.0] - 2020-07-14

### Added

- Добавился новый цвет `google-my-business`

### Changed

- Добавлена оптимизация для `assignProps`, теперь не создаются новые функции и ref
ссылки если они не нужны. Это позволит избежать лишних перерендеров, когда свойства не меняются.

## [3.17.2] - 2020-06-19

### Fixed

- Добавлена проверка на отсутствие локали в `i18nEnhance`.
- Добавлена `TS` типы для `i18nEnhance`.
- Исправлен не работающий autoFocus, когда нода быстро перерендривается.

## [3.17.0] - 2020-06-17

### Added

- Добавлена возможность интерполяции в `i18nEnhance`

## [3.16.3] - 2020-06-08

### Fixed

- Исправлен проброс свойств в функции `i18nEnhance`.

## [3.16.0] - 2020-06-03

### Added

- Добавлена проверка `children` свойств на одиночных тегах в `propsForElement`
- Добавлена функция `i18nEnhance` для работы с переводами

## [3.15.4] - 2020-06-01

### Fixed

- Добавлен tabIndex по умолчанию для `keyboardFocusEnhance`

## [3.15.3] - 2020-05-29

### Fixed

- В `logger` убрано обращение к window, так как возможен запуск на сервере

### Changed

- `injectStyle` не вставляет одинаковые стили два раза

## [3.15.1] - 2020-05-19

### Fixed

- `useForkRef` теперь возвращает memo функцию, а не ref
- Убрана ошибка в `autoFocusEnhance` при исчезновении ноды

## [3.15.0] - 2020-04-27

### Added

- Функция `addonTextChildren` теперь может принимать массив `Addon-ов`.

## [3.14.1] - 2020-04-24

### Added

- Добавлена функция `getNodeByRef` для получения dom node из ref-а.
- Добавлена функция `findComponent` для поиска компонентов в `Children`.

## [3.13.2] - 2020-04-16

### Fixed

- Добавлено описание интерфейса `autoFocusEnhance`

## [3.13.0] - 2020-04-10

### Added

- Добавлена функция `getOriginChildren` для поиска оригинального children.

## [3.12.1] - 2020-04-03

### Fixed

- Теперь при передаче не правильного значения в функцию `color` возвращается пустая строка.

## [3.12.0] - 2020-04-02

### Added

- Добавлена утилита `inputProps` для разделения свойств инпута

### Fixed

- Поправился тип для `setRef`/`forkRef`

### Changed

- Изменился импорт по умолчанию для `color`
- Убраны dev зависимости

## [3.11.2] - 2020-03-31

### Fixed

- Добавлена пропущенная зависимость `@semcore/core`.

## [3.11.0] - 2020-03-27

### Added

- Добавлена возможность функции `addonText` работать с `Children` из core пакета.

## [3.10.0] - 2020-03-27

### Added

- Добавлены функции работы с цветом `color`, которые раньше находились в `Paint`.

## [3.25.0] - 2020-12-17

### Added

- Added supported react@17.

## [3.9.1] - 2020-03-24

### Added

- Добавлены функции работы с `ref` такие, как `forkRef` и `useForkRef`
- Добавлена функция работы с объектом, `pick`

### Fixed

- Функция `fire` теперь возвращает значение из вызванной функции

## [3.8.1] - 2020-02-20

### Fixed

- Исправили поведение функции `getText` для `WithI18n`. Теперь если функция получает не существующую локаль, то береться английская локаль.

## [3.8.0] - 2020-02-12

### Added

- Добавили возможность изменить свойство `getText` для компонентов, которые обернуты в `WithI18n`
- Добавили новые функции `useEnhancedEffect, useEventCallback`, которые могут быть использованы вместо одноименных `useEffect, useLayoutEffect, useCallback`, но с небольшими модификациями для предсказуемости поведения

### Changed

- Убрали неиспользуемые цвета `violet`, `dark-violet` и добавили `keyborad-focus` в палитре цветов `sellerly`

## [3.7.0] - 2020-02-04

### Added

- Добавлен компонент `IfChildren` и тип `ChildrenType<ContextType>`

## [3.6.2] - 2020-01-30

### Fixed

- Изменили цвет для `rose`, `dark-rose` в теме `sellerly`

## [3.6.1] - 2020-01-29

### Fixed

- Исправлено значение(null -> {}) возвращаемое в setState в internalSetState для корректной работы preact

## [3.6.0] - 2020-01-28

### Added

- Добавили глобальные стили для темы `sellerly`

## [3.5.1] - 2019-12-16

### Fixed

- Пакет пересобран под commonjs

## [3.5.0] - 2019-12-12

### Added

- Появилась возможность добавления различных стилистических тем через css переменные
- Появилась возможность оптицонально подключать адаптивность
- Появилась возможность изолировать стили даже в пределах одной страницы
- Добавлена функция `CSSinJS` для работы с CSS в JS и SSR
- Добавлена функция `injectStyle` для вставки стилей кита в `html`

### Changed

- Изменен алгоритм вставки стилей в head

### Removed

- Убраны относительные единицы измерения(rem), которые использовались для адаптивности

## [3.4.1] - 2019-11-14

### Added

- Добавлен `rafTrottle` - хэлпер, для тротлинга часто вызывающихся функций

## [3.4.0] - 2019-11-14

### Added

- Добавлены медиа переменные

## [3.3.1] - 2019-10-24

### Added

- Добавлена возможность принудительно указывать локаль для `getText` в `WithI18n`

### Fixed

- Исправлен line-height 600

## [3.2.2] - 2019-10-17

### Fixed

- Создается и используется один и тот же контекст для WithCSS и useCss
- Заменен метод `setRef` в `assignProps`

## [3.2.0] - 2019-10-10

### Added

- Добавлен `WithRef`/`useCss`

## [3.1.0] - 2019-09-27

### Added

- Добавил `white`/`black` переменные цветов

## [3.0.2] - 2019-09-09

### Fixed

- Усправлены не работающие фокусы с клавиатуры

## [3.0.1] - 2019-09-06

### Fixed

- Усправлены ES импорты внутри `babel/runtime`

## [3.0.0] - 2019-09-05

### BREAK

- Все утилиты переписаны на typescript
- Удалены validAttr.js, withAnalytics.js, index.js, createConnector.js, getSizeText.js, setStateIfNeeded.js
- Переменные с размером текста в `style/var.css` приведены в соответствие с типографикой

### Fixed

- Исправлено отображение фокуса

## [2.6.0] - 2019-08-23

### Added

- Добавлен `HOC` `WithI18n`, хук `useI18n` и `Context` для проброса локали
- Добавлена ф-ция `fireFn` в утилиту `fire`

## [2.5.1] - 2019-08-12

### Added

- Добавлена функция `addonText` оборачивающая содержимое компонента в `Text` если это нужно

## [2.4.2] - 2019-06-25

### Fixed

- Исправлены prop-types `WithAutoFocus`

## [2.4.0] - 2019-06-24

### Added

- Добавлен новый HOC `EnhancedWithAutoFocus`

## [2.3.0] - 2019-05-10

### Added

- Добавлена возможность серверного рендера css

### Changed

- Обнавлена зависимость `nano-css`

## [2.2.3] - 2019-05-20

### Fixed

- Убрана возможность фокусировать задизейбленные элементы в `WithKeyboardFocus`

## [2.2.2] - 2019-04-12

### Added

- Копирование `defaultProps` при создание компонентов через `createHoc`

## [2.2.1] - 2019-04-01

### Added

- Функция `isRetina` для проверки ретина дисплея

## [2.1.0] - 2019-02-15

### Changed

- Теперь стили добавляются в один тег style, а не в множества
- Css-in-js инициализируется при создании компонента, а не при его импорте

### Fixed

- Исправлена проблема производительности css-in-js при dev сборках

## [2.0.2] - 2019-02-08

### Added

- функция `getSizeText` для соответствия основных размеров текста к компоненту `Text`

## [2.0.1] - 2019-02-01

### Added

- функция `canUseDom` для идентификации доступности DOM элементов

## [2.0.0] - 2019-01-18

### Added

- добавлен HOC для CSS in JS `WithCSS`

### Changed

- Перенеcли HOC `WithNeighborLocation` (помогавший узнать положение компонента относительного его соседей), в отдельный
компонент `@semcore/neighbor-location`

## [1.3.0] - 2018-11-22

### Added

- функция `assignProps` теперь расширяет свойство `className`

## [1.2.0] - 2018-11-07

### Added

- функция `isPromise` для идентификации функции возвращающей `Promise`
- возможность передать в функцию `propsForElement` второй аргумент `element`

## [1.1.6] - 2018-10-11

### Added

- набор функций для работы со слиянием пропсов, находятся в пакете `assignProps`

## [1.1.5] - 2018-09-27

### Added

- функция `capitalizeFirstLetter` для отображения строки с заглавной буквы
- функция `getRandomInt` возвращает рандомное число, между `min` и `max` заданными значениями
- вспомогательный компонент `If` с возможностью упарвлять отображением дочерних узлов при помощи свойства `condition`
- функция `ownerDocument` возвращает объект документа верхнего уровня (document) для переданного узла
- функция `setRef` устанавливает переданное значение как `node` элемента
- набор функций для работы со `state`-ом компонента (чтение и изменение), находятся в пакете `uncontroll`
- возможность пробрасывать опции на обертку при создании компонентов с помощью `createHoc`

## [1.1.4] - 2018-09-10

### Added

- хелпер функция для локализации `getL10n`
- хелпер функция для возврата числовых значений из css `cssToIntDefault`
- хелпер функция для отправки событий в GA `withAnalytics`

## [1.1.3] - 2018-08-30

### Changed

- Цвет \$gray60 изменился на #757575

## [1.1.2] - 2018-08-17

### Added

- Добавлен компонент для создания других компонентов (HOC)
- Добавлен компонент обертка для работы с контекстом `neighborLocation`

## [1.1.1] - 2018-08-08

### Added

- Добавленна поддержка зависимости от React15

## [1.1.0] - 2018-07-01

### Added

- Новая структура декомпозиции хелпер функции на файлы

## [1.0.1] - 2018-06-21

### Added

- Initial release
