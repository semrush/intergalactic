## [14.1.0] - 2023-06-09

### @semcore/base-trigger

- **Fixed** Passing props to FilterTrigger inner select.

### @semcore/icon

- **Added** Added new `SecurityNo` icon.

### @semcore/utils

- **Fixed** Fixed defaults event handlers calling when same, non-function handler provided.

## [14.0.0] - 2023-06-09

### Global

- **Added** Polish (`pl`) locale support.

### @semcore/base-trigger

- **Added** Polish (`pl`) locale support.

### @semcore/breadcrumbs

- **Added** Polish (`pl`) locale support.

### @semcore/color-picker

- **Added** Polish (`pl`) locale support.

### @semcore/d3-chart

- **Added** Polish (`pl`) locale support.

### @semcore/date-picker

- **Added** Polish (`pl`) locale support.

### @semcore/drag-and-drop

- **Added** Polish (`pl`) locale support.

### @semcore/dropdown

- **Added** Polish (`pl`) locale support.

### @semcore/dropdown-menu

- **Added** Polish (`pl`) locale support.

### @semcore/errors

- **Added** Polish (`pl`) locale support.

### @semcore/feature-popover

- **Added** Polish (`pl`) locale support.

### @semcore/fullscreen-modal

- **Added** Polish (`pl`) locale support.

### @semcore/illustration

- **Fixed** Excluded unwanted development dependencies from package dependencies.

### @semcore/inline-edit

- **Added** Polish (`pl`) locale support.

### @semcore/inline-input

- **Added** Polish (`pl`) locale support.

### @semcore/input-number

- **Added** Polish (`pl`) locale support.

### @semcore/modal

- **Added** Polish (`pl`) locale support.

### @semcore/notice

- **Added** Polish (`pl`) locale support.

### @semcore/notice-bubble

- **Added** Polish (`pl`) locale support.

### @semcore/notice-global

- **Added** Polish (`pl`) locale support.

### @semcore/pagination

- **Added** Polish (`pl`) locale support.

### @semcore/select

- **Added** Polish (`pl`) locale support.

### @semcore/tag

- **Added** Polish (`pl`) locale support.

### @semcore/time-picker

- **Added** Polish (`pl`) locale support.

### @semcore/widget-empty

- **Added** Polish (`pl`) locale support.

### @semcore/wizard

- **Added** Polish (`pl`) locale support.

## [13.33.0] - 2023-06-07

### @semcore/animation

- **Fixed** Fixed unmount error of `<Scale />` and `<Popper />` integration.

### @semcore/base-trigger

- **Changed** FilterTrigger background changed from gray to white.

### @semcore/date-picker

- **Fixed** Fixed browser focus cursor position after picking date with mouse.

### @semcore/dropdown-menu

- **Fixed** Improved `<Popper />` integration.
- **Fixed** Fixed `aria-activedescendant` value.
- **Fixed** Fixed double focus inside of popper.

### @semcore/input

- **Changed** Descend combobox related aria attributes from input wrapper to the input itself.

### @semcore/popper

- **Fixed** Fixed corner case of focus return with `interaction=focus`.
- **Fixed** Added `disableEnforceFocus` api prop.
- **Changed** Updating `strategy`, `placement`, `offset`, `preventOverflow`, `arrow`, `flip`, `computeStyles`, `eventListeners` or `onFirstUpdate` props now triggers popper positioning update.

### @semcore/scroll-area

- **Added** Allowed to set scroll container tab index by setting it on scroll area root element.

### @semcore/select

- **Fixed** Fixed browser focus cursor position after selecting value in non multiple choice `<Select />`.
- **Added** Added `aria-owns` attribute for trigger that refers to the corresponding popper.

### @semcore/utils

- **Fixed** Fixed color SSR hydration.

## [13.32.0] - 2023-06-06

### @semcore/base-trigger

- **Changed** Blue border of trigger in the active state.

### @semcore/radio

- **Fixed** Setting `tag` prop on `RadioGroup` was breaking component `onChange` handling.

### @semcore/side-panel

- **Fixed** Fixed `SidePanel` default text color.

### @semcore/tab-panel

- **Changed** Removed white bottom border under selected tab panels.

### @semcore/time-picker

- **Added** Focused text part highlight.

## [13.31.3] - 2023-06-06

### @semcore/radio

- **Fixed** Fixed `disabled` prop inheritance from `RadioGroup` to `Radio.Value`.

## [13.31.2] - 2023-06-02

### @semcore/animation

- **Fixed** `Collapse` with `overflowHidden={false}` was always `overflow: hidden` after closing and opening due to animation fill mode.

## [13.31.1] - 2023-06-01

### @semcore/inline-input

- **Fixed** In some cases `onBlurBehavior` effect was called simultaneously with explicitly called confirm or cancel effect.

## [13.31.0] - 2023-05-31

### @semcore/animation

- **Fixed** Fixed blinking on first render.

### @semcore/utils

- **Added** All focusable components get `autoFocus` prop via `keyboardFocusEnhance`.
- **Added** Added new `--keyboard-focus-invert` token for using with dark background.
- **Changed** Add lighten modifier to table cell tokens, to remove the opacity.

## [13.30.0] - 2023-05-25

### @semcore/core

- **Changed** Prop `locale` default value is provided for all Intergalactic components under this `I18nProvider`.

### @semcore/d3-chart

- **Changed** Improved support of `zh` and `ja` locales in vertical titles.

### @semcore/data-table

- **Changed** Improved `DataTable` typings, now props `sort`, `onSortChange`, `uniqueKey` types are automatically infered from `data` prop and children rendering row data might be better typed like `<DataTable.Cell<{}, typeof data> name="keyword">`.

### @semcore/date-picker

- **Fixed** Use en-dash symbol as range separator.

### @semcore/feedback-form

- **Fixed** Fixed error tooltip sizing.

### @semcore/illustration

- **Changed** Updated cat in `PageError` illustration.
- **Fixed** Part of illustrations were incorrectly displayed in Firefox.

### @semcore/inline-input

- **Fixed** In some rare `onConfirm` and `onCancel` race condition were occurring.

### @semcore/pills

- **Added** Added `behavior` prop for better accessability in forms. Props takes value `tabs` and `radio`, `tabs` is a default value and correspond to the old component behavior.

### @semcore/utils

- **Fixed** Fixed error if token for localization is not defined.

## [13.29.0] - 2023-05-22

### @semcore/base-trigger

- **Changed** Updated border-color for invalid and valid states. Made them more contrast according to accessibility recommendations.
- **Changed** Updated styles for FilterTrigger, added styles for `hover` distinguished from `active` state.

### @semcore/button

- **Changed** Fixed token for text in button with `use="secondary"` and `theme="info"`.

### @semcore/checkbox

- **Changed** Updated border-color for invalid state. Made it more contrast according to accessibility recommendations. HEAD

### @semcore/dropdown-menu

- **Changed** Added visual cue to the `selected` DropdownMenu.Item.

### @semcore/input

- **Changed** Updated border-color for invalid and valid states. Made them more contrast according to accessibility recommendations.

### @semcore/pills

- **Changed** Updated token for `selected` Pill.

### @semcore/radio

- **Changed** Fixed token for background-color of the checked Checkbox.

### @semcore/utils

- **Changed** Updated reference for `--text-placeholder` token from `--gray-300` to `--gray-400`, to add more contrast to all placeholder texts in all components.

## [13.28.0] - 2023-05-22

### @semcore/input-number

- **Changed** Prevent page scrolling while incrementing or decrementing input value with mouse wheel.

### @semcore/modal

- **Added** Set default color of modals for better support of dark themes.

### @semcore/popper

- **Added** Set default color of popper for better support of dark themes.

## [13.27.4] - 2023-05-15

### @semcore/d3-chart

- **Fixed** Fixed radial tree icons displaying.

### @semcore/inline-input

- **Fixed** Pressing `Escape` or `Enter` might trigger both `onConfirm` and `onCancel`.

## [13.27.3] - 2023-05-12

### @semcore/feedback-form

- **Fixed** Fixed empty tooltip content while fading out.

### @semcore/pagination

- **Changed** Improved next and prev buttons aria labels.

### @semcore/utils

- **Fixed** Fixed `i18n` interpolation of falsable values.

## [13.27.2] - 2023-05-10

### @semcore/divider

- **Changed** Role `separator` and `aria-orientation` were added for better accessability.

### @semcore/portal

- **Fixed** Fixed SSR when `ignorePortalsStacking` is turned on.

### @semcore/tooltip

- **Fixed** Screen reader tooltip content updates correctly on change
- **Changed** Changed content layout for screen reader. Now it's in `Tooltip.Popper`

### @semcore/utils

- **Fixed** Made automatic focus return more friendly for modals and side panels.

## [13.27.1] - 2023-05-04

### @semcore/badge

- **Changed** Made default `<Badge />` background more contrast.

### @semcore/carousel

- **Changed** Made `<Carousel />` arrows color more contrast.

### @semcore/drag-and-drop

- **Changed** Made draggable elements dragging pattern more contrast.

### @semcore/pills

- **Added** Allowed pills focus navigation with left and right keyboard arrows.

### @semcore/skeleton

- **Changed** Hid skeleton for screen readers.

### @semcore/tab-line

- **Fixed** Fixed uncontrolled `<TabLine />` animation.

## [13.27.0] - 2023-05-04

### @semcore/popper

- **Fixed** Using `ignorePortalsStacking` on top-level poppers was causing application crash.

### @semcore/radio

- **Added** Added the ability to set tag for `RadioGroup`.

### @semcore/scroll-area

- **Fixed** `<ScrollArea.Bar />` component might break app in some rare use cases.

## [13.26.0] - 2023-05-03

### @semcore/animation

- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

### @semcore/counter

- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

### @semcore/drag-and-drop

- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

### @semcore/ellipsis

- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

### @semcore/scroll-area

- **Changed** Added required `role` and `aria` attributes for better screen readers support.
- **Changed** Scroll area container are now focusable by keyboard.

### @semcore/utils

- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [13.25.2] - 2023-05-02

### @semcore/animation

- **Fixed** Fixed collapse animations blinking.

### @semcore/carousel

- **Fixed** Fixed image display when specifying an index other than 0.

## [13.25.1] - 2023-04-28

### @semcore/carousel

- **Fixed** Fixed warnings in development mode.

### @semcore/fullscreen-modal

- **Fixed** Added `aria-label` for the close icon.

### @semcore/grid

- **Fixed** Fixed warnings in development mode.

### @semcore/input

- **Fixed** Moved paddings from container to `<Input.Value />` and `<Input.Addon />` to fix addons in inputs of large size.
- **Fixed** `<Input.Addon />` now automatically takes size of `<Input />`.
- **Fixed** Fixed right border duplication when last addon is build on top of `<Button />`.

## [13.25.0] - 2023-04-26

### @semcore/animation

- **Fixed** Fixed collapse animations (e.g. used in `<Accordion />`) in Safari.

### @semcore/data-table

- **Fixed** Fixed missing `key` warning.

### @semcore/date-picker

- **Changed** Improved date picker rendering performance.

### @semcore/typography

- **Added** Added `uppercase`, `lowercase`, `capitalize` text transformation props.

## [13.24.0] - 2023-04-24

### @semcore/date-picker

- **Fixed** Fixed issue with custom styles when using `shadow-loader` plugin.

### @semcore/modal

- **Added** Added `disablePreventScroll` prop.

### @semcore/side-panel

- **Added** Added `disablePreventScroll` prop.

### @semcore/utils

- **Fixed** Fixed `usePreventScroll` (used in `<Modal />` and `<ScrollBar />`) might totally block document body scroll with async components appearing and fading.

## [13.23.0] - 2023-04-19

### @semcore/color-picker

- **Fixed** Added `aria-hidden="true"` for input control because they are auxiliary.

### @semcore/d3-chart

- **Fixed** Fixed calculating height of `StackBar` and `HorizontalBar` components.

### @semcore/fullscreen-modal

- **Changed** Default title tag switched from `h4` to `h2` without changing visual representation.
- **Fixed** Fixed ability to control from keyboard for `Close` and `Back`.

### @semcore/inline-edit

- **Fixed** Improvements for a11y. Added more correct label. Added role attribute. Return focus on cancel or confirm.

### @semcore/inline-input

- **Fixed** Improvements for a11y. Hidden controls because they are accessible via the keyboard.

### @semcore/input

- **Changed** Fixed outline styles so that they work even if the `Value` is wrapped in other elements.

### @semcore/input-mask

- **Changed** Remove `aria-invalid` because you can't enter the wrong value.
- **Changed** Added hint for screen reader.
- **Changed** Controls are now `display:none` rather than `visibility:hidden`, this gives more space for placeholder.

### @semcore/link

- **Fixed** Fixed visual keyboard focus highlight of inline links.

### @semcore/popper

- **Fixed** `interaction=hover` poppers now might be triggered by keyboard focus (but not mouse focus).

### @semcore/product-head

- **Changed** Changed `tag` of `Title` from `div` to `h1` for better accessibility.

### @semcore/select

- **Added** Added `aria-multiselectable` attribute to `Menu` component for better accessibility.
- **Added** Return focus to trigger when option is selected.

### @semcore/spin

- **Added** Added `aria-hidden` attribute for better accessibility.

### @semcore/time-picker

- **Added** Added ARIA attributes for better accessibility.

### @semcore/utils

- **Fixed** Fixed behavior when returning focus. Now focus return does not work if user used the mouse.
- **Change** Added `id` propertie for `ScreenReaderOnly` component.
- **Fixed** Keyboard focus highlight wasn't working until keyboard focuses any focusable element second time.
- **Fixed** Delayed focus return in the macrotask to prevent focus return trigger event passing to to the return focus target.

### @semcore/wizard

- **Changed** Title got semantic `h2` tag.
- **Fixed** Added screen reader only hint about completed steps.

## [13.22.2] - 2023-04-11

### @semcore/button

- **Fixed** Removed `role=button` from native button.

### @semcore/input-tags

- **Fixed** Non-interactive container are not focusable by keyboard now.

### @semcore/pagination

- **Fixed** Fixed "confirm" icon keyboard navigation.

### @semcore/tab-line

- **Fixed** Fixed `aria-posinset` attribute value generation.

### @semcore/tab-panel

- **Fixed** Fixed `aria-posinset` attribute value generation.

### @semcore/tag

- **Fixed** Non-interactive tags are not focusable by keyboard now.

### @semcore/tooltip

- **Fixed** Turn `aria-haspopup` to `false` for Tooltip with `hover=interaction`.

## [13.22.1] - 2023-04-11

### @semcore/feedback-form

- **Changed** Patched `final-form` to meet `react-final-form` peer dependency.

## [13.22.0] - 2023-04-11

### @semcore/data-table

- **Changed** Changed the presentation of the sort icon. Now it always runs into the text.

### @semcore/ellipsis

- **Changed** Added React 18 to the peer dependencies.

### @semcore/feedback-form

- **Changed** Patched `react-final-form` to the latest version.

### @semcore/select

- **Added** Return focus to trigger when option is selected.

## [13.21.0] - 2023-04-03

### @semcore/animation

- **Fixed** Nested animation might take initial keyframe from animated parent component in some cases.

### @semcore/carousel

- **Fixed** Fixed carousel html roles.

### @semcore/checkbox

- **Fixed** Fixed `aria-checked` attribute values.

### @semcore/drag-and-drop

- **Fixed** Fixed screen reader annotation of visually untitled items.

### @semcore/popper

- **Changed** Moved screen reader hint from `aria-label` attribute to `aria-live="polite"` alert block.
- **Changed** Improved keyboard navigation on exit from focus-triggered popovers.

### @semcore/tooltip

- **Changed** Tooltip with `hover` `interaction` content is duplicated into screen-reader-only block.

## [13.20.5] - 2023-03-31

### @semcore/d3-chart

- **Fixed** Fixed calculating width of `HorizontalBar` component.
- **Fixed** Fixed display `Line.Null`.
- **Fixed** Fixed adding custom styles for `Radar` chart.

### @semcore/input-tags

- **Fxed** Fixed scrolling when paste and enter items.

## [13.20.4] - 2023-03-30

### @semcore/input-tags

- **Added** Added checking if the input `ref` has `scrollIntoView` method.

## [13.20.3] - 2023-03-30

### @semcore/input-tags

- **Fixed** Fixed checking if the input `ref` is exists.

## [13.20.2] - 2023-03-29

### @semcore/d3-chart

- **Fixed** Fixed calculating height of `Bar` component.

## [13.20.1] - 2023-03-29

### @semcore/date-picker

- **Added** Added default color (`--intergalactic-text-primary`) to the component.

### @semcore/dropdown

- **Added** Added default color (`--intergalactic-text-primary`) to the component.

### @semcore/dropdown-menu

- **Added** Added default color (`--intergalactic-text-primary`) to the component.

### @semcore/input-mask

- **Changed** Changed color in default and focused states as in `Figma`.

### @semcore/notice

- **Added** Added default color (`--intergalactic-text-primary`) to the component.

### @semcore/pagination

- **Added** Added design tokens to `TotalPages` component.

### @semcore/radio

- **Added** Added default color (`--intergalactic-text-primary`) to the component.

### @semcore/switch

- **Fixed** Fixed that switch with single label was turning label into secondary text color.

### @semcore/time-picker

- **Added** Added default color (`--intergalactic-text-primary`) to `Separator` component.

### @semcore/tooltip

- **Fixed** Fixed tooltip border color for default theme.

## [13.20.0] - 2023-03-28

### @semcore/animation

- **Added** Animation context that allows children components react to parent animation execution.

### @semcore/portal

- **Added** Supported ignoring parent portals nesting via `ignorePortalsStacking`.

### @semcore/utils

- **Added** Small internal util for context consuming in class-based components.

## [13.19.1] - 2023-03-28

### @semcore/d3-chart

- **Fixed** Added correct display when there is no data in a11y table.

### @semcore/feedback-form

- **Fixed** Added a11y error binding to field.

### @semcore/utils

- **Fixed** Utils package was breaking building via webpack and vite.

## [13.19.0] - 2023-03-24

### @semcore/animation

- **Added** Added `pointer-events` properties to scale group `keyframes` to avoid problems with overlapping elements and changing the cursor.

### @semcore/dot

- **Fixed** Fixed local themes on dot.

### @semcore/modal

- **Fixed** Fixed local themes in modals.

### @semcore/notice-bubble

- **Fixed** Fixed local themes in notice bubbles.

### @semcore/popper

- **Fixed** Fixed local themes in poppers.

### @semcore/portal

- **Removed** Non-working portalled local theme reapplying.

### @semcore/side-panel

- **Fixed** Fixed local themes in side panels.

### @semcore/utils

- **Added** Supported portalled local theme reapplying in class-based components.
- **Removed** Removed `Status` group in semantic tokens.
- **Changed** Moved the gray-white token in front of the gray-50, slightly tweaked the order.

## [13.18.0] - 2023-03-23

### @semcore/accordion

- **Fixed** Toggles attributes `aria-expanded` and `aria-controls` were not applied when accordion section was closed.

### @semcore/badge

- **Fixed** Made Badge visible for screen readers again.

### @semcore/card

- **Fixed** Made `<Card.Title />` `hint` available for screen readers.

### @semcore/d3-chart

- **Added** Added `additionalFields` in `a11yAltTextConfig` for extra text description to the data when using a screen reader

### @semcore/dropdown

- **Fixed** `aria-controls` and `aria-expanded` html attributes wasn't applied on closed dropdown.

### @semcore/dropdown-menu

- **Added** Added `z-index: 0` to `DropdownMenu.List` so that it doesn't overlap the focus border of neighboring elements.
- **Fixed** `aria-controls` and `aria-expanded` html attributes wasn't applied on closed dropdown.
- **Fixed** Navigating options with keyboard now doesn't trigger browser focus.
- **Fixed** `aria-activedescendant` now is properly updated on keyboard navigation.

### @semcore/feature-popover

- **Fixed** Add tabIndex for Icon close.

### @semcore/feedback-form

- **Added** Added properties `backgrouund` and `theme` responsible for spinner theme.

### @semcore/select

- **Fixed** `aria-controls` and `aria-expanded` html attributes wasn't applied on closed dropdown.
- **Fixed** `aria-activedescendant` was applied to selected option but not on focused one.
- **Fixed** Option keys are now based on option value.
- **Fixed** Removed unexpected tabIndex=-1.

### @semcore/utils

- **Added** Added internal util `ScreenReaderOnly` to declaratively put screen reader only text in the components.

## [13.17.2] - 2023-03-22

### @semcore/notice-bubble

- **Fixed** Default export typings wasn't corresponding to the runtime one.
- **Changed** Added `noticeBubbleDefaultManager` export that is equal to the default export.
- **Changed** Deprecated default export. `noticeBubbleDefaultManager` is recommended as a drop-in replacement.

### @semcore/utils

- **Fixed** Focus locked tab navigation might cause scrolling to the end or to the start of the page.

## [13.17.1] - 2023-03-21

### @semcore/d3-chart

- **Fixed** Fixed `Radar` chart with negative rotation hover handling.

### @semcore/input-tags

- **Fixed** Fixed alignment cursor when there are no tags.

## [13.17.0] - 2023-03-21

### @semcore/icon

- **Added** Added `GitHubInvert` icon.

### @semcore/input-tags

- **Fixed** Fixed tag display when crossing the border during scroll.
- **Fixed** Fixed tag alignment when set minimum height.

### @semcore/widget-empty

- **Changed** Updated `Error` view texts in all languages.
- **Changed** Updated `NoData` view texts in all languages.

## [13.16.0] - 2023-03-16

### @semcore/core

- **Changed** Changed logic of merging component styles and context styles due to losing context styles before.

## [13.15.0] - 2023-03-16

### @semcore/d3-chart

- **Added** Add `angleOffset` parameter to `Radar` chart.

### @semcore/errors

- **Changed** Changed Title's font-weight from `bold` to `semi-bold`.

## [13.14.1] - 2023-03-16

### @semcore/feedback-form

- **Fixed** Fixed padding for the success state of the feedback form.

### @semcore/utils

- **Fixed** Fixed focus lock might cause infinite focus war when multiple focus locks exist on same page.

## [13.14.0] - 2023-03-15

### @semcore/d3-chart

- **Changed** Much improved a11y summary generation for `Radar` chart.

### @semcore/date-picker

- **Fixed** Fixed color of selected period.

### @semcore/modal

- **Fixed** Fixed focus locking and returning.

### @semcore/notice-bubble

- **Added** Properties to add icons to notices.
- **Added** `NoticeBubbleManager` method typings.
- **Added** Documentation examples.
- **Fixed** Disappear animation of stacked notices.
- **Fixed** Warning notices were not removable.
- **Fixed** Default links color.
- **Changed** Deprecated adding notices by `NoticeBubble` and `NoticeBubbleWarning` without `NoticeBubbleManager`.
- **Fixed** Fixed typings of exported `NoticeBubbleManager`.

### @semcore/popper

- **Fixed** Fixed focus locking and returning.

### @semcore/side-panel

- **Fixed** Fixed focus locking and returning.

### @semcore/utils

- **Added** Added `lib/use/useFocusLock` util to control focus lock in popup components (like `Popper`-based, `Modal` and `Sidebar`).

## [13.13.1] - 2023-03-10

### @semcore/tooltip

- **Fixed** Fixed tooltip borders color.

## [13.13.0] - 2023-03-09

### @semcore/d3-chart

- **Added** Added footer in d3 Tooltip.
- **Fixed** Added backward compatibility with react 16.9.

### @semcore/slider

- **Fixed** Fixed non-enumerable slider with provided minimal value.
- **Fixed** Fixed component typings.

## [13.12.0] - 2023-03-06

### @semcore/d3-chart

- **Added** Added a new chart type `Radar`.

### @semcore/dropdown

- **Fixed** Fixed the ability to move text to the next line with the Enter key in `Textarea`.

### @semcore/dropdown-menu

- **Fixed** Fixed the ability to move text to the next line with the Enter key in `Textarea`.

### @semcore/select

- **Fixed** Fixed automatic scrolling to selected option on popper open wasn't working.
- **Added** Added prop `scrollToSelected` to control automatic scroll to selected option on popper open.

## [13.11.2] - 2023-03-03

### @semcore/d3-chart

- **Fixed** Fixed summary generation was broken after i18n enhancement release.

### @semcore/feature-popover

- **Fixed** Fixed `animationsDisabled` prop passing.

### @semcore/flags

- **Fixed** European Union flag with 2x size was fixed again and never again :D.
- **Fixed** European Union flag with 2x size was fixed.

### @semcore/icon

- **Removed** Removed automatic setting of `aria-hidden` to `true`.

### @semcore/modal

- **Fixed** Fixed `animationsDisabled` prop passing.

### @semcore/popper

- **Fixed** Fixed `animationsDisabled` prop passing.

### @semcore/side-panel

- **Fixed** Fixed `animationsDisabled` prop passing.

## [13.11.1] - 2023-03-01

### @semcore/d3-chart

- **Fixed** Fixed summary generation was broken after i18n enhancement release.

## [13.11.0] - 2023-03-01

### @semcore/flags

- **Added** New European Union flag has been added to the set.

### @semcore/icon

- **Fixed** Fixed DOM attributes `aria-hidden` and `role` were not overridable.

### @semcore/tab-line

- **Fixed** Fixed underline width glitching by rebuilding internal animation mechanism.

## [13.10.0] - 2023-02-28

### @semcore/animation

- **Fixed** Fixed `ISlideProps` interface structure.

### @semcore/icon

- **Fixed** Fixed path for `Confluence`, `GoogleCloud`, `Hubspot`, `JavaScript`, `LookerStudio` icons.

## [13.9.1] - 2023-02-22

### @semcore/popper

- **Fixed** Fixed popper autofocus wasn't working if popper contains any focusable elements.

## [13.9.0] - 2023-02-21

### @semcore/accordion

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/animation

- **Added** Added prop `animationsDisabled` to disable components' animation.
- **Added** Added prop `timingFunction` to control animation easing.
- **Added** Added `<Scale />` and `<Slide />` animation components.

### @semcore/base-trigger

- **Added** Added triggers width animation triggered by change of `value` prop.

### @semcore/checkbox

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/counter

- **Added** Added `<AnimatedNumber />` exported component.

### @semcore/d3-chart

- **Fixed** Added check for the presence of DON at start of animation for `RadialTree`.

### @semcore/data-table

- **Fixed** Fixed empty table body with virtual scroll enabled displays unexpected "0".

### @semcore/i18n-unplugin

- **Fixed** Added error message for empty `bundleLocale` list in plugin options.

### @semcore/inline-edit

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/modal

- **Added** Added appear and disappear animation.

### @semcore/notice-bubble

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/notice-global

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/popper

- **Added** Added appear and disappear animation.

### @semcore/radio

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/side-panel

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/slider

- **Added** Added value change animation.

### @semcore/switch

- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Little animation of switch active state.
- **Fixed** Fixed double click call.

### @semcore/tab-panel

- **Changed** Animation duration now might be controlled with design tokens.

### @semcore/utils

- **Fixed** In some cases `<ThemeProvider />` was breaking rendering process.
- **Added** Added semcore enhance to animate component dimensions on change of specific props.

## [13.8.1] - 2023-02-16

### @semcore/ellipsis

- **Fixed** Ellipsis wasn't working when tooltip was disabled.

### @semcore/switch

- **Fixed** Text on left and right sides of the Switch are using with "pointer" cursor when component is not disabled.

## [13.8.0] - 2023-02-16

### @semcore/ellipsis

- **Added** Supported passing tooltip props.

### @semcore/i18n-unplugin

- **Fixed** Fixed wrong intergalactic components filtering path.
- **Fixed** Fixed invalid syntax producing with multiple locales.

### @semcore/icon

- **Added** Added `JavaScript` icon.

## [13.7.0] - 2023-02-13

### @semcore/badge

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-badge-rounded`).

### @semcore/base-trigger

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/breadcrumbs

- **Fixed** Fixed hovered state color.

### @semcore/button

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/card

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).

### @semcore/carousel

- **Changed** Split rounding design tokens (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded` and `--intergalactic-control-rounded`).

### @semcore/checkbox

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-addon-rounded`).

### @semcore/counter

- **Changed** Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-counter-rounded`).

### @semcore/d3-chart

- **Fixed** Fixed display of `Bar` with height 0 - it is should not be rendered.
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

### @semcore/date-picker

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/divider

- **Fixed** Fixed inverted state colors.

### @semcore/dot

- **Fixed** Fixed `m` and `l` sizes rounding.

### @semcore/drag-and-drop

- **Changed** Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-surface-rounded`).

### @semcore/dropdown

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

### @semcore/dropdown-menu

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/feature-popover

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

### @semcore/feedback-form

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).

### @semcore/icon

- **Changed** Renamed `YoutubeAlt` icon to `YoutubeColored`.
- **Changed** Renamed `YoutubeRed` icon to `YoutubeInvert`.

### @semcore/input

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/modal

- **Changed** Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-modal-rounded`).

### @semcore/notice

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).

### @semcore/notice-bubble

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

### @semcore/pills

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/progress-bar

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-progress-bar-rounded`).

### @semcore/scroll-area

- **Fixed** Fixed scroll bars rounding (`3px` -> `4px`).

### @semcore/select

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/slider

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-progress-bar-rounded`).

### @semcore/switch

- **Changed** Renamed rounding design token (`--intergalactic-rounded-extra-large` -> `--intergalactic-switch-rounded`).

### @semcore/tab-panel

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/tag

- **Changed** Renamed rounding design token (`--intergalactic-rounded-extra-large` -> `--intergalactic-tag-rounded`).

### @semcore/textarea

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/time-picker

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).

### @semcore/tooltip

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).

### @semcore/utils

- **Changed** Changed design tokens facebook color (`#3b5998` -> `#1877f2`).
- **Changed** Changed design tokens linkedIn color (`#1a7ab2` -> `#0a66c2`).
- **Changed** Changed design tokens twitter color (`#2bafeb` -> `#1d9bf0`).

### @semcore/wizard

- **Fixed** Fixed issue with scroll on small screen
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`, `--intergalactic-rounded-large` -> `--intergalactic-modal-rounded`).

## [13.6.2] - 2023-02-07

### @semcore/carousel

- **Fixed** Fixed freezing when slide index is greater than number of slides.

### @semcore/d3-chart

- **Fixed** Fixed animation for `Donut`.
- **Changed** Changed minimum height in types for `Bar`.

### @semcore/data-table

- **Fixed** Fixed view of cells when using cell grouping and columns at the same time.

### @semcore/ellipsis

- **Fixed** Stopped showing tooltip if text is not truncated.

## [13.6.1] - 2023-01-26

### @semcore/d3-chart

- **Fixed** Fixed and changed minimum height of `Bar`.
- **Fixed** Fixed definition of users locale.

### @semcore/data-table

- **Fixed** Fix floating sort icon to right align.

## [13.6.0] - 2023-01-20

### @semcore/d3-chart

- **Fixed** Fixed animation in React strict mode for `RadialTree` and `Donut`.

### @semcore/icon

- **Added** Added `TwitterCarousel`, `TopStories`, `WebStories`, `FindResultsOn`, `InterestingFinds`, `Event`, `SeeResultsAbout`, `PopularProducts`, `RelatedProducts`, `AddressPack`, `RelatedSearches`, `ShortVideos`, `NotificationNo` icons.

### @semcore/utils

- **Changed** Put all css `:hover` selectors into `@media(hover: hover)` block.

## [13.5.0] - 2023-01-19

### @semcore/accordion

- **Added** Added `duration` property to `Accordion.Item` types.

### @semcore/base-trigger

- **Fixed** Removed font-family enforcement.

### @semcore/breadcrumbs

- **Fixed** Removed font-family enforcement.

### @semcore/button

- **Fixed** Removed font-family enforcement.

### @semcore/card

- **Fixed** Removed font-family enforcement.

### @semcore/color-picker

- **Fixed** Removed font-family enforcement.
- **Fixed** Fixed color picker display when using non-extended `<ColorPicker />`.

### @semcore/date-picker

- **Fixed** Fixed `DatePicker.InputTrigger` edited text highlight color.

### @semcore/fullscreen-modal

- **Fixed** Removed font-family enforcement.

### @semcore/modal

- **Added** Added `Modal.Title` component and `aria-labelledby` property for better a11y.

### @semcore/notice-bubble

- **Fixed** Removed minimal height limitation.

### @semcore/side-panel

- **Fixed** Removed font-family enforcement.

### @semcore/utils

- **Changed** Renamed `--intergalactic-border-danger` token name to `--intergalactic-border-critical`.
- **Changed** Renamed `--intergalactic-border-danger-active` token name to `--intergalactic-border-critical-active`.
- **Changed** Renamed `--intergalactic-border-table-accent-border` token name to `--intergalactic-border-table-accent`.
- **Changed** Added description for every design token.
- **Changed** No other renaming expected in the future.

## [13.4.0] - 2023-01-16

### @semcore/popper

- **Fixed** Fixed focus hijacking by non editable poppers.

## [13.3.0] - 2023-01-16

### @semcore/i18n-unplugin

- **Added** Added `@semcore/ui/i18n-unplugin`.

### @semcore/illustration

- **Added** Added `Feedback` illustration.

## [13.2.13] - 2023-01-11

### @semcore/animation

- **Fixed** Fixed flickering in `Collapse` animation.

### @semcore/d3-chart

- **Fixed** Added prop `transparent` for all charts opacity

### @semcore/dropdown-menu

- **Fixed** Fixed error loading styles in correct order for `mini-css-extract-plugin`.

### @semcore/errors

- **Fixed** Fixed French, Japanese and Turkish translations.

### @semcore/flags

- **Fixed** Fixed internal imports after babel transformation were causing "named import from json" errors in some bundlers.

### @semcore/icon

- **Changed** Renamed `Stoller` icon to `Stroller`.

### @semcore/inline-input

- **Fixed** Fixed displaying tooltip of `ConfirmControl`.
- **Changed** Changed all translations of `CancelControl` text tooltip.

### @semcore/input-number

- **Added** Added Korean translation.

### @semcore/select

- **Fixed** Fixed typo in property `tabIndex`.

## [13.2.12] - 2023-01-09

### @semcore/d3-chart

- **Added** Added prop `transparent` for charts opacity

### @semcore/dropdown-menu

- **Changed** `DropdownMenu.Popper` closes when the `Enter` button is pressed.

### @semcore/utils

- **Fixed** Fixed internal mechanism of interpolating variables into translated texts.

## [13.2.11] - 2023-01-04

### @semcore/ellipsis

- **Fixed** Remove react warning with non-html props.

### @semcore/format-text

- **Fixed** Fixed css variable design tokens.

### @semcore/notice-global

- **Added** Added cursor change when hovering `NoticeGlobal.CloseIcon`.

### @semcore/tag

- **Fixed** Fixed css variable design tokens.

## [13.2.10] - 2022-12-27

### @semcore/card

- **Fixed** Hint tooltip is centered vertically.

### @semcore/d3-chart

- **Fixed** Fixed `Donut` chart rendering when hovering over a chart while it is loading.

### @semcore/data-table

- **Fixed** Fix style for `resizable`.

### @semcore/dropdown-menu

- **Added** Added `box-sizing` for correct offset display.

### @semcore/icon

- **Added** Added `Jewelry`, `Photo`, `Military`, `Restaurant`, `Music`, `Recreation`, `Events'`, `Cosmetics`, `Fashion`, `Printing`, `Science`, `Comics`, `Gambling`, `Architecture`, `Veterinary`, `Furniture`, `Adult`, `Religion`, `PublicSafety`, `Security`, `Fish`, `Law`, `Oil`, `Packaging`, `Logistic`, `Marine`, `PublicUtility`, `Craft`, `Sport`, `Car`, `Games`, `Language`, `Smoking`, `Farm`, `Food`, `Wine` icons.

### @semcore/widget-empty

- **Fixed** Fixed image size.

## [13.2.9] - 2022-12-22

### @semcore/data-table

- **Changed** Removed vertical borders from header cells.
- **Changed** Added props `vBorders`, `borderLeft` and `borderRight` to have possibility to render vertical borders.
- **Changed** Added prop `compact` to reduce table paddings.
- **Changed** Added gradient to the sorting icon.

## [13.2.8] - 2022-12-21

### @semcore/base-trigger

- **Fixed** Fixed the problem of not showing the placeholder when the body of the `BaseTrigger` is empty.

### @semcore/format-text

- **Fixed** Fixed underline for links from the design system.

### @semcore/link

- **Fixed** Fixed vertical align for use as a text link.

### @semcore/select

- **Fixed** Fixed display of placeholder with empty value.

### @semcore/tag

- **Fixed** Fixed css syntax error.

## [13.2.7] - 2022-12-19

### Global

- **Added** Added internationalization of aria attributes.

### @semcore/d3-chart

- **Changed** Supported semi-async internationalization of text in a11y module.

### @semcore/format-text

- **Fixed** Fixed syntax css.

### @semcore/illustration

- **Changed** Added `react-dom` to peer dependencies.

### @semcore/ui

- **Fixed** Normalized path to re-export `@semcore/illustration`.

### @semcore/utils

- **Fixed** Fixed non-react node detection for `addonTextChildren`.
- **Changed** Supported semi-async internationalization.

## [13.2.6] - 2022-12-14

### @semcore/illustration

- **Fixed** Fixed illustrations reexports.

## [13.2.5] - 2022-12-14

### @semcore/base-trigger

- **Fixed** Fixed hardcoded spacing style literal.

### @semcore/link

- **Fixed** Fixed supporting ellipsis links with addon.

### @semcore/progress-bar

- **Fixed** Fixed default theme background.

## [13.2.4] - 2022-12-13

### Global

- **Changed** Added `react-dom` to peer dependencies.

### @semcore/base-trigger

- **Changed** The icon in `LinkTrigger` is centered vertically.

### @semcore/dropdown-menu

- **Fixed** Fix tabulation and moving highlighted items

### @semcore/link

- **Changed** `Link.Addon` is centered vertically.

## [13.2.3] - 2022-12-09

### @semcore/animation

- **Changed** Changed prop `initialAnimation` to optional.

### @semcore/feature-popover

- **Fixed** Opening animation is working again.

### @semcore/notice-bubble

- **Changed** Changed prop `initialAnimation` to optional.

### @semcore/scroll-area

- **Fixed** Fixed calculation size when changing height of the container.

## [13.2.2] - 2022-12-07

### @semcore/animation

- **Added** Added prop `initialAnimation` to run animation on the first rendering

### @semcore/flags

- **Fixed** Fixed exporting `iso2Name`, `iso3iso2` and `nameWithoutIso` because of linter warnings.

### @semcore/input

- **Added** Added type `IInputCtx` for export.

### @semcore/input-tags

- **Fixed** Fixed `Value` type

### @semcore/notice-bubble

- **Fixed** Fixed `NoticeBubbleManager` types
- **Added** Added prop `initialAnimation` to run animation on the first rendering

### @semcore/select

- **Fixed** Fixed screen readers support for `Select.List`

### @semcore/wizard

- **Fixed** Fixed layout so that the white background in the rounded borders of the modal would not be visible.

## [13.2.1] - 2022-12-02

### @semcore/dropdown-menu

- **Changed** Changed size of shadow in `DropdownMenu.List` from `9px` to `16px`.

### @semcore/flags

- **Added** Added missed object `iso3iso2` in `index.d.ts` for exporting.

### @semcore/input-tags

- **Fixed** Fixed exported types of components.

## [13.2.0] - 2022-11-30

### @semcore/base-trigger

- **Added** Added support text ellipsis in `LinkTrigger.Text`.

### @semcore/checkbox

- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`.

### @semcore/d3-chart

- **Fixed** Allowed to pass any svg attributes.
- **Fixed** Fixed `Bar` click handler typings.
- **Fixed** Fixed support handling of bars event handling with `paddingOuter`.
- **Added** `Bar` component now supports `onClick` handler with bar data in callback.

### @semcore/date-picker

- **Fixed** Fixed InputTrigger subcomponent types.

### @semcore/dot

- **Added** Added css property `isolation` to container.

### @semcore/drag-and-drop

- **Changed** Component was fully rebuilt internally. Backward capability mostly preserved, legacy apis was marked as deprecated.

### @semcore/dropdown-menu

- **Changed** Due to the effect of cutting off the last line, it was decided to add a shadow to the container (`DropdownMenu.List`) when scrolling.
- **Changed** Changed `margin` to `padding` to make the scrollbar look better.
- **Changed** Now highlighted tabs are also browser focused.

### @semcore/flags

- **Changed** Fixed few countries flag displaying.
- **Changed** Removed North Ireland flag as far as image of North Ireland flag was always missing in repository and random image was displayed instead.

### @semcore/flex-box

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/format-text

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/icon

- **Added** Added `Rephrase`, `SimplifyText`, `ExpandText` icons.

### @semcore/inline-input

- **Fixed** Disabled moving focus in tooltips.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.

### @semcore/input

- **Fixed** Fix style for disabled state.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.
- **Added** Added `aria-invalid` for input in invalid state.

### @semcore/input-mask

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/input-tags

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/notice-bubble

- **Fixed** Replaced `NoticeBubbleManager` instance typings with `NoticeBubbleManager` typing.
- **Fixed** Export of `NoticeBubbleManager` was missing in typings.

### @semcore/outside-click

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/pagination

- **Fixed** Fixed attributes and line-height for last page

### @semcore/pills

- **Added** Added css property `isolation` to container.

### @semcore/portal

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/product-head

- **Fixed** Fixed showing types in autocomplete IDE.
- **Changed** Changed margin-bottom from 16px to 24px.

### @semcore/radio

- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`.

### @semcore/skeleton

- **Changed** Removed `width` and `height` properties from `VennChartSkeleton` and `PieChartSkeleton`.

### @semcore/sticky

- **Fixed** Fixed showing types in autocomplete IDE.

### @semcore/tab-line

- **Changed** Changed `font-weight` of tab's text and `height` of underline.

### @semcore/tab-panel

- **Changed** Tabs focus doesn't trigger tab select.
- **Changed** Pressing "Enter" and "Space" keys focuses current tab.
- **Changed** Changed `font-weight` of tab's text.

### @semcore/tag

- **Added** Added hover styles for close icon.

### @semcore/textarea

- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.

### @semcore/tooltip

- **Changed** Updated border-color for `warning` theme from `--red-400` to `--red-500`.

### @semcore/utils

- **Changed** Changed `keyboard-focus` opacity
- **Added** Added ability to merge `styles` field for `assignProps` function.

## [13.1.1] - 2022-11-09

### @semcore/base-trigger

- **Fixed** Fixed `FilterTrigger` accessability.

### @semcore/checkbox

- **Fixed** Fixed displaying in unchecked and disabled state.

### @semcore/d3-chart

- **Fixed** Fixed hover and active animated for `Donut` chart.

### @semcore/date-picker

- **Fixed** Fixed input trigger visual divergence from initial design.
- **Fixed** Removed lock on fixed version of `@semcore/input`.

### @semcore/ellipsis

- **Added** Component was added to export of `@semcore/ui`.

### @semcore/icon

- **Added** Added `LookerStudio` icon.

### @semcore/input-mask

- **Fixed** Fixed mask and text line-height mismatch.

### @semcore/pagination

- **Fixed** Fixed styles for last and single pages

## [13.1.0] - 2022-11-03

### @semcore/animation

- **Added** Added a property that removes the `overflow=hidden` setting.
- **Changed** Returning the original `overflow` after the animation has passed.

### @semcore/button

- **Fixed** Lazy checks for necessity of `aria-label` in non production environment.

### @semcore/carousel

- **Fixed** Fixed screen readers support.

### @semcore/checkbox

- **Fixed** Fixed displaying in unchecked and disabled state.

### @semcore/color-picker

- **Fixed** Fixed screen readers support.

### @semcore/d3-chart

- **Fixed** Fixed hover and active animated for `Donut` chart.
- **Fixed** Fixed display of minimum bar size in `StackBar`.
- **Added** Added display of minimum bar size in `HorizontalBar`.
- **Fixed** Fixed inner radius for `Donut` chart. It began to equal what is indicated in the `innerRadius` prop.
- **Fixed** Fixed reference lines were missing dashed style.
- **Fixed** Fixed typings of render functions.

### @semcore/data-table

- **Added** Support for inheritance of `alignItems` prop from header to cells.
- **Added** Added `disabledScroll` property that disables scrolling in tables.
- **Added** Added the ability(`flex="inherit"`) to inherit the size from the top table.

### @semcore/date-picker

- **Fixed** Removed lock on fixed version of `@semcore/input`.

### @semcore/errors

- **Fixed** Fixed paddings.

### @semcore/icon

- **Fixed** Lazy checks for necessity of `aria-label` in non production environment.
- **Changed** Updated `Text` icon.
- **Added** Added icon `GoogleAds`

### @semcore/inline-edit

- **Fixed** Removed wrong aria role and added needed aria label.

### @semcore/inline-input

- **Added** Added accessability needed aria label.

### @semcore/input-mask

- **Fixed** Fixed mask and text line-height mismatch.
- **Added** Allowed to pass children.

### @semcore/link

- **Fixed** Lazy checks for necessity of `aria-label` in non production environment.

### @semcore/modal

- **Changed** Updated `focus-lock`.

### @semcore/popper

- **Changed** Updated `focus-lock`.

### @semcore/side-panel

- **Changed** Updated `focus-lock`.

### @semcore/time-picker

- **Fixed** Fixed that some secret combination of arrows pressing was causing infinite focus call and temporary freeze of browser.
- **Fixed** Fixed Screen readers support.

### @semcore/utils

- **Added** Added `hasLabels` utility.
- **Fixed** Removed `@types/react`, `@types/react-dom` and `@types/node` from package direct dependencies.

## [13.0.2] - 2022-10-20

### @semcore/base-trigger

- **Fixed** Fixed the problem of not showing the placeholder when the body of the `FilterTrigger` is empty.

### @semcore/core

- **Fixed** Fixed calculation children index.

### @semcore/date-picker

- **Changed** Reverting changes from version `3.3.12` as these changes are implemented in the `utils/lib/addonTextChildren`.

### @semcore/dropdown-menu

- **Fixed** Fixed wrong setting of `type=button` attribute for every `DropdownMenu.Trigger` based component.

### @semcore/select

- **Fixed** Fixed unexpected verbose console warnings.

### @semcore/time-picker

- **Fixed** Fixed support of Safari.

### @semcore/utils

- **Fixed** Removed `@types/react`, `@types/react-dom` and `@types/node` from package direct dependencies.

## [13.0.1] - 2022-10-14

### Global

- **Fixed** Fixed reexports of `@semcore/ui` package.

## [13.0.0] - 2022-10-12

### Global

- **Added** Added support for React 18 🔥
- **Fixed** Fixed problems in working with react strict mode.

### @semcore/chart

- **BREAK** The component has been removed from the release system. Use `@semcore/d3-chart`.

### @semcore/neighbor-location

- **BREAK** The approach to determining neighbors has been changed.

### @semcore/table

- **BREAK** The component has been removed from the release system. Use `@semcore/data-table`.

### @semcore/accordion

- **Fixed** Fixed elements id uniqueness.

### @semcore/base-trigger

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

### @semcore/button

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

### @semcore/checkbox

- **Fixed** Added missing `aria-checked` a11y attribute.

### @semcore/color-picker

- **Fixed** Fixed paddings of addons in input.

### @semcore/core

- **Changed** Changed approach to children index calculation with React parallel rendering.

### @semcore/d3-chart

- **Fixed** Ensured a11y module do not break mouse interactions.
- **Fixed** Fixed issue with uninitialized styles in some charts.

### @semcore/data-table

- **Added** Added support `ref` for `DataTable.Column` and `DataTable.Cell`.

### @semcore/date-picker

- **Changed** Changed the way to check the contents of the trigger for `ButtonTrigger`
- **Changed** Changed utils function for `ButtonTrigger`
- **Fixed** Fixed unexpected margin of calendar grid cells in Safari browser.

### @semcore/errors

- **Changed** Moved svg illustrations to `@semcore/illustration` component.

### @semcore/icon

- **Changed** Renamed `AppBlock` icon to `AppsBlock`.
- **Added** Added icon Stoller.
- **Added** Added `Charge`, `CardUpdate`, `ChargebackWin`, `ChargebackLoss` icons.
- **Changed** When `interactive` prop is provided, `aria-label` or `aria-labelledby` props from now are required. If required props are not provided a warning is logged to developer console.

### @semcore/illustration

- **Changed** Remove masks from all svg illustrations for WidgetEmpty component.
- **Added** Added and changed fields `main`, `module` and `typings` in `package.json`.
- **Added** Added missed illustrations and added missed id attribute for some illustrations.
- **Added** Added available for export function `getIllustrationPath` to get url of illustrations.

### @semcore/input

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Changed** Remove useless styles for Addons.

### @semcore/input-mask

- **Fixed** Fixed displaying of addons placed on the end (right in ltr languages) of input.
- **Fixed** Fixed mask underlay position desynchronization with html input content;
- **Fixed** Hidden placeholders and mask from real DOM to exclude it from copied content.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Fixed** Fixed addon placed before input value may be overlayed by input value.
- **Fixed** Fixed previously broken in previous version backward compatibility of piping api.

### @semcore/notice

- **Changed** Color for Close icon with theme `info` was changed from `--blue-400` to `--gray-400`.

### @semcore/pills

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Fixed** Added essential accessibility attributes.

### @semcore/popper

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Fixed** Removed aria attributes that were breaking components a11y.

### @semcore/radio

- **Fixed** Fixed arrangement of internal and external circles in `checked` state.

### @semcore/select

- **Added** Screen readers support.

### @semcore/skeleton

- **Changed** All skeletons are `aria-busy` from now.

### @semcore/slider

- **Changed** Stable release
- **Added** Added box-sizing

### @semcore/sticky

- **Changed** This component has been deprecated. Added a message about it.

### @semcore/switch

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Changed** Improved accessibility with labeling switch by currently picked option.

### @semcore/tab-line

- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]

### @semcore/tab-panel

- **Added** Added styles for panel consisting only of an icon.

### @semcore/utils

- **Fixed** Added a check for empty children for `addonTextChildren` function.

### @semcore/widget-empty

- **Changed** Moved svg illustrations to `@semcore/illustration` component.

## [12.6.0] - 2022-09-22

### @semcore/chart

- **Changed** Mark exported functions as deprecated with recommendation to use `@semcore/d3-chart`.

### @semcore/flags

- **Added** Added access to flags that don't have ISO code.
- **Fixed** Fixed flag name return type.

### @semcore/icon

- **Fixed** Fixed icon Toxic.

### @semcore/progress-bar

- **Fixed** Added essential accessibility attributes.

### @semcore/radio

- **Fixed** Fixed arrangement of internal and external circles in `checked` state.

### @semcore/skeleton

- **Changed** All skeletons are `aria-busy` from now.

### @semcore/slider

- **Added** Out of the box support for multiple choice options.

### @semcore/spin

- **Fixed** Added essential accessibility attributes.

### @semcore/spin-container

- **Fixed** Added essential accessibility attributes.

### @semcore/table

- **Changed** Mark exported functions as deprecated with recommendation to use `@semcore/data-table`.

### @semcore/widget-empty

- **Added** Added Turkish language support.

### @semcore/wizard

- **Added** Added new components.

## [12.5.1] - 2022-09-15

### @semcore/animation

- **Fixed** Fixed playing entering animation if init animation state is already reached.

### @semcore/badge

- **Fixed** Change line-height to correctly display uppercase letters.

### @semcore/button

- **Fixed** Fixed aria warning detection.

### @semcore/color-picker

- **Changed** Changed the logic of entering color format. From this version it is possible to enter hex code in both formats: with `#` sign - `#123123` and without `#` sign - `123123`.

### @semcore/d3-chart

- **Fixed** Changed paths in css files to relative.

### @semcore/data-table

- **Changed** Improved component accessibility in cases of virtual scroll and columns sorting.

### @semcore/feedback-form

- **Added** Added aria attributes for better a11y.

### @semcore/fullscreen-modal

- **Changed** Removed unused `hidden` property from types.

### @semcore/input-tags

- **Added** Added screen reader support

### @semcore/link

- **Fixed** Fixed aria warning detection.

### @semcore/tab-line

- **Fixed** Enforced inner text font line height to prevent possible bottom cut.
- **Fixed** Fixed typos in styles: `lihe-height` -> `line-height`.
- **Fixed** Fixed font height so that the letter "g" would not be cut off.

### @semcore/tab-panel

- **Fixed** Enforced inner text font line height to prevent possible bottom cut.

### @semcore/tag

- **Fixed** Enforced inner text font line height to prevent possible bottom cut.
- **Added** Added screen reader support

### @semcore/tooltip

- **Added** Added `aria-live` attribute for better a11y.

### @semcore/utils

- **Fixed** Added dependency `@types/react-dom` and fix type for `getNodeByRef` function.

## [12.5.0] - 2022-08-29

### @semcore/accordion

- **Fixed** Fixed disabled items handling to improve component accessibility.

### @semcore/animation

- **Fixed** Fixed playing entering animation if init animation state is already reached.

### @semcore/badge

- **Added** Added aria-hidden because component "badge" is not the main functionality and will only confuse the blind user.

### @semcore/breadcrumbs

- **Changed** Added essential `aria-\*` attributes.

### @semcore/button

- **Fixed** Update version `@semcore/utils` to use additional functions.
- **Added** Added empty button aria-label check.

### @semcore/d3-chart

- **Added** Introduced charts accessibility module.
- **Fix** Fixed `ResponsiveContainer` memory leak on unmount.
- **Fix** `Venn` chart was not mentioned in exported types.

### @semcore/date-picker

- **Added** Added Turkish language support.
- **Changed** Removed spaces around dash in formatted date.

### @semcore/errors

- **Changed** Updated translations.
- **Added** Added Turkish language support.
- **Added** Added `role="alert"` attributes to increase support for a11y.

### @semcore/flags

- **Fixed** Fixed broken display of Cote d'Ivoire's flag.
- **Fixed** Fixed broken display of United States Minor Outlying Islands' flag.

### @semcore/icon

- **Added** Added call `onClick` when pressing enter if the icon is `interactive`.

### @semcore/input

- **Added** Added missing type `defaultValue` in `index.d.ts`.

### @semcore/input-number

- **Added** Added screen reader notification of input value and aria attributes for better a11y.

### @semcore/link

- **Fixed** Change tag for `Link.Addon` from `div` to `span`
- **Fixed** Update version `@semcore/utils` to use additional functions.
- **Added** Added screen reader support and empty link aria-label check

### @semcore/notice

- **Added** Added aria-live attribute for better accessibility.

### @semcore/notice-bubble

- **Changed** Animation styles moved to css file and now available for theming.
- **Added** Added role and aria-live attribute for better accessibility.

### @semcore/notice-global

- **Added** Added aria-live attribute for better accessibility.

### @semcore/pagination

- **Added** Added Turkish language support.
- **Added** Added the necessary labels for improved accessibility work.

### @semcore/product-head

- **Fixed** Remove `overflow='auto'` because the component should not scroll, its content should adapt to the desired size.

### @semcore/radio

- **Added** Added missing type `defaultValue` in `index.d.ts`.

### @semcore/tag

- **Fixed** Update version `@semcore/utils` to use additional color changing functions.

### @semcore/textarea

- **Added** Added missing types `value` and `defaultValue` in `index.d.ts`.

### @semcore/time-picker

- **Added** Added missing type `defaultValue` in `index.d.ts`.

### @semcore/typography

- **Changed** Added essential `aria-\*` attributes for Typography lists.

### @semcore/utils

- **Added** Added util function `reactToText` to convert react component to text.
- **Added** Added support of `elementtiming` attribute passing on all components.

## [12.4.2] - 2022-08-02

### @semcore/d3-chart

- **Fix** `Venn` chart was not mentioned in exported types.

### @semcore/utils

- **Fixed** Fixed package `.mjs` artifacts cross-imports to support modern js bundlers.

## [12.4.1] - 2022-08-01

### @semcore/date-picker

- **Added** Added new button components `Apply` and `Reset` for `DateRangePicker` and `MonthRangePicker`.

### @semcore/icon

- **Fixed** Renamed icon from `AppBlock` to `AppsBlock`. Old name is deprecated.

### @semcore/utils

- **Fixed** Fixed package `.mjs` artifacts cross-imports to support modern js bundlers.

## [12.4.0] - 2022-07-25

### @semcore/d3-chart

- **Fixed** Fixed ability to change `tag` in render(prop) functions.
- **Fixed** Fixed `RadialTree` typings.
- **Fixed** Fixed `RadialTree` rendering in Safari.
- **Fixed** Fixed `RadialTree` radian labels rendering.

### @semcore/data-table

- **Changed** Add `onScroll` callback for `<Body/>`.

### @semcore/dropdown-menu

- **Fixed** Remove deprecated size (`xl`).

### @semcore/fullscreen-modal

- **Fixed** Fixed font family in Title

### @semcore/icon

- **Fixed** Renamed icon from `AppBlock` to `AppsBlock`. Old name is deprecated.
- **Added** Added icon `ClusteredList`.
- **Added** Added icon `AppsBlock`.

### @semcore/input

- **Changed** Fixed `Input.Addon` css classes were missing during server-side rendering.
- **Fixed** Fixed the reaction when interacting with the keyboard for the correct work of other components with keyboard support.
- **Fixed** Fixed applying `border-radius` for outline.

### @semcore/input-number

- **Fixed** Fixed rounding of float numbers.

### @semcore/neighbor-location

- **Fixed** Tuned up childildren elements counting (ignoring empty string).

### @semcore/popper

- **Fixed** Fixed possibility to insert render function into `Popper.Trigger`.

### @semcore/select

- **Fixed** Fixed color of Addon icons in `InputSearch`.

### @semcore/utils

- **Fixed** Fixed pcakage compatibility with ES modules.

## [12.3.0] - 2022-07-07

### @semcore/d3-chart

- **Added** Added index to Bubble chart
- **Added** Added property minimal height `hMin` for Bar (`<Bar hMin={...}/>`)
- **Added** Added property `active` for `Donut.Pie`
- **Fixed** Exclude props from html for `Tooltip.Dot`
- **Fixed** Recalculate position for `Dot` after update scale
- **Fixed** Optimization render `Dot`

### @semcore/data-table

- **Fixed** Fixed scrolling of table when enable virtual scrolling.

### @semcore/feedback-form

- **Fixed** Fixed feedback image.

### @semcore/icon

- **Added** Added icon `AppsBlock`.

### @semcore/illustration

- **Changed** Added react component `MailSent` put on path `@semcore/illustration/MailSent`
- **Changed** Illustration `MailSent` put on path `@semcore/illustration/svg/MailSent`

### @semcore/radio

- **Fixed** Change inherited TS type for Radio (IFlexProps -> IBoxProps)

### @semcore/widget-empty

- **Changed** Updated svg images for all charts, nothing found and congratulations states.

## [12.2.0] - 2022-06-24

### @semcore/breadcrumbs

- **Fixed** Fixed separator's margin.

### @semcore/chart

- **Changed** Changed type names from 'IPieProps' to 'IRechartsPieProps' so that there are no intersections with other components.

### @semcore/checkbox

- **Fixed** Fixed problem show `Checkbox` in `Modal` (Checkbox added scroll on page).

### @semcore/d3-chart

- **Changed** Changed type names from 'ITooltipProps' to 'ITooltipChartProps' so that there are no intersections with other components.
- **Changed** Changed type names from 'ITooltipContext' to 'ITooltipChartContext' so that there are no intersections with other components.

### @semcore/errors

- **Changed** Changed type names from 'iconNames' to 'iconNamesErrors' so that there are no intersections with other components.

### @semcore/feedback-form

- **Changed** Updated `react-final-form` to `6.5.2` to support React 17.

### @semcore/icon

- **Changed** Added files with the extension .mjs

### @semcore/inline-input

- **Fixed** Remove 4px vertical paddings.

### @semcore/notice-global

- **Changed** Changed type names from 'NoticeTheme' to 'NoticeGlobalTheme' so that there are no intersections with other components.

### @semcore/pills

- **Changed** Changed type names from 'IPopperHandlers' to 'IPillsHandlers' so that there are no intersections with other components.

### @semcore/progress-bar

- **Fixed** Theme prop doesn't work when styles has been post-processed

### @semcore/project-create

- **Changed** Updated `react-final-form` to `6.5.2` to support React 17.

### @semcore/tag

- **Fixed** Fixed non default colors resolving.

### @semcore/textarea

- **Fixed** Fixed textarea scroll to bottom on every resize.

### @semcore/utils

- **Changed** Changed type names from 'ChildrenType' to 'IfChildrenType' so that there are no intersections with other components.
- **Changed** Update version dependency `@babel/runtime`.

### @semcore/widget-empty

- **Changed** Changed type names from 'iconNames' to 'iconNamesWidgetEmpty' so that there are no intersections with other components.

## [12.1.0] - 2022-05-31

### @semcore/button

- **Fixed** Fixed `width, height` for size Button.
- **Fixed** Fixed background-color active state for `<Button use='primary' theme='warning'/>`.

### @semcore/feedback-form

- **Fixed** Fixed Item tag property setting
- **Fixed** Fixed version `@babel/runtime` for dependency `react-final-form`.

### @semcore/notice

- **Changed** Changed animation duration from 200ms to 250ms.
- **Changed** Set prop `use` in deprecated. Added fallback on `NoticeGlobal`.
- **Changed** Add styles for Close icon hover.

### @semcore/notice-global

- **Added** Initial release

### @semcore/select

- **Fixed** Fixed non-closing popper after clicking on an Option

### @semcore/time-picker

- **Fixed** Fixed show `<Timepicker size='l' is12Hour/>` (added margin right to -4px for `Timepicker.Format`).

### @semcore/utils

- **Changed** Update version dependency `@babel/runtime`.

## [12.0.0] - 2022-05-19

### Global

- **BREAK** Updated styles according to the library redesign policy.

### @semcore/select

- **BREAK** Removed support to used `Select.InputSearch`
- **BREAK** Removed support properties `selectedOptions, defaultSelectedOptions` for `Select`
- **BREAK** Removed support `Select.OptionCheckbox`
- **BREAK** `Select.Option.Checkbox` used only two sizes `l, m`

### @semcore/dropdown-menu

- **BREAK** Removed deprecated props `onSelect, optionCount, triggerType`.
- **BREAK** Removed value "xl" for "size".

### @semcore/fullscreen-modal

- **BREAK** Removed support property `hidden` for `FullscreenModal`.
- **BREAK** `Footer` now use inside component `Flex`

### @semcore/progress-bar

- **BREAK** Removed named import "Progress" and "Bar".
- **BREAK** Removed "animation" props, use "value=0".

### @semcore/tooltip

- **BREAK** Removed ability to pass custom color to "theme" property.
- **BREAK** Removed named import "Tooltip".

### @semcore/base-trigger

- **BREAK** Removed value "xl" and "s" for "size".

### @semcore/button

- **BREAK** Removed value "xl" and "s" for "size".

### @semcore/chart

- **BREAK** Removed css media rules.

### @semcore/checkbox

- **BREAK** Removed value "xl" for "size".

### @semcore/date-picker

- **BREAK** Removed value "xl" for "size".

### @semcore/dropdown

- **BREAK** Removed deprecated prop `popperStretch`.

### @semcore/flags

- **BREAK** Changed size flags from 14x11 to 16x16.

### @semcore/format-text

- **BREAK** Changed sizes from m/l/xl to s/m/l

### @semcore/icon

- **BREAK** Removed icons `UserGroupNo, UserShared`.
- **Added** Added icon `GoogleCloud`.
- **Added** Added icon `UserShared`.
- **Changed** Update pay icons `Visa, JCB`.
- **Added** Added icons `IndentedResult, UserSharedFirst`.
- **Changed** Changed icon `UserGroup`.

### @semcore/input

- **BREAK** Removed value "xl"/"s"" for "size".

### @semcore/pagination

- **BREAK** Removed deprecated props "onPageChange"/"totalPagesFormatter"/"label"

### @semcore/pills

- **BREAK** Removed value "xl"/"s"" for "size".

### @semcore/radio

- **BREAK** Removed value "xl" for "size".

### @semcore/scroll-area

- **BREAK** Removed named imports.

### @semcore/spin

- **BREAK** Removed size `xxs`.

### @semcore/tab-line

- **BREAK** Removed value "xl" for "size".

### @semcore/tag

- **BREAK** Set `primary` as default component theme.
- **Added** Added `additional` theme.

### @semcore/textarea

- **BREAK** Removed value "xl" for "size".

### @semcore/data-table

- **Fixed** Fixed collapsing of header grouped cells.
- **Fixed** Fixed columns width was usually not controlled by `w`, `wMin` and `wMax` props
- **Fixed** Fixed package lost typings.

### @semcore/inline-input

- **Changed** Moved all color definitions to themable styles.

### @semcore/side-panel

- **Added** Added children components `Header, Footer, Body, Back, Title` for `SidePanel`.

### @semcore/skeleton

- **Added** Added skeleton for Radial Tree chart.

### @semcore/utils

- **Fixed** Synced dependencies versions to remove duplicates in the single export package.
- **Added** Added `light` function for increasing `l` axes in hsl color space of `rgb(a)` and hex colors
- **Fixed** Removed react warning when accessing "ref" property

### @semcore/widget-empty

- **Added** Added `coffee`/`heat-map-chart`/`kagi-chart`/`radial-tree-chart`/`suggestion`/`under-construction` illustrations.

## [11.2.0] - 2022-04-26

### @semcore/animation

- **Added** Added `preserveNode` property.

### @semcore/chart

- **Fixed** Fixed lost typings of `@semcore/chart/utils/colors` utility.

### @semcore/d3-chart

- **Added** Added `<RadialTree />` chart.
- **Fixed** Fixed left and right `<Axis.Title />` unexpected horizontal transition based on title characters count.

### @semcore/data-table

- **Fixed** Fixed package lost typings.
- **Changed** Fixed grouped rows hover highlight.
- **Added** Virtual scroll support.
- **Changed** Internal enhances, rewritten from js to ts, render algorithmic performance increased.
- **Fixed** Fixed uninitialized columns width from fixed size to equal flex-boxes.

### @semcore/inline-edit

- **Added** Introduced `<InlineEdit />` component.

### @semcore/inline-input

- **Changed** Changed `<InlineInput />` api to make it more consistent with other components.

### @semcore/input-tags

- **Changed** Deprecated `onAdd` callback property in favor of new `onAppend` one.
- **Changed** Provided SyntheticEvents to second callbacks argument.

### @semcore/pagination

- **Fixed** Fixed displaying of 2, 3 and 4 digit page number in focused pagination input.

### @semcore/scroll-area

- **Fixed** Made `onScroll` property optional.
- **Added** Added `onScroll` property.

### @semcore/slider

- **Fixed** Fixed types for `Slider.Knob` and `Slider.Bar`

### @semcore/spin-container

- **Fixed** Fixed scollable spin-container (e.g. in `data-table`).

### @semcore/widget-empty

- **Added** Added `radial-tree-chart` illustration.

## [11.1.1] - 2022-04-03

### @semcore/animation

- **Added** Added `preserveNode` property.

### @semcore/chart

- **Fixed** Fixed lost typings of `@semcore/chart/utils/colors` utility.

### @semcore/input-tags

- **Fixed** Component may fire `onRemove` event even when new tag text field is filled with space symbols.

### @semcore/textarea

- **Fixed** Fixed wrong resize of controlled textarea when value is significantly changes in parent controller.

## [11.1.0] - 2022-03-30

### @semcore/babel-plugin-react-semcore

- **Added** Added export function `getColorVars`.

### @semcore/babel-plugin-shadow

- **Fixed** Fixed old node versions support.

### @semcore/babel-plugin-styles

- **Fixed** Fixed old node versions support.
- **Added** Added export function `postcss` from main js file `@semcore/babel-plugin-styles`.
- **Added** Added `PLACEHOLDER_REPLACER` property for function `postcss`.

### @semcore/base-trigger

- **Fixed** Improved keyboard focus styles.

### @semcore/chart

- **Fixed** Rewrite file colors from tsx to js, for normal parsing in `babel-plugin-react-semcore`.

### @semcore/d3-chart

- **Fixed** Left and bottom plot titles now do not overlap axis ticks.
- **Fixed** Fixed figure cut on right or bottom edges when left or top margin is positive.

### @semcore/dropdown-menu

- **Fixed** Fixed enter space in input trigger for `DropdownMenu.Trigger`.

### @semcore/flags

- **Added** Added repository field to package.json file.

### @semcore/icon

- **Added** Added icons `Formal, Casual, QuestionSerp, MathMinusAlt`.

### @semcore/modal

- **Fixed** Fixed jumping content, when modal inside modal and body don't have `box-sizing`.

### @semcore/side-panel

- **Fixed** Fixed jumping content, when body don't have `box-sizing`.

### @semcore/skeleton

- **Fixed** Fixed `viewBox` for `BarChartSkeleton`.

### @semcore/spin

- **Changed** Rewrite the component to svg.
- **Added** Rounded corners.

### @semcore/tag

- **Fixed** Fixed previously lost overflowed text ellipsis.

### @semcore/utils

- **Fixed** Fixed set property in body (when window inside window and body don't have `box-sizing`) in `usePreventScroll`.

## [11.0.0] - 2022-02-25

### Global

- **Added** Added repository field to package.json file.

### @semcore/slider

- **BREAK** Remove props background/color/interaction, use theme instead.
- **BREAK** Refactored component to handle extreme values.

### @semcore/card

- **BREAK** Card was divided into Header and Body
- **Added** Background was added

### @semcore/spin-container

- **BREAK** Add new children components `SpinContainer.Content` when using advanced mode along with `SpinContainer.Overlay`.

### @semcore/base-trigger

- **Fixed** Fixed LinkTrigger hovered text color.

### @semcore/d3-chart

- **Fixed** Fixed animation display when resizing.

### @semcore/divider

- **Fixed** Fixed explicit default theme

### @semcore/errors

- **Fixed** Fixed Static files were missing in release 10.2.0

### @semcore/flex-box

- **Added** Added gap, rowGap and columnGap css properties support for Flex component.

### @semcore/icon

- **Fixed** Fixed sizes for a few icons.
- **Fixed** Fixed color setting for LightningFilled, MailOpenFilled.
- **Added** Added `Hubspot` icon.
- **Changed** Changed image `SortAsc` and `SortDesc` icons.

### @semcore/skeleton

- **Fixed** Added export type for Bubble, ScatterPlot, Venn charts

### @semcore/switch

- **Fixed** Removed react warning about uncontrolled timer.

### @semcore/tab-line

- **Fixed** Add missed ts type defaultValue.

### @semcore/tab-panel

- **Fixed** Add missed ts type defaultValue.

### @semcore/tag

- **Fixed** Fixed colors for primary-warning.

### @semcore/textarea

- **Fixed** Auto change rows now works in controlled mode.

### @semcore/typography

- **Fixed** Removed css specificity of props lineHeight/fontSize in `Text` component

### @semcore/widget-empty

- **Changed** Removed unused dependencies `@semcore/link`, `@semcore/button`.

## [10.2.1] - 2022-02-10

### @semcore/errors

- **Fixed** Static files were missing in release 10.2.0

## [10.2.0] - 2022-02-08

### @semcore/card

- **Changed** Changed styles.

### @semcore/chart

- **Fixed** Rename deprecate color `white-01` to `white`.
- **Fixed** Fixed list colors to get from a function getColor.

### @semcore/checkbox

- **Fixed** Add line-height for label text to not depend on external line-height.

### @semcore/d3-chart

- **Added** Added Bubble and Scatter plot charts.
- **Changed** Tooltip font size changed.
- **Changed** Revert function findComponent for check children in Tooltip, because it's valid for children () => ({}).
- **Changed** Replaced function findComponent to isAdvanceMode for check children in Tooltip.

### @semcore/data-table

- **Changed** Changed background-color from transparent to #fff for use="secondary" `DataTable.Column` and `DataTable.Cell`.

### @semcore/divider

- **Added** Added ability to use custom theme color.

### @semcore/feedback-form

- **Added** Added support Tooltip props for `FeedbackForm.Item`.
- **Fixed** fixed styles for secondary Notice.

### @semcore/icon

- **Added** Add icons 'LightningFilled' in new icons.
- **Fixed** Fixed view icon MailOpenFilled size m.

### @semcore/modal

- **Changed** Replaced function findComponent to isAdvanceMode for check children in Modal.

### @semcore/scroll-area

- **Changed** Replaced function findComponent to isAdvanceMode for check children in ScrollArea.

### @semcore/side-panel

- **Changed** Replaced function findComponent to isAdvanceMode for check children in SidePanel.

### @semcore/tab-line

- **Fixed** Fixed show active tab when TableLine have padding.

### @semcore/table

- **Changed** Changed background-color from `undefined` to `#fff` for ``.

### @semcore/tooltip

- **Changed** Replaced function findComponent to isAdvanceMode for check children in Tooltip.

### @semcore/utils

- **Added** Added function isAdvanceMode in findComponent.

## [10.1.0] - 2022-01-24

### @semcore/accordion

- **Changed** Up version icons and use new icon.

### @semcore/badge

- **Changed** correct line-height value to 1.2.

### @semcore/base-trigger

- **Changed** Up version icons and use new icon.

### @semcore/breadcrumbs

- **Changed** Up version icons and use new icon.

### @semcore/card

- **Changed** Up version icons and use new icon.
- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/carousel

- **Changed** Up version icons and use new icon.

### @semcore/chart

- **Fixed** Fixed filtering colors without index.
- **Fixed** Revert color gray in object colors.

### @semcore/data-table

- **Changed** Up version icons and use new icon.

### @semcore/date-picker

- **Changed** Up version icons and use new icon.

### @semcore/errors

- **Changed** Removed unused dependencies @semcore/icon.

### @semcore/feature-popover

- **Changed** Up version icons and use new icon.

### @semcore/feedback-form

- **Changed** Up version icons and use new icon.

### @semcore/fullscreen-modal

- **Changed** Up version icons and use new icon.

### @semcore/icon

- **Added** Add icons 'Hotel' in new icons.
- **Added** Added import icons from root folder (exm: @semcore/icon/ArrowDown/m)
- **Changed** Added import new icons
- **Changed** Old icons you can get from @semcore/icon/lib/Name/Size
- **Changed** New icons you can get from @semcore/icon/Name/Size

### @semcore/modal

- **Changed** Up version icons and use new icon.

### @semcore/notice

- **Changed** Up version icons and use new icon.

### @semcore/notice-bubble

- **Changed** Up version icons and use new icon.

### @semcore/pagination

- **Changed** Up version icons and use new icon.

### @semcore/project-create

- **Changed** Up version icons and use new icon.

### @semcore/select

- **Changed** Up version icons and use new icon.

### @semcore/side-panel

- **Changed** Up version icons and use new icon.

### @semcore/skeleton

- **Added** Added Bubble and ScatterPlot chart

### @semcore/table

- **Changed** Up version icons and use new icon.

### @semcore/tag

- **Fixed** [ts] Added type custom in property use.
- **Changed** Up version icons and use new icon.

### @semcore/tooltip

- **Changed** Removed unused dependencies @semcore/icon.

### @semcore/typography

- **Changed** Up version icons and use new icon.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/widget-empty

- **Changed** Removed unused dependencies @semcore/icon.

## [10.0.1] - 2021-12-24

### @semcore/badge

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/base-trigger

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/button

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/chart

- **Changed** Changed line-height Axis from 1.2 to 1.1 for correct display in all browsers.

### @semcore/input

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/input-tags

- **Changed** Changed line-height Tag from 1.2 to 1.1 for correct display in all browsers.

### @semcore/pills

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/popper

- **Changed** remove functionality for stop propagation of events onMouseEnter, onMouseLeave from the ``.

### @semcore/product-head

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/tab-line

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/tab-panel

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/tag

- **Added** Added primary-muted theme
- **Fixed** Fixed hover for non-interactive tag
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.

### @semcore/utils

- **Fixed** Fixed opacity calculation regardless of case.
- **Fixed** Fixed logic to function defaultFindNeighbor for a11yEnhance.

## [10.0.0] - 2021-12-10

### @semcore/breadcrumbs

- **Changed** Rewrite code from TS to JS

### @semcore/chart

- **Fixed** Remove 'sideEffect=false' because bug in recahrts lib.
- **Changed** Moved chart colors vars to style
- **Changed** Changed package from venn.js to @upsetjs/venn.js.

### @semcore/checkbox

- **Changed** Moved checkbox size vars to style

### @semcore/counter

- **Added** Added warning and danger themes

### @semcore/d3-chart

- **Fixed** Calculate correct border radius for Bar.
- **Fixed** Fixed set scale for Area, Line.
- **Changed** Moved chart colors vars to style

### @semcore/drag-and-drop

- **Fixed** Fixed global color .dnd
- **Changed** Up version

### @semcore/notice

- **Changed** Moved SLabel colors to style

### @semcore/popper

- **Fixed** Property root for Popper set to OutsideClick.

### @semcore/select

- **Added** [TS] Added type for Select.Option.Checkbox.
- **Added** Added class name to InputSearch.
- **Fixed** Fixed import styles in InputSearch.

### @semcore/tag

- **Added** Added property for Tag color

### @semcore/utils

- **Changed** Added magic comment in color.ts for update values in themes.

## [9.0.0] - 2021-11-12

### @semcore/skeleton

- **BREAK** change default height for Skeleton from 100px to 100%.
- **BREAK** remove support props visible, speed for Skeleton.
- **Fixed** Fixed typo in ts.
- **Changed** Rewrite code from ts to js.

### @semcore/d3-chart

- **Added** Added prop outerRadius for Donut chart.
- **Added** Added new event onMouseMoveChart, onMouseLeaveChart for eventEmitter.
- **Fixed** Returned data (x, y, width, height) in render function for Bar, Horizontalbar.
- **Fixed** Fixed field e.currentTarget for events in eventEmitter.
- **Fixed** Fixed hide tooltip.
- **Fixed** Fixed react key-related warning for Bar.
- **Fixed** Fixed show/hide components Hover, Dots.
- **Fixed** Fixed dependencies in package.json.
- **Changed** Fixed call animation for hover in sector Donut chart.
- **Changed** Fixed animation show Dot in Line chart.

### @semcore/date-picker

- **Fixed** Fixed clear highlighted data after close popup in DataRangePicker.

### @semcore/flex-box

- **Fixed** [TS] Fixed type direction for Flex.
- **Fixed** [TS] Fixed type position for Box.

### @semcore/icon

- **Added** Add new icons 'MailOpen' and 'MailOutlineOpen'

### @semcore/popper

- **Changed** Up version package focus-lock.

### @semcore/scroll-area

- **Fixed** [TS] Fixed types.
- **Changed** Rewrite code from ts to js.
- **Changed** Changed interception event of mouse for cursor in ScrollBar.
- **Changed** Call calculate position scroll when change size container

### @semcore/slider

- **Fixed** Fixed default color

### @semcore/switch

- **Fixed** Fixed animation checked when opening in Popper.

### @semcore/table

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** The style processing system has been changed.
- **Changed** Rewrite from TS to JS code.

## [8.0.0] - 2021-10-04

### @semcore/dot

- **BREAK** removed deprecated property invisible.
- **BREAK** Changed animation Dot to @semcore/animation.

### @semcore/badge

- **Changed** Changed line-height value

### @semcore/card

- **Fixed** Fixed padding

### @semcore/d3-chart

- **Added** Added to release.

### @semcore/data-table

- **Changed** Fixed position table for fixed columns.
- **Changed** Added support property onResize for DataTable.Body.

### @semcore/date-picker

- **Fixed** Fixed change displayedPeriod after change value for family pickers.
- **Changed** Changed WeekDay styles from uppercase to capital case

### @semcore/drag-and-drop

- **Changed** Added support keydown for draggable block in droppable zone.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.

### @semcore/email

- **Added** Added to release.

### @semcore/errors

- **Changed** Updated the title, text and btnHome fields for the en locale in the PageNoData component.
- **Changed** Updated the title and btnHome fields for the en locale in the Maintenance component.
- **Changed** Updated the btnHome field for the en locale in the AccessDenied component.

### @semcore/flags

- **Fixed** [ts] correct types.

### @semcore/icon

- **Added** Add new icon 'BriefcaseAlt'

### @semcore/modal

- **Changed** Changed overlay opacity from 80% to 60%
- **Changed** Changed overlay opacity for the second modal window from 20% to 40%

### @semcore/scroll-area

- **Fixed** Call calculate position scroll when change size container

### @semcore/select

- **Added** Added component Select.Option.Checkbox.
- **Fixed** Fixed the check for the presence of Select.Option.
- **Changed** Revert 'sideEffect=false' for more optimal build via webpack

### @semcore/table

- **Fixed** Fixed content alignment in cells

## [7.2.1] - 2021-08-26

### @semcore/select

- **Fixed** Fixed problem with 'sideEffect=false'

## [7.2.0] - 2021-08-26

### Global

- **Changed** Add 'sideEffect=false' for more optimal build via webpack

### @semcore/breadcrumbs

- **Fixed** Fixed style separator when a custom font-size.

### @semcore/date-picker

- **Fixed** [TS] added types for default values.
- **Fixed** Fixed set displayedPeriod for family pickers.

### @semcore/dropdown-menu

- **Fixed** Fixed typo in class names.

### @semcore/feedback-form

- **Fixed** Fixed placement warning tooltip for small screens.

### @semcore/input

- **Fixed** Changed height of the inner real input to fix horizontal display with adjacent elements.

### @semcore/textarea

- **Fixed** [TS] Fixed type onChange for ITextareaProps.

### @semcore/time-picker

- **Changed** Changed height dropdown from 240px to 180px.

## [7.1.1] - 2021-08-09

### @semcore/badge

- **Changed** Changed line-height value

### @semcore/base-trigger

- **Fixed** [ts] correct types.

### @semcore/d3-chart

- **Fixed** [ts] correct types.

### @semcore/errors

- **Fixed** [TS] fixed types.

### @semcore/feature-popover

- **Fixed** [ts] correct types.

### @semcore/feedback-form

- **Fixed** [ts] correct types.

### @semcore/pagination

- **Fixed** [ts] corrected types for Value, Addon in Pagination.PageInput.

### @semcore/radio

- **Fixed** [ts] correct types.

### @semcore/select

- **Fixed** [ts] correct types.

### @semcore/slider

- **Fixed** [ts] correct types.

### @semcore/tab-line

- **Fixed** [ts] correct types.

### @semcore/tag

- **Added** Added line-height value

### @semcore/typography

- **Fixed** [ts] correct types.

## [7.1.0] - 2021-07-30

### @semcore/date-picker

- **Fixed** [TS] fixed types.
- **Fixed** Added styles for element today in Calendar.
- **Fixed** Fixed show title for MonthRangePicker.

### @semcore/feature-popover

- **Changed** Replace animation from package react-transition-group to @semcore/animation.

### @semcore/icon

- **Fixed** Fixed set style which render useBox.
- **Changed** Remove from html for svg don't used attributes.
- **Changed** Added propsForElement for set props to svg.

### @semcore/notice-bubble

- **Added** visible property can run in uncontrolled mode
- **Changed** Number of simultaneous notifications can be more than one

### @semcore/project-create

- **Changed** Updated version @semcore/spin-container.

### @semcore/select

- **Fixed** Fixed set value for Select.InputSearch.
- **Changed** [TS] Added type null for value prop in Select.
- **Changed** Fixed warning in console for InputSearch.

## [7.0.0] - 2021-07-12

### @semcore/notice-bubble

- **BREAK** Replace animation package from react-transition-group to @semcore/animation
- **BREAK** Remove property offset and added Box inside NoticeBubbleContainer
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS.
- **Changed** [A11y] added role for Alert and aria-label for Close.

### @semcore/spin-container

- **BREAK** Replace animation from package react-transition-group to @semcore/animation.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS.

### @semcore/accordion

- **Fixed** Add default type for generic value

### @semcore/animation

- **Fixed** [TS] fixed export components.

### @semcore/carousel

- **Added** [A11y] Added support to work Carousel.Next, Carousel.Prev with keyboard.

### @semcore/data-table

- **Added** [A11y] Added support keyboard for sortable column.

### @semcore/date-picker

- **Fixed** Сorrect access to properties from getters function

### @semcore/dot

- **Fixed** Fixed animation Dot.

### @semcore/dropdown-menu

- **Changed** Changed tabIndex to 0 and styles for DropdowmMenu.Popper.

### @semcore/errors

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/feature-popover

- **Changed** Replace animation from package `react-transition-group` to `@semcore/animation`.

### @semcore/feedback-form

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] Rewrite code from TS to JS.

### @semcore/flags

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/fullscreen-modal

- **Changed** Rewrite code from TS to JS.

### @semcore/icon

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/modal

- **Changed** [TS] rewrite code from ts to js.
- **Changed** [A11y] added role for Window and aria-label for Close and Window.

### @semcore/notice

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [A11y] added role for Alert and aria-label for Close.

### @semcore/pills

- **Fixed** Add default type for generic value

### @semcore/popper

- **Fixed** Fixed cjs build package.
- **Changed** Improved render performance

### @semcore/progress-bar

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS

### @semcore/project-create

- **Changed** Updated version `@semcore/spin-container`.

### @semcore/select

- **Fixed** Fixed set theme for Select.OptionCheckbox.
- **Fixed** Add default type for generic value

### @semcore/side-panel

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/tab-line

- **Fixed** Add default type for generic value

### @semcore/tab-panel

- **Fixed** Add default type for generic value

### @semcore/table

- **Added** [A11y] Added support keyboard for sortable column.

### @semcore/tag

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Rewrite from TS to JS code.

### @semcore/widget-empty

- **Fixed** [TS] fixed types.

## [6.0.0] - 2021-06-21

### @semcore/input-number

- **BREAK** Replaced internal representation with native input(type=number).
- **BREAK** Changed type for value to string.
- **Fixed** Fixed the js problem with the remainder of division.
- **Added** [A11y] added aria-label for buttons in `InputNumber.Controls`

### @semcore/accordion

- **Changed** Fix TS type

### @semcore/base-trigger

- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/d3-chart

- **Added** Added Venn chart.

### @semcore/date-picker

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Added support keydown arrows for choose date to calendar.

### @semcore/divider

- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/dot

- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/dropdown

- **Added** Support keydown Enter and Space for open Popper.
- **Added** Logic checked interactive trigger from DropdownMenu.
- **Fixed** Fix TS type

### @semcore/dropdown-menu

- **Fixed** Fix TS type
- **Changed** Moved logic for checking interactive trigger to Dropdown.

### @semcore/pagination

- **Changed** Fixed ts type for Pagination.
- **Changed** Added aria-label for child components FirstPage, PageInput

### @semcore/pills

- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/popper

- **Fixed** Fixed forwarding properties to the Box in Popper.Popper.
- **Fixed** Fixed set prop returnFocus for Focus-Lock
- **Fixed** Fix TS type
- **Fixed** [A11] Fixed set aria-pressed for Popper.Trigger.

### @semcore/select

- **Fixed** Fix TS type
- **Fixed** Fixed ts type for Select.
- **Fixed** Fixed paddings in InputSearch.

### @semcore/switch

- **Changed** [A11y] added role="switch" and support the Enter or Space key for used to toggle between a checked or unchecked
- **Changed** [TS] Rewrite code from TS to JS.

### @semcore/tab-line

- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/tab-panel

- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/textarea

- **Changed** [TS] Rewrite code from TS to JS.

### @semcore/time-picker

- **Added** [A11] Added aria-label for Timepicker.Hours, Timepicker.Minutes.

### @semcore/widget-empty

- **Added** Added tag-cloud illustration
- **Changed** Rewrite code from TS to JS 🧑‍💻

## [5.1.0] - 2021-05-25

### @semcore/accordion

- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/core

- **Changed** Extended type for Root

### @semcore/d3-chart

- **Fixed** Fix TS type

### @semcore/date-picker

- **Fixed** Fixed short display date for identity months for Trigger.

### @semcore/dropdown

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.

### @semcore/dropdown-menu

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.

### @semcore/feature-popover

- **Changed** The style processing system has been changed.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.

### @semcore/neighbor-location

- **Added** Added the ability to add a root tag
- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/popper

- **Fixed** Add type for handlers for render function
- **Fixed** Fix TS type
- **Fixed** Fix position arrow after change version popperjs.
- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/scroll-area

- **Fixed** Add import type for ResizeObserver

### @semcore/select

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/spin

- **Fixed** Fixed animation
- **Changed** Rewrite code from TS to JS 👩‍💻

### @semcore/time-picker

- **Changed** Rewrite code from TS to JS 🧑‍💻

### @semcore/tooltip

- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

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

### @semcore/notice

- **BREAK** Removed global styles
- **BREAK** Removed styles for media queries.
- **BREAK** Replace animation package from react-transition-group to @semcore/animation
- **BREAK** Update property theme, now this property can get any themes
- **BREAK** Added property use
- **BREAK** Update icon for Notice.IconClose

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

### @semcore/grid

- **BREAK** Change the responsive breakpoint from 992px to 1184px.
- **Added** Added alternative API for span and offset.
- **Added** Added breakpoint xs.

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

### @semcore/date-picker

- **Added** Added supported react@17.

### @semcore/errors

- **Added** Added supported react@17.

### @semcore/icon

- **Added** Added new icon VideoStop.
- **Added** Added new color icon Github.
- **Added** Added new icon GoogleAnalytics4 for 4 version.

### @semcore/input

- **Fixed** Fixed type of second argument(event) for onChange prop

### @semcore/outside-click

- **Changed** Changed mouse event from click to mouseup for stable performance.
- **Added** Added supported react-dom@17.

### @semcore/portal

- **Added** Added supported react-dom@17.

### @semcore/scroll-area

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

### @semcore/input-mask

- **BREAK** Property placeholderChar, it is everything have to use `\_`, because mask show in value to input
- **Added** Manage cursor position for InputMask.Value with show mask
- **Added** Export function getAfterPositionValue. It use when need to know where last symbol of value.
- **Fixed** Show mask for InputMask.Value when size input less than size mask

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

- **Added** Added Divider auto size height for vertical orientation, this fixed show <Divider orientation="vertical"/> in flex

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

- **Fixed** убрали возможность отображения ScrollArea.Bar по вертикали для Table.StickyHead. Это поведение считается недопустимым для шапки таблицы.

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

- **Added** SidePanel — компонент для отображения выезжающей панели (справа, снизу или слева). Иногда зовем его " шторкой"

### @semcore/table

- **Added** Добавили box-sizing: border-box для таблицы, это решило проблему отображения скролла, когда контента не много
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

### Global

- **Added** Initial release
