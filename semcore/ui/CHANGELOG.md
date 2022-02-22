## [10.2.1] - 2022-02-10

### @semcore/errors

- **Fixed** Static files were missing in release 10.2.0

### @semcore/icon

- **Added** Add icon Hubspot.
- **Changed** Changed svg for SortAsc, SortDesc.

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

- **Changed** Remove don't use dependency @semcore/icon.

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

- **Changed** Remove don't use dependency @semcore/icon.

### @semcore/typography

- **Changed** Up version icons and use new icon.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.

### @semcore/widget-empty

- **Changed** Remove don't use dependency @semcore/icon.

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

### @semcore/skeleton

- **BREAK** change default height for Skeleton from 100px to 100%.
- **BREAK** remove support props visible, speed for Skeleton.
- **Fixed** Fixed typo in ts.
- **Changed** Rewrite code from ts to js.

### @semcore/slider

- **Fixed** Fixed default color

### @semcore/switch

- **Fixed** Fixed animation checked when opening in Popper.

### @semcore/table

- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** The style processing system has been changed.
- **Changed** Rewrite from TS to JS code.

## [8.0.0] - 2021-10-04

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

### @semcore/dot

- **BREAK** removed deprecated property invisible.
- **BREAK** Changed animation Dot to @semcore/animation.

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

### @semcore/time-picker

- **Changed** Changed height dropdown from 240px to 180px.

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

### @semcore/notice-bubble

- **BREAK** Replace animation package from react-transition-group to @semcore/animation
- **BREAK** Remove property offset and added Box inside NoticeBubbleContainer
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS.
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

### @semcore/spin-container

- **BREAK** Replace animation from package react-transition-group to @semcore/animation.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS.

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

### Global

- **Added** Initial release
