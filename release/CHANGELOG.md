## [5.1.0] - 2021-05-25

### @semcore/core
  - **Changed** Extended type for Root

### @semcore/popper
- **Fixed** Add type for handlers for render function
- **Fixed** Fix TS type
- **Fixed** Fix position arrow after change version popperjs.
- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/tooltip
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/feature-popover
- **Changed** The style processing system has been changed.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.

### @semcore/dropdown
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.

### @semcore/dropdown-menu
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.

### @semcore/select
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/date-picker
- **Fixed** Fixed short display date for identity months for Trigger.

### @semcore/accordion
  - **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/scroll-area
- **Fixed** Add import type for ResizeObserver

### @semcore/spin
- **Fixed** Fixed animation
- **Changed** Rewrite code from TS to JS 👩‍💻

### @semcore/time-picker
- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/d3-chart
  - **Fixed** Fix TS type

### @semcore/neighbor-location
  - **Added** Added the ability to add a root tag
  - **Changed** Rewrite code from TS to JS 🧑‍💻

## [5.0.0] - 2021-04-29

### Global

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/base-trigger

- **Changed** Changed line-height value

### @semcore/button

- **Changed** Changed line-height value

### @semcore/chart

- **Changed** Changed line-height value

### @semcore/core

- **Added** Added Root type for babel-plugin-root.
- **Added** Added a new system for processing styles.

### @semcore/feedback-form

- **Changed** Up version @semcore/notice in dependence for package.

### @semcore/format-text

- **Changed** Resized bullet points in li

### @semcore/icon

- **Added** Added control with keyboard for all icons including prop interactive.
- **Added** Added new icon SharedToUser.

### @semcore/input

- **Changed** Changed line-height value

### @semcore/input-tags

- **Added** Added line-height value

### @semcore/modal

- **Changed** Changed media value to match breakpoints.

### @semcore/notice-bubble

- **Changed** Changed media value to match breakpoints.

### @semcore/pills

- **Changed** Changed line-height value

### @semcore/popper

- **Added** Added functions setTrigger, setPopper in context for Popper.
- **Fixed** Fixed the setting of attributes in HTML.

### @semcore/product-head

- **Changed** Changed media value to match breakpoints.

### @semcore/tab-line

- **Added** Added support accessibility.
- **Fixed** Fixed calculate size for Tabline.Item when value don't change.
- **Changed** Changed line-height value

### @semcore/tab-panel

- **Added** Added support accessibility.
- **Changed** Changed line-height value

### @semcore/time-picker

- **Added** Added type="button" for controls TimePicker.Format.

### @semcore/tooltip

- **Added** Added role tooltip

### @semcore/utils

- **Added** Added function enhance a11yEnhance.
- **Changed** Changed breakpoints value.
- **Changed** Added processing forwardRef for assignProps.
- **Changed** Removed the ability to apply media variables.

## [4.0.0] - 2021-04-05

### @semcore/breadcrumbs

- **Fixed** Added aria-label for Breadcrumbs.
- **Fixed** Changed default tag li to div for wrap separator in Breadcrumbs.Item.

### @semcore/chart

- **Changed** Optimized the code for venn chart.

### @semcore/data-table

- **Fixed** Fixed automatic set property flexBasis for DataTable.Column.

### @semcore/date-picker

- **Added** Added support two languages Korean, Vietnamese.
- **Added** Added supported react@17.
- **Fixed** Fixed set weekStart for component Calendar. Now you can change weekStart for global object Ls.
- **Fixed** Fixed display if one day is selected and if the same month of a different year is selected.

### @semcore/errors

- **Added** Added support two languages Korean, Vietnamese.

### @semcore/flex-box

- **Fixed** [TS] Fixed type boxSize, value content-box set browser by default.
- **Fixed** [Box] Added change css styles after change value by props top, left, right, bottom.

### @semcore/icon

- **Changed** Update icons SEMrush, TwitterSemrush, FacebookSemrush, LinkedInSemrush.

### @semcore/notice

- **BREAK** Removed global styles
- **BREAK** Removed styles for media queries.
- **BREAK** Replace animation package from react-transition-group to @semcore/animation
- **BREAK** Update property theme, now this property can get any themes
- **BREAK** Added property use
- **BREAK** Update icon for Notice.IconClose

### @semcore/outside-click

- **Added** Added supported react-dom@17.

### @semcore/pagination

- **Added** Added support two languages Korean, Vietnamese.

### @semcore/portal

- **Added** Added supported react-dom@17.

### @semcore/project-create

- **Added** Added support two languages Korean, Vietnamese.

### @semcore/scroll-area

- **Added** Added supported react-dom@17.

### @semcore/table

- **Fixed** Fixed color Cell for hover in Cell and Row with theme="default"

### @semcore/time-picker

- **Changed** Changed view TimePicker.Format, now view don't have icons TimeNight, TimeDay.

### @semcore/utils

- **Fixed** Update function opacity, now this function can set opacity for rgb color.
- **Changed** [TS] Update types interface IWithI18nEnhanceProps.

### @semcore/widget-empty

- **Added** Added support two languages Korean, Vietnamese.

## [3.0.0] - 2021-02-16

### @semcore/accordion

- **Changed** Update version package animation.

### @semcore/animation

- **Fixed** Fixed bubbling call handlers onAnimationStart, onAnimationEnd from inside components.

### @semcore/base-trigger

- **Fixed** Fixed color spinner for ButtonTrigger.

### @semcore/breakpoints

- **Added** Initial release

### @semcore/carousel

- **Added** Added support touch event for change to slide.
- **Added** Added support control mod for change property index ``.
- **Added** Added style folder with css in build folder lib.
- **Fixed** [ts] fixed all types of components inside package.

### @semcore/chart

- **Added** Added supported react@17.
- **Fixed** [ts] fixed types for function timeFormat.

### @semcore/core

- **Added** Added support custom enhancement.

### @semcore/data-table

- **Added** Added style folder with css in build folder lib.
- **Fixed** Removed calculation min width head and body because this is caused bugs.

### @semcore/errors

- **Added** Added supported react@17.

### @semcore/date-picker

- **Added** Added supported react@17.

### @semcore/grid

- **BREAK** Change the responsive breakpoint from 992px to 1184px.
- **Added** Added alternative API for span and offset.
- **Added** Added breakpoint xs.

### @semcore/icon

- **Added** Added new icon VideoStop.
- **Added** Added new color icon Github.
- **Added** Added new icon GoogleAnalytics4 for 4 version.

### @semcore/input

- **Fixed** Fixed type of second argument(event) for onChange prop

### @semcore/outside-click

- **Changed** Changed mouse event from click to mouseup for stable performance.
- **Added** Added supported react-dom@17.

### @semcore/scroll-area

- **Added** Added supported react-dom@17.

### @semcore/portal

- **Added** Added supported react-dom@17.

### @semcore/select

- **Fixed** Fixed to show components for tag in Select.Trigger, example <Select.Trigger tag={FilterTrigger}

### @semcore/textarea

- **Fixed** Updated padding to be better ☺️

### @semcore/utils

- **Added** Added vars for media query.

## [2.4.0] - 2020-12-18

### Global

- **Added** Added supported react@17.

### @semcore/animation

- **Fixed** Fixed a bug in determining the height in Collapse.

### @semcore/data-table

- **Added** Release library

### @semcore/feature-popover

- **Fixed** Disabled flip behavior on container overflow

### @semcore/notice-bubble

- **Fixed** Сomponent has become friendlier to SSR. Replace random generate number to get uid from function useUID.

### @semcore/popper

- **Fixed** Сomponent has become friendlier to SSR. Replace random generate number to get uid from function useUID.

### @semcore/skeleton

- **Fixed** Сomponent has become friendlier to SSR. Replace random generate number to get uid from function useUID.

### @semcore/tab-line

- **Added** Added ResizeObserver for update style tab when used dynamic data.
- **Fixed** Uptimize animation change position active tab.

### @semcore/table

- **Fixed** Fixed show secondary theme for Table.

### @semcore/utils

- **Added** Added enhance for set uid and useUID to set random numbers.

## [2.3.0] - 2020-12-4

### @semcore/carousel

- **Added** Release library

## [2.2.0] - 2020-12-4

### @semcore/animation

- **Fixed** Fixed a bug in determining the height in Collapse.

### @semcore/button

- **Fixed** My little fix build 😬

### @semcore/checkbox

- **Added** Added active invalid state.

### @semcore/core

- **Added** Add shared types.

### @semcore/data-table

- **Fixed** Replace special characters in column names because they apply as css variables.
- **Changed** Added warning for deprecated prop 'sticky'.
- **Changed** Replaced title prop with children parse for group column.

### @semcore/flex-box

- **Added** Added new property: zIndex.
- **Changed** Moved flex property from Flex to Box.

### @semcore/input-tags

- **Fixed** Fixed cursor position during tag editing

### @semcore/modal

- **Fixed** Fixed set autofocus/focus for elements inside Modal.

### @semcore/notice

- **Fixed** Fixed top margin of Notice.Actions

### @semcore/pills

- **Fixed** Fixed disabled pills styles

### @semcore/popper

- **Added** Added the ability to use one `with multiple`
- **Fixed** Fixed import paths from @popperjs.
- **Fixed** Refactor modifier arrowOffset that calculates arrow position.
- **Changed** Removed the display of the popper by focus when navigating from the keyboard, it caused many bugs 🤷‍♂️

### @semcore/scroll-area

- **Fixed** Fixed problem used ScrollArea for SSR.

### @semcore/select

- **Added** Added hidden input for correct work of forms
- **Fixed** Fixed export SelectOption
- **Fixed** Scroll to the first selected option in multiselect instead of the last
- **Changed** InputSearch moved out of Select

### @semcore/table

- **Fixed** Fixed move props position in component Box.

## [2.1.0] - 2020-11-9

### Global

- **Fixed** Added the placeholder for ID style tag to improve collision protection.

### @semcore/accordion

- **Fixed** Added null ts type for value.
- **Fixed** Added keyboard interaction for Toggle.

### @semcore/carousel

- **Added** Initial release

### @semcore/data-table

- **Added** Set min-width for Head and Body, which calculate from width Cell
- **Fixed** Set size width column in css variable Table

### @semcore/date-picker

- **Fixed** Getting options from dayjs for current localization.

### @semcore/flex-box

- **Added** Added new property: postion, top, left, right, bottom.

### @semcore/icon

- **Added** Added new icon GlobeAlt.

### @semcore/scroll-area

- **Fixed** [TS] fixed types for ScrollArea.Bar.Slider

### @semcore/sticky

- **Changed** Update package flex-box.

### @semcore/tab-line

- **Fixed** Fixed set indicator for Tabline.Item wrapped Tooltip.

### @semcore/tag

- **Added** Added new warning theme

## [2.0.0] - 2020-10-16

### Global

- **Fixed** fixed wrong path for ES6 build

### @semcore/accordion

- **BREAK** Remove wrapper node for Accordion.
- **BREAK** Remove style for Trigger and rename in Toggle.
- **BREAK** Rename Content to Collapse.
- **BREAK** Remove margin for Chevron.
- **BREAK** Remove export AccordionItem.
- **BREAK** Remove prop selectedValues.
- **BREAK** Change animation way.
- **Added** Added generic for better value and onChange typings
- **Fixed** Bubbling event from interaction components inside Accordion.Item.Content for listener onChange in Accordion
- **Changed** Update @semcore/core version to ^1.8

### @semcore/animation

- **Added** Add Collapse animation.

### @semcore/breadcrumbs

- **Fixed** Remove set css property max-width for Breadcrumbs.Item

### @semcore/button

- **Added** Added alternative api for inserting Addon.

### @semcore/chart

- **Fixed** Fixed "any" types for some charts.
- **Fixed** Render label in Tooltip for first dot in chart.

### @semcore/core

- **Added** Added generic type PropGetterFn to describe prop-getters
- **Fixed** Fixed transfer of many arguments to handlers

### @semcore/data-table

- **Added** Add prop active for Row.
- **Changed** Changed type for prop sort.

### @semcore/date-picker

- **Fixed** Add margin bottom for the block with periods

### @semcore/drag-and-drop

- **Fixed** TS property noDrop became not requered for IDraggableProps.

### @semcore/dropdown

- **Fixed** Add missing TS type properties in context

### @semcore/dropdown-menu

- **Fixed** Fixed possible styles collisions between components with different versions, but same styles
- **Changed** Update @semcore/core version to ^1.8

### @semcore/feature-popover

- **Fixed** Fixed possible styles collisions between components with different versions, but same styles
- **Changed** Update @semcore/core version to ^1.8

### @semcore/fullscreen-modal

- **Fixed** Fixed show two close icon in preview FullscreenModal
- **Fixed** Fixed offset right for FullscreenModal.Close

### @semcore/icon

- **Added** Added new icon color/WhatsApp.

### @semcore/input-mask

- **BREAK** Property placeholderChar, it is everything have to use `\_`, because mask show in value to input
- **Added** Manage cursor position for InputMask.Value with show mask
- **Added** Export function getAfterPositionValue. It use when need to know where last symbol of value.
- **Fixed** Show mask for InputMask.Value when size input less than size mask

### @semcore/link

- **Added** Added alternative api for inserting Addon.

### @semcore/notice-bubble

- **Fixed** generate css without collapsing property margin

### @semcore/pills

- **Added** Added alternative api for inserting Addon.
- **Added** Added generic for better value and onChange typings
- **Changed** Update @semcore/core version to ^1.8

### @semcore/popper

- **Added** Added generic for better value and onChange typings
- **Changed** Update @semcore/core version to ^1.8
- **Changed** Update dependency package @popperjs/core version from 2.4.0 to 2.5.3

### @semcore/radio

- **Fixed** Fixed getting the last argument(event) in the handler(onChange)

### @semcore/side-panel

- **Fixed** Fixed call onClose when used for click on page with SidePanel.Panel in inside ``.

### @semcore/tab-line

- **Added** Added alternative api for inserting Addon.
- **Added** Added generic for better value and onChange typings
- **Added** Animation for change position active Tab.
- **Changed** Update @semcore/core version to ^1.8

### @semcore/tab-panel

- **Added** Added alternative api for inserting Addon.
- **Added** Added generic for better value and onChange typings
- **Changed** Update @semcore/core version to ^1.8

### @semcore/tag

- **Added** Added alternative api for inserting Addon.
- **Changed** Removed neighbor-location package dependency

### @semcore/tooltip

- **Fixed** Fixed possible styles collisions between components with different versions, but same styles

### @semcore/typography

- **Fixed** Set props fontSize, lineHeight for componentText. Now it independent from prop size.
- **Fixed** Problem use prop noWrap for List.Item. Now text reduce in ellipsis for ``

### @semcore/utils

- **Fixed** Revert move .d.ts files because typescript does not see types on import.
- **Fixed** Change "any" type for createHoc function
- **Changed** Build changed from rollup to babel
- **Changed** Move .d.ts files from /lib to /lib/types directory

## [1.2.1] - 2020-9-8

### Global

- **Fixed** Fixed possible styles collisions between components with different versions, but same styles

### @semcore/base-trigger

- **Fixed** Flag sideEffects now contain list of files with side effects

### @semcore/chart

- **Fixed** Flag sideEffects now contain list of files with side effects

### @semcore/date-picker

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/divider

- **Added** Added Divider auto size height for vertical orientation, this fixed show <Divider orientation="vertical" in
  flex

### @semcore/errors

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/feature-popover

- **Fixed** Disabled focus trap, for support normal work interactive components when popper show.

### @semcore/flex-box

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/notice

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/notice-bubble

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/pagination

- **Fixed** Fixed update value in input page, when update currentPage property

### @semcore/product-head

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/skeleton

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/typography

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

### @semcore/widget-empty

- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

## [1.2.0] - 2020-9-2

### @semcore/core

- **Added** Добавлена возможность создавать generic-компоненты с помощью createComponent
- **Fixed** Исправлена типизация второго аргумента (handlers) render-функций компонентов
- **Fixed** Исправлено объединение prop-getter'ов потомка и родителя в рендер-функциях компонентов

### @semcore/input-tags

- **Added** Добавили тип InputTagsSize для размеров компонента
- **Fixed** Поправили отображение для динамически меняющегося placeholder для InputTags.Value
- **Fixed** Поправили расположение по вертикали для InputTags.Value

### @semcore/select

- **Added** Добавлен generic, задающий тип value и аргументу ф-ции onChange
- **Fixed** Исправлен тип SelectValue
- **Fixed** Исправлена типизация второго аргумента (handlers) render-функции
- **Changed** Поднята версия @semcore/core до ^1.7

### @semcore/switch

- **Fixed** Исправили баг в поведении uncontrolled режима при передаче checked в Switch.Value

### @semcore/table

- **Fixed** убрали возможность отображения ScrollArea.Bar по вертикали для Table.StickyHead. Это поведение считается
  недопустимым для шапки таблицы.

### @semcore/widget-empty

- **Added** Добавлено новое изображение deleted-page
- **Changed** Изменены изображения other-data, congrats

## [1.1.0] - 2020-08-18

### @semcore/base-trigger

- **Added** Добавили новый триггер LinkTrigger
- **Added** Добавили состояние loading для ButtonTrigger

### @semcore/chart

- **Fixed** Исправлен warning компонента Legend о не валидных атрибутах, попадающих на DOM-элемент

### @semcore/counter

- **Added** Счетчик – это элемент, который показывает количество.

### @semcore/input-tags

- **Fixed** Поправили установку курсора в поле ввода

### @semcore/modal

- **Changed** Логика по отключению скролла страницы перенесена в хук usePreventScroll
- **Changed** Поднята версия @semcore/utils

### @semcore/notice-bubble

- **Fixed** Поправили рендер NoticeBubbleWarning при инициализации через NoticeBubbleManager

### @semcore/pills

- **Changed** Добавлен line-height для Addon для корректного выравнивания при использовании текста(например счетчика).

### @semcore/popper

- **Added** Зависимость от neighbor-location для обнуления расположения соседних элементов внутри Popper.Popper.
- **Fixed** Исправлены ts типы для offset

### @semcore/scroll-area

- **Changed** Убрали overflow: hidden с ScrollArea, это свойство не использовалось.

### @semcore/side-panel

- **Added** SidePanel — компонент для отображения выезжающей панели (справа, снизу или слева). Иногда зовем его "
  шторкой"

### @semcore/table

- **Added** Добавили box-sizing: border-box для таблицы, это решило проблему отображения скролла, когда контента не
  много
- **Fixed** Исправили отображение активной ячейки th
- **Fixed** Исправили выравнивание контента в ячейках через свойство textAlign
- **Changed** Переписали стили со встраиваемого CSS in JS на новый синтаксис, такой же как у всех компонентов

### @semcore/typography

- **Fixed** Исправлены не работающие props fontSize и lineHeight у компонента Text

### @semcore/utils

- **Added** Добавлена функция brightness в color для вычисления контраста
- **Added** Добавлен hook usePreventScroll, блокирующий скролл страницы
- **Added** Добавилась возможность передавать ref в element для useEventListener.

## [0.0.1] - 2020-07-27

### Added

- Initial release
