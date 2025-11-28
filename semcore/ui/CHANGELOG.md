## [16.13.0] - 2025-11-28

### @semcore/checkbox

- **Fixed** Unchecked themed `Checkbox` should remain gray.

### @semcore/base-components

- **Fixed** The "Popper" with focus or hover interaction opens after moving to the
trigger from the popper using the Tab key.

### @semcore/d3-chart

- **Fixed** `ticks` state var isn't re-calculated for `children` render prop.
- **Fixed** Removed `LegendItem` checkbox theme behavior, since it's been
implemented within `Checkbox` component.

### @semcore/data-table

- **Fixed** Unnecessary autofocus to the table after loading.
- **Added** Logic for selecting multiples rows using Shift

### @semcore/dropdown

- **Fixed** Disabled first item receives focus.

### @semcore/time-picker

- **Fixed** UI focus issue for size `l`.

### @semcore/notice-bubble

- **Added** `containerNode` property to set one common container for all notices
on the page from different applications.

### @semcore/dropdown-menu

- **Added** Virtualization.
- **Fixed** Disabled first item receives focus.

## [16.12.0] - 2025-11-17

### @semcore/base-trigger

- **Added** `data-ui-name` for Inner container.
- **Fixed** `font-family` style for the `LinkTrigger` wasn't inherited.
- **Added** `data-ui-name` for Inner container.
- **Fixed** Issue with `svg` in `ColorPicker.Trigger` and `ColorPicker.Item`.
- **Fixed** `size` property didn't apply for the `PaletteManager.InputColor`.
- **Fixed** Incorrect types for `PaletteManager`.
- **Fixed** Validation issues in `PaletteManager.InputColor`.
- **Fixed** "Blocked aria-hidden on an element" accessibility error for `ChevronDownM`.
- **Fixed** `PaletteManager`'s add button active/hover states.
- **Added** The ability to use multiple synchronized tooltips on multiple charts.
- **Fixed** `onClick` handler in child components overrides root `onClick` and called on mount.
- **Fixed** The focus did not move to the trigger via `Escape` when opening the accordion with the mouse.
- **Fixed** SR didn't pronounce all items selecting/deselecting on table with pagination.
- **Fixed** Keyboard interaction after mouse clicking in cell with few interactive elements.
- **Fixed** Space key interactions in Date Picker (unable to switch months, apply Today, keep selected date, etc.)
- **Changed** Canceled default behavior for `Arrow Up` `Arrow Down` keys.
- **Added** Foundation to handle scroll ending.
- **Added** `stopPropagation` when the `tab` key is pressed in an open dropdown with `click` interaction.
- **Changed** Focus behavior if `Popper` already has a focus inside.
- **Fixed** "scroll to element" animation for keyboard interactions.
- **Changed** `innerHTML` to `textContent` in the calculation of ellipsis size.
- **Fixed** Switching between highlighted Pills items left animation artifacts.
- **Fixed** `margin-bottom` of the `Email` illustration in the form success state.
- **Changed** Set `pointer-events: none` for path's in interactive svg.
- **Fixed** `disabled` state for `InputTags/InputTags.Tag`.
- **Fixed** Font for tags in non-interactive state.
- **Fixed** Unnecessary scroll in small mode with long text in sidebar step.
- **Fixed** Disabled `Wizard.Stepper` in `Sidebar` can be focused and activated by keyboard.

## [16.11.1] - 2025-10-30

### @semcore/data-table

- **Fixed** Non-working `Accordion` for the cell with the skeleton when loading.

## [16.11.0] - 2025-10-29

### @semcore/base-components

- **Fixed** Mouse interaction with elements inside a `ScrollArea.Container` when the container has focus-visible.
- **Fixed** Unnecessary calculations in `sstyled` wrapper.
- **Added** New `multiline` property for `XAxis.Ticks/YAxis.Ticks` and `multilineXTicks/multilineYTicks` for `Chart`.
- **Fixed** Chart content remains visible after unchecking single legend item in Bar, Horizontal Bar, Histogram, and Stacked Horizontal Bar charts.
- **Fixed** Chart content remains visible after unchecking single legend item in Bar, Horizontal Bar, Histogram, and Stacked Horizontal Bar charts.
- **Fixed** Clicking on pattern icons in legend items with checkboxes has no effect despite interactive cursor.
- **Fixed** Improve interaction handling for `Chart.Legend` items (custom shapes, child components, etc.)
- **Fixed** Low performance when opening an accordion with a large number of rows.
- **Fixed** Keyboard interaction after mouse clicking in Safari.
- **Fixed** Background color in expanded state when a theme is applied to a single cell.
- **Fixed** Limited mode doesn't prevent interaction with accordion.
- **Сhanged** Types for `NoticeFH`.
- **Сhanged** Pills addon logic to determine whether to display stars or numeric value.
- **Fixed** `autoFocus` property on Popper didn't work.
- **Fixed** `onConfirm` behaviour to query latest input updates.
- **Fixed** The `id` property wasn't passed to `Pagination.PageInput.Value` in advanced mode.
- **Fixed** The tooltip popper content is not announced by screen readers in Chrome.
- **Changed** Improve types, added `WizardContentProps` with `noSidebar` property, component rewritten in TypeScript.
- **Changed** `z-index` value for `Stepper` in `hover` state.

## [16.10.0] - 2025-10-06

- **Changed** Styles for `:focus-visible` in Box and ScrollArea.
- **Changed** Border-radius for invalid pattern in InvalidStateBox.
- **Added** Ability to use two tags in `tag` property. First for some logic like `Ellipsis` or `Select.Trigger` and second for real `html` tag.
- **Changed** Don't open popper `onFocus` if last interaction was with mouse.
- **Changed** Styles for `:focus`.
- **Fixed** Info icon vertical align in Card Title.
- **Changed** Styles for `:focus-visible`.
- **Changed** Values for `keyboard-focus` tokens.
- **Changed** Inverted outline token moved from keyboard-focus group to keyboard-focus-invert group: `keyboard-focus-outline-invert` changed to `keyboard-focus-invert-outline` for consistency.
- **Changed** Grouping for `keyboard-focus` tokens in the design json files.
- **Added** Ability to use two tags in `tag` property. First for some logic like `Ellipsis` or `Select.Trigger` and second for real `html` tag.
- **Changed** Prevent scroll on focus by mouse interaction.
- **Changed** Focus styles for `Plot`.
- **Fixed** Error with `display` property on html element in the `Dots` component.
- **Added** Limited mode support.
- **Added** Render accordion and checkbox in one row together.
- **Fixed** Render table with expanded rows after changing page.
- **Fixed** Render grouped header in some cases.
- **Changed** Styles for `:focus` and `:focus-visible`.
- **Changed** Styles for highlighted `CalendarUnit`.
- **Fixed** Unnecessary background-color on hovered draggable elements.
- **Fixed** Non-working dragging in scrollable containers.
- **Changed** Styles for `:focus`.
- **Changed** Styles for `:focus-visible`.
- **Changed** Styles for `:focus` of the `a` element.
- **Changed** Styles for `:focus-visible`.
- **Changed** Styles for `:focus-visible`.
- **Added** Initial animation for `ScoreDonut` and `ScoreSemiDonut`.
- **Changed** `ScoreDonut` and `ScoreSemiDonut` visual value can't be greater than 100.
- **Fixed** Display a hint on the close button after mouse interaction to open bubble.
- **Changed** Styles for `:focus-visible`.
- **Changed** Border color for checked Checkbox in `focus` state.
- **Fixed** Display a hint on the close button after mouse interaction to open panel.
- **Changed** Styles for `:focus-visible`.
- **Changed** Styles for `:focus-visible`.
- **Changed** Styles for `:focus` of the `a` element.

## [16.9.1] - 2025-09-24

### @semcore/data-table

- **Fixed** Cell display in the accordion was changed to `block`.
- **Fixed** Styles for cells in accordion in different variants.
- **Fixed** Laggy animation in accordions.
- **Fixed** `renderCell` not working for accordion's cells.
- **Fixed** The following `InputTags.Tag` properties: `addonLeft`, `addonRight` and `active`.

## [16.9.0] - 2025-09-17

### @semcore/base-trigger

- **Fixed** The Close `Hint` not closed by pressing `ESC` in `FilterTrigger.ClearButton`.
- **Added** `aria-label` and `title` properties to `FilterTrigger.ClearButton` to change hint text.
- **Fixed** Typo in `ButtonLink` size defaults.
- **Added** New group of tokens for our `Illustration` component.
- **Fixed** Render grouped header in some cases.
- **Added** `variant` property. Adapts the table styling to different usage contexts, such as in a `Card`.
- **Added** Export for `ColumnGroupConfig` and `ColumnItemConfig` types.
- **Fixed** Bottom border for cell with empty data.
- **Fixed** Table performance with accordions.
- **Fixed** Typed text is lost when new text is pasted afterwards.

## [16.8.0] - 2025-09-05

### @semcore/core

- **Added** New tokens for secondary button from the `feature-highlight` package.
- **Fixed** Some inconsistencies and missing tokens/descriptions in `dark.json`.
- **Changed** Secondary button styles: now secondary button has gradient background, border, and text.
- **Changed** Notice styles: `Notice.Label` now has `icon-primary-feature-highlight` color by default.
- **Fixed** Styles: replaced some hardcoded color values with variables.
- **Added** New `Monitoring` icon.

## [16.7.0] - 2025-08-29

### @semcore/base-components

- **Changed** Type description for `PopperPopperProps`/`PopperProps`/`ScrollAreaProps`/`ScrollBarProps`/`BoxProps`.
- **Changed** Type description for `FilterTriggerProps`.
- **Changed** Type description for `BreadcrumbsProps` & `BreadcrumbsItemProps`.
- **Added** Controlled mode for errors.
- **Added** `onImmediatelyChange` internal property.
- **Fixed** Incorrect paddings for line numbers starting from 1000 lines.
- **Changed** Type description for `BulkTextareaProps`.
- **Changed** Type description for `CarouselProps`.
- **Changed** Type description for `CheckboxProps`.
- **Changed** FocusLock work when popper opened without focus and trigger has few focusable elements.
- **Added** New tokens for FeaturePopover's new theme styles: `feature-popover-bg`, `feature-popover-bg-neutral`, `feature-popover-dot-neutral`, `feature-popover-dot-neutral-outer-border`.
- **Changed** Type description for `PlotProps`/`ReferenceLineProps`/`AreaChartProps`/`BarChartProps`/`BubbleChartProps`/`CigaretteChartProps`/`DonutChartProps`/`HistogramChartProps`/`LineChartProps`/`RadialTreeProps`/`ScatterPlotChartProps`/`VennChartProps`/`CompactHorizontalBarChartProps`.
- **Added** `Data` type to `cellRender` function.
- **Fixed** Unnecessary re-render when data was updated but old values were still used.
- **Fixed** Shadows remain after resizing table width.
- **Fixed** `onSortChange` is called twice when click is on a sort icon.
- **Fixed** Hover behaviour for sort icon in case the content is justified to the right.
- **Changed** Type description for `DataTableProps`/`CellRenderProps`.
- **Changed** `AccordionToggle`'s `margin-left`.
- **Changed** `DataTable` display to `block` & `DataTable.Header` display to `grid` when `data` is empty.
- **Changed** Type description for `CalendarProps`.
- **Changed** Type description for `DragAndDropProps`.
- **Changed** Type description for `DropdownProps`.
- **Changed** Type description for `DropdownMenuContext`/`DropdownMenuProps`.
- **Changed** Type description for `ProjectNotFoundProps`.
- **Fixed** Support link is rendered incorrectly.
- **Fixed** React forward ref error for Sparkle component.
- **Changed** Tokens for default `FeaturePopover` theme.
- **Changed** Type description for `FeaturePopoverPopperProps`.
- **Changed** Type description for `FeedbackFormProps`/`FeedbackRatingProps`.
- **Changed** Type description for `FormatTextProps`.
- **Changed** Type description for `FullscreenModalHeaderProps`.
- **Added** New `LinkExternalAlt` icon.
- **Added** New `Note` icon.
- **Changed** Type description for `IconProps`.
- **Changed** Type description for `InlineEditProps`.
- **Changed** Type description for `InlineInputProps`.
- **Changed** Type description for `InputMaskValueProps`.
- **Changed** Type description for `InputTagsProps`.
- **Changed** Type description for `ModalProps`.
- **Changed** Type description for `NoticeProps`.
- **Changed** Type description for `NoticeBubbleContainerProps`.
- **Changed** Type description for `NoticeGlobalProps`.
- **Changed** Type description for `PaginationProps`.
- **Fixed** The focus outline on the left pill is not visible when hovering over the next pill.
- **Changed** Type description for `InfoItemProps`/`HeaderTitleProps`.
- **Changed** Type description for `ValueProps`.
- **Changed** Type description for `SelectProps`/`SelectOptionCheckboxProps`.
- **Changed** Type description for `SidePanelPanelProps`.
- **Changed** Type description for `SkeletonProps`/`LineChartSkeletonProps`/`AreaChartSkeletonProps`/`BarChartSkeletonProps`/`HistogramChartSkeleton`.
- **Changed** Type description for `SliderProps`.
- **Changed** Type description for `SpinProps`.
- **Changed** Type description for `TagProps`.
- **Fixed** Focus disappeared when deleting a tag from the list with correct react keys.
- **Changed** Type description for `TimePickerProps`.
- **Changed** Type description for `WidgetNoDataProps`.
- **Changed** Type description for `WizardProps`/`WizardStepperProps`/`WizardStepBackProps`/`WizardStepNextProps`.
- **Fixed** Left borders of Wizard.Content component are not rounded if the Wizard doesn't have Sidebar

## [16.6.0] - 2025-08-07

- **Added** `text-align` CSS property to `Box` component.
- **Fixed** Legend hides for single item even when `showLegend=true`.
- **Added** `accordionMode` property to only one accordion is open at a time.
- **Added** `onAccordionToggle` to listen for open/close accordion events.
- **Added** Ability to render multiple columns under one single-level column header.
- **Added** RawData to `CellRenderProps`.
- **Added** `line-height` for `Head.Column` items.
- **Added** `overflow=hidden` for `CellWrapper`.
- **Added** `textAlign` property to all column cells.
- **Added** `renderCellOverlay` method for rendering an overlay over table cells.
- **Fixed** Rendering table with selectedRows without data.
- **Fixed** `z-index` of expanded accordions and spinner container.
- **Fixed** Usage of `changeSortSize` property with multiple columns.
- **Fixed** Accordion content expands with visual issues when clicking on a merged cell.
- **Fixed** Incorrect type for `selectedRows/onSelectedRowsChange` when `uniqueRowKey` type is not a string.
- **Fixed** Hover styles aren't applied to themed cells.
- **Fixed** Types for `CellRenderProps` - added ability to compare props.columnName with `ACCORDION` symbol.
- **Fixed** Sticky header with `width` property doesn't work.
- **Changed** Width for column with checkboxes to use `min-content` value.
- **Changed** `rowProps` and `renderCell` will not be called when rendering an empty table.
- **Fixed** Ellipsis with `trim=middle` cut off text at the end.
- **Fixed** Incorrect cropping with different font-size.
- **Changed** Updated styles to reflect internal `Modal` changes preventing unexpected closing during scrollbar interaction.
- **Added** New `AISEOToolkit`, `CollapseList`, `Canva`, `Claude`, `ClaudeColored`, `GoogleGenerativeAIColored`, `Perplexity`, `PerplexityColored` icons.
- **Changed** Updated `GoogleGenerativeAI` icon.
- **Fixed** Removed fill from `TextItalic` size M icon.
- **Fixed** Minified and removed fill from `BracketsCode` size L icon.
- **Fixed** `Modal` hides after scrollbar interaction.
- **Fixed** Focus loss in Safari when navigating to first/last page with pagination buttons.
- **Added** `formatTags` property for the Text component for enable tags formatting's inside a Text component.

## [16.5.0] - 2025-07-23

### @semcore/base-trigger

- **Changed** Inconsistent border color in disabled state for `neighborLocation=left`.
- **Fixed** Missing type names for `InputFieldProps` on API page for Bulk Textarea due to ESLint fixes.
- **Added** `featureHighlight` tokens to dark.json.
- **Added** `newInstance` method for create new component instances from the existing.
- **Added** `onClickArea` handler for `Chart.Area`.
- **Added** `onClickBubble` handler for `Chart.Bubble`.
- **Added** `onClickPie` handler for `Chart.Donut`.
- **Added** `onClickLine` handler for `Chart.Line`.
- **Added** `onClickRadar` handler for `Chart.Radar`.
- **Added** `onClickScatterItem` handler for `Chart.ScatterPlot`.
- **Added** `onClickVennItem` handler for `Chart.Venn`.
- **Added** `onClick` handlers for `Area`, `Bubble`, `Donut`, `Dots`, `Line`, `Radar`, `ScatterPlot`, `Venn`.
- **Fixed** Tooltip in Compact Horizontal Bar always shows data from the first bar.
- **Fixed** Donut chart hover issues when paddingAngle is set without innerRadius.
- **Added** Transition for the table header's `top` attribute.
- **Added** New header prop `animationDuration`.
- **Fixed** Row hover effect for empty state.
- **Fixed** Incorrect 'Select all' checkbox behavior with pagination.
- **Fixed** Header glitches in loading state with sticky header.
- **Changed** Mobile breakpoint from 320px to 648px and other minor CSS changes to eliminate any implicit intermediate states.
- **Changed** Added `flex-wrap` to `Error.Controls` for better layout on small screens.
- **Changed** Default URL for the "Support Team" link from an email to "/company/contacts" in `ProjectNotFound`.
- **Changed** Slightly changed the grammar in the English text in `ProjectNotFound`.
- **Added** New icons: `TextBold`, `TextItalic`, `TextQuotes` and `TextUnderline`.
- **Changed** `Text` icon to visually match new text format icons.
- **Changed** `MathPlus` icon.
- **Added** New `Gift` icon.
- **Fixed** Inline input and its actions are focusable even when disabled.
- **Fixed** Focus is lost when user activates Close button with `Space` key.
- **Fixed** `Slider` didn't respond to Home and End keyboard keys.
- **Fixed** Error with `CREATE_COMPONENT` symbol and different core versions for Popper and Tooltip packages.

## [16.4.1] - 2025-07-04

### @semcore/core

- **Added** `useScrollBarWidth` hook.
- **Added** Container focus if there aren't focusable children while `autoFocus='enforced'`
- **Added** `focusVisible` option to `setFocus` util method with value from last interaction type.
- **Fixed** a11y error - "SVG element missing accessible name".
- **Fixed** Missing focus outline in Safari during mixed mouse and keyboard interaction.
- **Added** Feature highlight implementation.
- **Fixed** Modal rendered duplicate Close buttons when `closable = true`.
- **Changed** `Close` and `Check`. We made them a bit smaller so they will look a bit more elegant and align better with other icons from the same semantic group. We also tweaked thickness of the `Close` icon with M size a little bit.
- **Fixed** Modal doesn't close on ESC key press when no element inside is focused.
- **Fixed** Page layout appeared shifted due to width/height changes.
- **Changed** Text align for `WidgetEmpty.Title` to be always centered.

## [16.4.0] - 2025-06-23

### @semcore/base-components

- **Added** New properties - `shadowSize` and `shadowTheme` for customize Shadows.
- **Added** Tokens form basic palette to themed .css files.
- **Changed** Value for `--intergalactic-sidebar-nav-control-hover` token (was updated to match gray palette) and fixed lightness for `--intergalactic-violet-dusty-50` token.
- **Added** Ability to set initial sort value as undefined.
- **Added** Ability to set `width` as `100%` and don't skip this value in scrollDirection calculation.
- **Added** Property `name` to a column group type.
- **Added** Export for `DataTableProp` and `DataTableChangeSort` types.
- **Added** `null` as possible value for `DataRowItem`.
- **Added** `uniqueRowKey` property to define unique key in each row. `UNIQ_ROW_KEY` symbol was deprecated.
- **Changed** Types for `defaultGridTemplateColumnWidth` set to string - any `grid-template-column` css value.
- **Changed** `selectedRows` from indexes to `UNIQ_ROW_KEY` values.
- **Changed** Width of accordion is always `100%` instead of dynamic calculation.
- **Fixed** Table scrolls up a bit on every interaction in header.
- **Fixed** Interact with the table using the keyboard after clicking the mouse in a certain cell.
- **Added** `sticky` property for Dropdown.Group.
- **Change** Clear highlightedIndex after closing popover to correct default value depend on type - `0` for DropdownMenu and `null` for Select.
- **Changed** Use parameterized ScrollArea instead of custom styles for shadows.
- **Fixed** Issue where users couldn't navigate to nested items with the keyboard when the parent item was hovered with the mouse.
- **Added** `EU` (European Union) to the list of ISO2 codes.
- **Fixed** Allowed entering non-numeric characters after in numeric input.
- **Fixed** Rendering issues in ScoreDonut and ScoreSemiDonut when value is 0.
- **Fixed** ScoreLine rendered segments with zero value, causing unnecessary visual elements.
- **Fixed** Issue where users navigate to the second option in select after opening.
- **Fixed** Focus after selecting some option(s) in multiselect was on popper instead of trigger.

## [16.3.0] - 2025-06-16

### @semcore/add-filter

- **Added** Controlled mode for visibleFilters.
- **Added** ResizeObserver for the `Wrapper` component in the `ScrollArea`.
- **Changed** `keyboardFocus` to `focus` event for popper triggers with `hover` interaction.
- **Fixed** Legend for `Bubble` chart.
- **Added** New `Bubble` child component (`Bubble.Circle`) which incapsulates all the inner logic of how to draw a circle.
- **Fixed** Legend item behavior when the it's in unchecked state but the chart line dedicated to it behaves as active.
- **Fixed** Animation for `Dots` with pattern.
- **Fixed** Unsupported attributes on DOM nodes in `Area` chart.
- **Fixed** Incorrect `aria-sort` attribute on Column item.
- **Fixed** Incorrect `aria-controls` attribute on Accordion button.
- **Fixed** Divider styles for for `theme='invert'` & `use='primary'`.
- **Fixed** Keyboard interaction.
- **Changed** Deprecated `highlighted` property for `DropdownMenu.Item`.
- **Changed** Supported changing handlers in `Popper` with interaction `focus`.
- **Changed** Left and right paddings for messages wider than 768px are now `(--intergalactic-spacing-6x), 24px` instead of `0`.
- **Fixed** Vite plugin.
- **Fixed** Score donut dissapears when value between 98 - 99 is passed.
- **Fixed** An issue with rendering custom child element in a trigger with `Text` or `Value` child element.
- **Fixed** Slider knob did not move to max value or decrease when entering a value greater than max in the input, focusing the knob, and pressing the Left Arrow key.

## [16.2.0] - 2025-05-30

### @semcore/data-table

- **Fixed** Animation for accordions in table.
- **Added** New `ChartVenn` icon.

## [16.1.0] - 2025-05-22

### @semcore/icon

- **Added** New `PRToolkit` icon.

## [16.0.1] - 2025-05-21

### @semcore/data-table

- **Fixed** Property `sideIndents`.
- **Fixed** Calculation of sorted columns width on the first render.
- **Added** Support for using `Accordion` on merged rows.

## [16.0.0] - 2025-05-20

### Components structure changes (new packages)

- New `semcore/base-components` package combines packages: `animation` ,`breakpoints` , `flex-box` , `grid` , `neighbor-location` , `outside-click` , `popper` , `portal` , `scroll-area`.
- `semcore/core` package combines: `semcore/core` and `semcore/utils` packages.
- Marked as deprecate (we’ll delete those packages in Major v17) `format-text` , `sticky` , `InputMask`.
- Replaced FormatText with Text from semcore/typography.
- Delete the email package and documentation → use Dionysus (Quazar docs, recording of the presentation, Figma library). You can direct all questions about emails and their templates to the #wire-team channel.
- Removed ‘External’ pack of icons (like FacebookClick, linkedinLike, PinterestSend, etc.) that are not used.
- Switch from custom keyboardFocus logic to :focus-visible for all component packages
- Fixed wrong paddings in Wizard.Stepper.
- Updated Addon and Circle styles in Tag, so that Circle and Addon can be displayed together with correct indents.
- Moved outline keyboard-focus tokens inside their "parent" tokens. Removed `keyboard-focus-invert-outline` , added `keyboard-focus-invert`.
- Data-tables are based on Grid.
- API is changed.
- No elements except table header and table rows can be direct children of the table, all custom elements should be placed in cells or outside of the table (except when `aria-busy` is enabled).
- Basic tables (without multi-level header, interactive elements as buttons, checkboxes) now work in SSR out of the box.
- Virtualization works out of the box (also for the rows with unknown height).
- Accordion is now built-in (without the `accordion` package) (use `[ACCORDION]` key in data).
- displaying checkboxes and selecting rows (`selectedRows` and `onSelectRow`).
- enlarged 20px left/right paddings (`sideIndents="wide"`).
- built-in empty state based on `WidgetEmtpy`, which displays automatically when the data is empty. Use the `renderEmptyData` prop to render your own empty state.
- built-in loading state based on `SpinContainer` (`loading` prop).
- The table with interactive elements inside the cell does not re-render on hover-actions.
- Improved the data table performance: our tests on the basic tables with 50/100 rows and tooltips inside show 2-4 times faster speed [depends on browser].
- Changed Tooltip.Popper initialization process - the popper container is not added to the DOM before the tooltip is shown the first time.

## [15.131.0] - 2025-05-13

### @semcore/format-text

- **Added** Esm-build by vite.
- **Added** `CSSinJS` to the exports.

## [15.130.0] - 2025-05-09

### @semcore/icon

- **Added** New `EnterpriseSolutions` icon.
- **Fixed** Extraction styles for production build.
- **Added** `createUUID` util to the exports list.

## [15.129.0] - 2025-04-11

- **Added** New `AIToolkit` icon.
- **Changed** `SEOToolkit` icon a little bit.

## [15.128.0] - 2025-04-04

### @semcore/bulk-textarea

- **Added** New type for value/onChange. It could be `string` or `string[]`, depends on type of `value` property. `string` by default.
- **Fixed** Error if after processing the inserted value it will be empty array.
- **Fixed** Error with empty `utf` characters in `onChange` / `lineProcessing`.
- **Fixed** Cursor position after focusing a non-empty field.
- **Fixed** Blinking previous error after clicking on another line with error.
- **Changed** Email in FeedbackRating error notice as a link.
- **Changed** Star icons in Slider component.
- **Changed** Close feedback form behavior - the rating value is cleared.
- **Changed** It is impossible to open a form with an empty rating.
- **Added** Exports in `package.json` for correct ESM build.
- **Fixed** Closing in some rare cases.
- **Fixed** Double call of `onChange` in InputSearch component.
- **Added** `setRef` and `getDisplayName` utils to the exports list.

## [15.127.0] - 2025-03-28

### @semcore/button

- **Added** New `brand` theme. `warning` theme was deprecated.

## [15.126.1] - 2025-03-20

### @semcore/date-picker

- **Fixed** `dayjs` external setting in vite config.
- **Added** Exports to package.json.
- **Added** `color` and `if` utils to the exports list.

## [15.126.0] - 2025-03-14

### @semcore/accordion

- **Added** Build for ESM.
- **Added** `inert` and `aria-hidden` to collapsed Accordion.Item with preserveNode property to prevent focus and reading of hidden elements.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Fixed** Tooltip issues when using bulk-textarea without common error message.
- **Added** White background for both light and dark themes.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** `DisabledDates` type to describe the type of disabled dates in the application code.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Animation for scrolling to the highlighted node to hide the delay after opening.
- **Added** Support for virtual list.
- **Added** Build for ESM.
- **Added** Support for virtual list.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Changed** Name for Traffic & Market toolkit icon to `TrafficMarketToolkit`.
- **Added** Group of platform icons.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Fixed** Setting the cursor to the end of input even if the character in the middle was deleted.
- **Added** Build for ESM.
- **Fixed** `locale` property type. Moved from `InputNumber.Value` to `InputNumber`.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Fixed** Types for correct display in documentation.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Using `defaultHighlightedIndex` prop to set defaultHighlightedIndex after select opening.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** `Exports` to the package.json for esm builds.
- **Added** New tokens for the new `violet-dusty` color with all the necessary shades from 50 to 800. New tokens for main Semrush header: `header-bg`, `header-border-primary`, `header-border-secondary`. New tokens for Semrush sidebar navigation: `sidebar-nav-control-hover`, `sidebar-nav-control-active`, `sidebar-nav-control-text-normal`, `sidebar-nav-control-text-active`, `sidebar-nav-control-icon-normal`, `sidebar-nav-control-icon-active`. New tokens for floating control: `box-shadow-float-control`, `box-shadow-float-control-hover`.
- **Added** Build for ESM.
- **Added** Build for ESM.
- **Added** `text-wrap: balance` for Description, to display long descriptions in a better, trendy, and modern way. No orphans left hanging.
- **Added** Build for ESM.

## [15.125.0] - 2025-02-07

### @semcore/bulk-textarea

- **Fixed** Incorrect filename for module entry point.
- **Added** `size` property: `l` and `m` (default).

## [15.124.1] - 2025-02-05

### @semcore/flex-box

- **Changed** Fixed ESM build.
- **Changed** Fixed ESM build.

### @semcore/button

- **Fixed** `background-color` token name for primary button with `neighborLocation` enabled.
- **Added** New `Copilot` icon.
- **Added** Required dependency `@semcore/typeography`.

## [15.123.0] - 2025-02-03

### @semcore/add-filter

- **Added** AddFilter component.
- **Added** New BulkTextArea component.
- **Fixed** Width shrinking in Flex containers.
- **Fixed** Handle table cell focus for any interactions. Now works only for keyboard.
- **Added** `inputmode=numeric` for the DatePicker inputs.
- **Added** `notificationTitle` prop to `FeedbackRating`.
- **Added** type `email` for config in `FeedbackRating.Item`.
- **Changed** Set `inputMode` to `numeric` if `step` is an integer, otherwise to `decimal`.
- **Added** `popperMargin` property to set maxSize (width or height) of popper to height from the content minus this margin.
- **Changed** Remove `inert` attribute after the animation of Spin ends.
- **Added** `inputmode=numeric` for inputs.
- **Added** `plural`, `selectordinal` and others Intl formatting for translations.
- **Added** `inputMode` and `autoComplete` as an item of default input props.

## [15.122.0] - 2025-01-21

### @semcore/data-table

- **Fixed** Incorrect calculation sizes for fixed (in right place) columns.
- **Changed** Consider only elements with `draggable` attribute in calculations indexes.
- **Added** `stopPropagation` for keydown events with `Arrow-*` as a `e.key`.
- **Fixed** styles for use with DnD.
- **Changed** `white-space` property to `pre` for preserve spacing.
- **Added** `aria-describedby`, that refers to ScreenRiderOnly text, `aria-labelledby` referring to the notice text, `aria-valuetext` to SliderRating.
- **Added** `role="image"` and `aria-label` for SliderRating's readonly mode
- **Added** `role="none"` to SVGs in SliderRating.
- **Added** `aria-labelledby` for the FeedbackRating's modal container, that refers to Header of it
- **Added** autofocus to first checkbox. Moved from `textarea`.
- **Added** `aria-describedby`, that connects privacy-description text and related form control in FeedbackRating form.
- **Added** same visual feedback for keyboard interactions to SliderRating same as on hover.
- **Changed** color of privacy-description text to the `text-secondary` token in FeedbackRating form.
- **Changed** `FeedbackRating.Header` as optional, when specifying FeedbackRating's `header` prop.
- **Removed** `title` attribute from FeedbackRating form.
- **Removed** `<ul><li>` structure from checkboxes, leaving only `div role="group"` in FeedbackRating form.
- **Removed** unnecessary tooltip around `input[type="hidden"]`.
- **Removed** `line-height` from privacy-description text in FeedbackRating form.
- **Removed** `aria-invalid` from checkbox's parent elements.
- **Removed** `aria-haspop` from tooltip of field controls
- **Added** New `ChatGPT` icon.
- **Added** New `VideoList`, `VideoStreaming` icons.
- **Added** `Notice.Title` and `Notice.Text` components.
- **Added** `title` props to `NoticeSmart`.
- **Removed** `aria-busy` attribute as unnecessary.
- **Removed** `aria-busy` attribute as unnecessary.
- **Added** `role="img"` for correct recognition by assistive technology and to avoid double reading.
- **Removed** `aria-busy` attribute as unnecessary.

## [15.121.0] - 2024-12-30

### @semcore/breadcrumbs

- **Changed** Active breadcrumb tag to `span`.
- **Added** Keyboard handler for zoom data in carousel by `enter` or `space`.
- **Added** `aria-hidden="true"` to `PatternSymbol` inside `LegendItem` to improve A11Y.
- **Removed** `aria-labelledby` from `LegendItem` with shapes other, than checkbox.
- **Changed** `aria-labelledby` value in `LegendItem` to unique id.
- **Fixed** Animation of points on ScatterPlot was on every render.
- **Added** `outilne=none` for Hover rect and line.
- **Added** `aria-*` attributes for svg from parent group for all simple charts (Chart.*).
- **Added** `aria-label=Chart` by default for all advanced charts (Plot...).
- **Fixed** Table remained inert after clicking on sort icon.
- **Fixed** Keyboard navigation on table with virtual scroll.
- **Fixed** `aria-colindex` was set for each Head.Cell components, even for a group.
- **Changed** Hide scrollbars from Screen Readers in Table.Head and Table.Body.
- **Removed** Unnecessary `role=combobox` for all inputs from popper in any Comparator.
- **Added** `menuitemcheckbox` and `menuitemradio` roles for DropdownMenu.Item.
- **Fixed** Items lost highlighting after filtering the list.
- **Added** `menuitemcheckbox` and `menuitemradio` roles for DropdownMenu.Item.
- **Changed** Removed tabIndex on Menu Items in advanced mode.
- **Added** `tabindex` for the `FeedbackFrom.Success` component with `outline=none`.
- **Added** `aria-hidden=true` by default for all illustrations.
- **Fixed** `aria-describedby` for editable tags.
- **Fixed** Render hint's popper on Link with addonLeft as props and no children.
- **Removed** `aria-live` from all items.
- **Removed** `aria-label` from "muted" theme.
- **Added** Log with recommendation to provide aria-labels that help distinguish different types of notices.
- **Added** autofocus to the Notice with focusable elements.
- **Fixed** Notice didn't close by `escape` key.
- **Fixed** users cant compose `Modal` inside the `DropdownMenu.Item`.
- **Added** Role `img` for the Skeleton components.
- **Changed** `aria-haspopup` on trigger can be set from props.
- **Fixed** Attribute `onAuxClick` was not applying to components.

## [15.119.0] - 2024-11-29

### @semcore/accordion

- **Removed** Unnecessary `aria-disabled` on disabled `Toggle` component.
- **Changed** Set `aria-controls` to expanded `Toggle` only.
- **Removed** Default tag `button` from FilterTrigger and ButtonTrigger to reduce code duplication.
- **Changed** Default tag for BaseTrigger to `button` as part of a11y improvement.
- **Fixed** Added `Hint` to the `FilterTrigger.ClearButton`.
- **Fixed** Remove redundant `aria-label` & `aria-labelledby` from `FilterTrigger.ClearButton`.
- **Fixed** Added `role` combobox to the `FilterTrigger.TriggerButton`.
- **Fixed** Added `count` prop to `FilterTrigger.Counter`, along with screenreader only `selected` text.
- **Fixed** `placeholder` text is now `aria-hidden` for triggers because of `aria-label` and double pronouncing.
- **Removed** Unnecessary `aria-disabled` on disabled button.
- **Added** `aria-labelledby` for `LegendItem` checkbox.
- **Added** New type of charts - `StackGroupBar`.
- **Fixed** Keyboard access after changing data in the Table (only if focus outside a Table).
- **Fixed** Blinking when opening `DateRangeComparators`.
- **Fixed** Click handler was called for disabled Item.
- **Fixed** Dropdown didn't close when the trigger was clicked for the second time.
- **Fixed** Handlers were not called for `Dropdown.Item` in a controlled `DropdownMenu` after it was closed and opened again.
- **Fixed** Double call of `onVisibleChange` handler.
- **Fixed** Handlers were not called for `Dropdown.Item` in a controlled `DropdownMenu` after it was closed and opened again.
- **Fixed** There was always `aria-errormessage` in FeedbackItem, even if there was no message popup.
- **Added** `ScreenReaderOnly` component from `Root` component from `core` package.
- **Fixed** Focus didn't return to the View element after edit.
- **Removed** Unnecessary role changes on keypress.
- **Fixed** Difference in text size in tags with and without Addons.
- **Fixed** Advanced rendering of child elements doesn't display tags at all.
- **Fixed** Unnecessary `clickable` announcement by VO on not editable tags.
- **Added** `role=img` to all svg charts.
- **Added** `replaceLast` method to the Manager to display the next bubble on over the last one.
- **Fixed** Warning about `Hint` title about `title` and `Hint.Popper` at the same time.
- **Fixed** Unnecessary counter resetting with each mount of `NoticeBubble` component.
- **Added** Logic for showing/hiding highlight for an option depending on whether the Trigger is in focus or not.
- **Fixed** set `aria-activedescendant` for Trigger only if there is available option with current highlightedIndex.
- **Fixed** The first option is highlighted, event if it is disabled.
- **Added** `placeholder` and `aria-label` for input in `InputSearch` component.
- **Added** Internal method for extract some children by the displayName from the `Children` entity.
- **Changed** Marked `ScreenReaderOnly` as deprecated component, use it now from `flex-box` package.

## [15.118.0] - 2024-11-22

### @semcore/base-trigger

- **Fixed** HTML element of `LinkTrigger` from `div` to `button` as part of a11y improvements. The change allows to use 'LinkTrigger' with `label` properly
- **Changed** Description for `innerHint` and `hintAfter` properties.
- **Fixed** `aria-label` property moved from the root component to the `Input.Value` component.
- **Fixed** `onMouseEnter` in Dropdown.Item was not bubbling the event.
- **Removed** `role='alert'` from `<Error>` component.
- **Removed** `aria-hidden` from `Error.Image`.
- **Changed** Empty `alt=""` for `Error.Image`.
- **Changed** Padding and colors in examples in documentation.
- **Added** `modalWidth` property for the FeedbackRating component.
- **Changed** Moved `InputTags.Value` from `ul`.
- **Changed** Added calculated accessible name from `InputTags.Value` as `aria-label` for `ul` group.
- **Fixed** Cropping in `SemiDonut` chart.
- **Fixed** Call `onKeyboardFocus` for poppers inside poppers.
- **Fixed** `findAllComponents` method. Now it correctly searches in descendants of merged components.

## [15.117.0] - 2024-11-18

### @semcore/date-picker

- **Changed** Aria-label for date presets listbox.
- **Added** Translations for aria-label for date presets listbox.
- **Fixed** Custom `visible` and `onVisibleChange` properties to Ellipsis.
- **Added** Possibility to set `aria-labelledby` to the `Popper`.
- **Removed** Not working `aria-valuemin` and `aria-minmax`, because of type `text` for input in InputNumber.
- **Changed** `Addon` component to the Addon from `TagContainer.Tag`. IMPORTANT - you should use Addon in `InputTags.Tag.Text` for correct rendering.
- **Added** `Intl.NumberFormat` for total pages.
- **Change** `Input` to `NumberInput` for `Pagination.PageInput` component.
- **Fixed** Formatted value displaying - correct thousands' separator depending on locale.
- **Fixed** Display of tags with TagContainer and `Addon` / `Circle` in the `InputTags` component.
- **Fixed** Display of tags with TagContainer and addons.
- **Added** `max-content` width for Tooltip by default.

## [15.116.0] - 2024-11-08

### @semcore/color-picker

- **Fixed** Display `Hint` on focused `Color.Item`.
- **Fixed** Double click event on DropDownMenu.Items.
- **Added** Export for `DropdownPopperAriaProps` type.
- **Fixed** Unexpected focus on actions in DropdownMenu.Item.
- **Added** `DropdownPopperAriaProps` type for DropdownMenu.Popper props.
- **Changed** A11y improvements: added role="dialog" and autofocus for the popover, made an aria-label or aria-labelledby a required attribute. Disabled aria-haspopup and changed the default interaction to "none" for the trigger.
- **Added** `baseBgColor` option to specify pass second color as background for TrendLine and ScoreDonut
- **Fixed** The `Option` not being highlighted by default when opening `Select` by `focus` interaction.
- **Added** `role=status` to TooltipPopper Wrapper.
- **Fixed** Hooks order in focusLock hook.
- **Added** `left` and `top` properties with `-1` value to `ScreenReaderOnly` container for prevent impact on layout of application.

## [15.115.0] - 2024-11-01

### @semcore/button

- **Fixed** Disabled state is not applied to ButtonLink.
- **Fixed** Fix unpredictable behavoir of charts with pattern fill, when interacting with chart's legend
- **Fixed** Unexpected focusing on the first element of table after first clicking on some interactive element inside it.
- **Fixed** Logic of showing tooltip with one line text and float width value.
- **Added** New `PopupAlt` icon.
- **Added** Possibility to press both `.` and `,` as a decimal separator.
- **Changed** Added selector specificity for modal close button.
- **Added** `display: contents` for ThemeProvider element by default.
- **Fixed** Types for ThemeProvider: added all `JSX.IntrinsicElements['div']` types.
- **Changed** Code cleanup - removed unnecessary promise in focus handler for focusBorders.

## [15.114.0] - 2024-10-28

### @semcore/ellipsis

- **Fixed** Logic of showing tooltip for trimmed in the middle texts - show only for cropped.
- **Fixed** Returning focus to trigger for focusable interaction popovers.
- **Changed** Focus lock logic. For now, we add focus borders in every trap node instead of one instance for whole document.

## [15.113.0] - 2024-10-23

### @semcore/d3-chart

- **Added** Function type for `hideHoverLine` property in the `Hover` component.

## [15.112.0] - 2024-10-18

### @semcore/carousel

- **Fixed** Types for enhances.
- **Fixed** Types for enhances.
- **Fixed** Handle onClick on ChartLegend items.
- **Fixed** `onChangeVisibleItem` handler on ChartLegend component.
- **Fixed** Keyboard control in NVDA form mode for Legend checkbox items.
- **Fixed** Each checkbox in the Legend rendered as 3 elements for NVDA.
- **Added** Required `aria-*` attributes for the Legend.
- **Fixed** Types for enhances.
- **Changed** Improve accessibility for component.
- **Added** New `DropdownMenu.Item.Text` for wrapping text if used with addons.
- **Added** `line-height` value to temporary element size calculation.
- **Fixed** Types for enhances.
- **Added** New `ShopifyColored`, `WooCommerceColored`, `MetaColored`, `WhatConvertsColored`, `CallTrackingMetricsColored`, `GoogleDisplayVideoAds`, `PipedriveColored`, `CampaignMonitorColored`, `ConstantContactColored`,`Yext`, `BirdeyeColored`, `InstagramColored` icons.
- **Added** New `Tack` and `TackNo` icons.
- **Changed** Disable input field if total number of pages is one.
- **Fixed** Animations in some popovers (for example in dropdown menu items).
- **Added** Internal type for transform enhances types to the `asProps` type.
- **Fixed** Display values for design tokens with modifications.

## [15.111.0] - 2024-10-11

### @semcore/base-trigger

- **Fixed** Interaction with non-interactive icons (with `aria-hidden`) in Addons.
- **Fixed** Interaction with non-interactive icons (with `aria-hidden`) in Addons.
- **Added** New `Recent` icon.
- **Fixed** Interaction with non-interactive icons (with `aria-hidden`) in Addons.
- **Fixed** Interaction with non-interactive icons (with `aria-hidden`) in Addons.
- **Fixed** Update focusLock version.

## [15.110.0] - 2024-10-04

### @semcore/button

- **Fixed** `hasChildren` condition to only display full Button or Addon only.
- **Fixed** Preventing defaults and propagation for pressing Enter on TableCell with focusable elements.
- **Changed** Calendars aria attributes and roles now makes it to be represented and announced as grid to make it accessible for screen readers.
- **Changed** Calendar navigation arrows now get specific aria labels like "Previous month" and "Next month" instead of "Previous period" and "Next period".
- **Changed** Popper aria role changed from "region" to "dialog".
- **Changed** Input trigger got combobox role.
- **Added** `AbstractDropdown` internal class. It's needed to create DropdownMenu and Select.
- **Added** `Dropdown.Item` with styles for DropdownMenu.Item and Select.Item.
- **Added** `Dropdown.Group` with styles for wrap DropdownMenu.Item and Select.Item into groups.
- **Changed** Refactored to `AbstractDropdown` and `Dropdown.Item`.
- **Changed** Now all `aria-*` attributes are passed to the input field.
- **Added** `inputRole` prop.
- **Fixed** `hasChildren` condition to only display full text link or Addon only.
- **Changed** `aria-haspopup` set to `dialog` if select has some additional buttons in popover.
- **Changed** Refactored to `AbstractDropdown` and `Dropdown.Item`.
- **Fixed** Using Button close with only icon.
- **Added** Method for get accessible name of element.
- **Fixed** Click outside utility was considering all clicks inside of shadow root as clicks outside.
- **Changed** Internal apis extending.
- **Fixed** Switching wizard steps with arrows.

## [15.109.0] - 2024-09-27

### @semcore/icon

- **Added** New `Ahrefs`, `Microsoft`, `Moz`, `Shapchat`, `Amazon`, `CallRailColored`, `MailChimp`, `Matomo`, `LinkedInColored`, `TikTokColored`, `TikTokColoredInvert`, `Salesforce` icons.
- **Changed** Removed weird animation delay on `SidePanel` close that was causing animation fragmenting.
- **Fixed** Moving focus in an iframe didn't remove visible focus from elements in the focus-locked container.
- **Fixed** Attribute `suppressHydrationWarning` was not appling to components.

## [15.108.0] - 2024-09-20

### @semcore/button

- **Added** Component `ButtonLink`.
- **Changed** Render hints in header with `ButtonLink` component.
- **Fixed** Carousel controls are not focusable and available to be navigated to each control by screen readers.
- **Added** Keyboard navigation.
- **Changed** Render confirm/cancel buttons with `ButtonLink` component.
- **Changed** Tags remove button now follow tag in the DOM.
- **Changed** Added aria description to editable tags.
- **Changed** Render total pages button with `ButtonLink` component.
- **Changed** Render back button with `ButtonLink` component.
- **Changed** Remove button aria-label from "Remove" to "Delete".
- **Fixed** `interactive` prop passing from `TagContainer` to `Tag`.
- **Added** `TagContainer.Circle` and `TagContainer.Addon` components.
- **Changed** Remove button aria-label from "Remove" to "Delete".
- **Fixed** `interactive` prop passing from `TagContainer` to `Tag`.
- **Fixed** Hidden elements might be considered as focusable. It was breaking "Skip to content after plot" feature in d3-chart in some cases.
- **Added** `Wizard.StepBack` and `Wizard.StepNext` buttons.
- **Added** Autofocus on wizard content after step change.
- **Changed** Correct `tab` and `tabpanel` roles connecting of wizard steps and content.

## [15.107.0] - 2024-09-06

### @semcore/color-picker

- **Fixed** `role` and `aria-*` attributes on Trigger, Popper and Color items.
- **Fixed** Description for delete colors from custom palette.
- **Added** Properties to enable changing size of sortable columns (by default, `false`). `changeSortSize` for columns that could be can be increased for the sort icon and `sortSizeRecalculation` for column due to which there may be an increase. By default, for sortSizeRecalculation used column with maximum width.
- **Added** `aria-haspopup=dialog` in Trigger.
- **Fixed** In combobox patterns users needed double click outside to unfocus the input.
- **Changed** Accessibility pattern `aria-activedescendant` to `row-in-tabindex`.
- **Changed** Added possibility to add some actions for menu item (as submenu).
- **Changed** Refactored Nesting menu.
- **Changed** Now DropdownMenu with `interaction="hover"` has `timeout={[0, 100]}` (0 for showing, 100 for hiding) by default.
- **Fixed** Strange viewBox issue in `CursorMove` icon.
- **Changed** Internal `ignoreFocus` logic on focusable trigger.
- **Changed** Using old version of DropdownMenu component.
- **Fixed** In some rare cases, tooltip wasn't appearing.
- **Added** Internal api for understanding what (mouse or keyboard) caused focus change.
- **Added** New `--intergalactic-form-control-s` token for Button with `s` size. Use it for small interactive addons. Avoid using it with the main actions.
- **Fixed** Now focus lock is preventing focus from falling into iframes.

## [15.106.0] - 2024-08-23

### @semcore/dropdown

- **Fixed** Focusing in popover.
- **Changed** Enforce role (`combobox` or `button`) to trigger by its tag.
- **Fixed** Disable `autoFocus` to popper.
- **Changed** Close icon replaced with button.
- **Added** New `TikTok` icon.
- **Fixed** Browser error about trying to focus on the svg element with `aria-hidden` (in Button, for example).
- **Added** API to render custom segments in Score.Line.
- **Changed** Styles for Bar and Donut mini charts.
- **Changed** Close icon to button.
- **Changed** Content is now centered vertically by default.
- **Removed** Default `role` from trigger.
- **Fixed** Display of invalid state.
- **Fixed** Loosing focus in Description.Tooltip.
- **Fixed** Enforce role `button` to DescriptionTooltip trigger.

## [15.105.0] - 2024-08-17

### @semcore/data-table

- **Fixed** Sort icon behavior.
- **Fixed** Columns width (min-width) calculation.
- **Changed** Using `Notice.Close` instead of `Notice.CloseIcon`.
- **Fixed** Using `theme` property for Notice.
- **Changed** Updated translations.
- **Changed** Close icon to `Button` component.
- **Changed** Updated translations.

## [15.104.1] - 2024-08-13

### @semcore/accordion

- **Added** `alignItems=center` property by default to the ToggleButton.
- **Fixed** Clear the role of Menu popper.
- **Added** Handler for `onWheel` property on `Input.Value`.

## [15.104.0] - 2024-08-12

### @semcore/d3-chart

- **Changed** Radial tree radian line wasn't applying provided color.
- **Changed** Venn chart was rendering `0` data with minSize (not it's not rendered at all).
- **Changed** Close icon to `Button` component.
- **Added** New `Configuration` illustration.
- **Changed** Confirm and cancel controls now focusable and accessible from keyboard to satisfy formal A11y requirements.
- **Removed** Keyboard hint aria label.
- **Changed** Removed `aria-posinset` as it wasn't improving component accessibility.
- **Fixed** Passing undefined to `zIndex` prop was removing default `zIndex` value.
- **Changed** Color and margins for the Close button.
- **Fixed** `z-index` was too high (default value changed 1500 -> 800).

## [15.103.0] - 2024-08-05

### @semcore/button

- **Changed** Changed `loading` set spinner color setting. Instead of palette, hardcoded to `theme` and `use` props, color of text in button is used. Default color of this state visually preserved.
- **Added** Role `dialog` to the popper.
- **Changed** Hidden scrollbars inside of listbox from screen readers to comply formal a11y requirements.
- **Fixed** View for close icon as a `Button` component.
- **Fixed** React errors in console about `validationOnBlur` property.
- **Changed** Close icon to `Button` component.
- **Added** Runtime check of required label in `Popper` component with role `dialog`.
- **Add** Context to hide scrollbars from screen readers.
- **Fixed** Depending on css reset, a small visual gap might appear between `Select.InputSearch` right border and outer container.
- **Changed** Fixed reading of dropdowns by Screen readers.
- **Changed** Removed unnecessary `aria-hidden` props.
- **Changed** Text in some `aria-label`.
- **Changed** Runtime check of required label in `DescriptionTooltip` popper moved to `Popper` component.
- **Fixed** In firefox focus lock with a single focusable element was allowing user focus to get our of the web page.

## [15.102.1] - 2024-07-30

- **Fixed** Tokens for `Button` with `use="primary"` and `theme="warning"`: from `--intergalactic-icon-primary-warning` and `--intergalactic-icon-primary-warning-hover-active` to `--intergalactic-control-primary-brand`, `--intergalactic-control-primary-brand-hover` and `--intergalactic-control-primary-brand-active`.
- **Fixed** Component `z-index`.
- **Fixed** `z-index` stacking for class components.

## [15.102.0] - 2024-07-26

### @semcore/d3-chart

- **Added** `minRadius` property to Venn.Chart.
- **Added** `index` to children render function of `CompactHorizontalBar` subcomponents.
- **Added** Gaps between bars in StackBar chart.
- **Added** Support for design tokens in `theme` prop.
- **Changed** Enabled `z-index` stacking.
- **Changed** Enabled `z-index` stacking.
- **Changed** Enabled `z-index` stacking.
- **Added** Property `observeParentSize` to enable recalculation if the parent of ScrollArea is resized. Default value is `false`.
- **Changed** Enabled `z-index` stacking.
- **Changed** Enabled `z-index` stacking.
- **Added** Internal apis to control nested `z-index` stacking.

## [15.101.0] - 2024-07-19

- **Added** `CompactHorizontalBar` chart.
- **Fixed** Popper not opening a second time with interaction `focus`.
- **Fixed** Glitches if the parent of scrollArea has a decimal height or width value.
- **Added** `CompactHorizontalBarChartSkeleton` component.
- **Changed** `margin-top` for Slider options.

## [15.100.0] - 2024-07-17

### @semcore/data-table

- **Fixed** View of ScrollArea shadows in table body.
- **Fixed** Close button shape wasn't square.
- **Fixed** Warning notices announcement was read twice by NDVA.
- **Fixed** Warning notices wasn't announced as alert by Voice Over.
- **Added** Close button tooltip.
- **Added** `aria-controls` to `DescriptionTooltip.Trigger`.
- **Added** `arrowBgColor` and `arrowShadowColor` properties for Tooltip.Popper.

## [15.99.0] - 2024-07-13

### @semcore/accordion

- **Added** `use` prop.
- **Fixed** View of Bottom horizontal scroll in table body.
- **Fixed** Styles of ScrollContainer inner shadows.
- **Fixed** Plugin working with `intergalactic` package.
- **Added** New `AdMiddle` and `PositionMiddle` icons.
- **Fixed** A small positioning fix in `AdBottom` and `AdTop` icons (only size M).
- **Added** `primaryColor` and `secondaryColor` prop that allow to change primary color of illustrations.
- **Fixed** Illustration components typings.
- **Changed** Added `role="dialog"`, `aria-label` or `aria-labelledby` are required from now.
- **Changed** Close icon is wrapped into Button with localized aria-label.
- **Changed** `SidePanel.Back` is button now.
- **Changed** `SidePanel.Header` and `SidePanel.Footer` are using semantic `header` and `footer` correspondingly.
- **Added** `observeParentSize` property to observe changes in parent element.
- **Changed** Container tag changed to `button`, so now it may be referenced by `label` tag.
- **Fixed** Colors of tokens `--intergalactic-table-td-cell-hover` and `--intergalactic-table-td-cell-active` were different from the designed ones.

## [15.98.2] - 2024-07-09

### @semcore/input-number

- **Fixed** Editing after removing decimal part.
- **Fixed** Notice only with `danger` theme has aria-label "Critical Notification" (`warning` theme gets "Notification" as all other themes).

## [15.98.1] - 2024-07-08

- **Fixed** Display correct value with different decimal values.

## [15.98.0] - 2024-07-05

### @semcore/accordion

- **Changed** `Accordion.Item.Toggle` can have only `h*` tag, `h3` tag is default.
- **Added** Flex component `Accordion.Item.ToggleButton` with role `button`.
- **Fixed** Incorrect focus of the last item in Breadcrumbs.
- **Changed** Border radius to token instead of hardcoded value.
- **Fixed** `SortIcon` usage - removed unused prop `active`.
- **Added** Types for `scrollContainerRef` in `Datatable.Body`.
- **Changed** Type for each Icon to `Intergalactic.Component<'svg', IconProps>`.
- **Added** New `Power` icon.
- **Fixed** Display the correct value after pressing `0` after the decimal separator.
- **Fixed** Fixed edge case when popper trigger contains multiple focusable elements and navigation between them was causing popper to close until browser focus wasn't moved out of trigger.
- **Changed** Removed inner `foreignObject` element with `aria-live` element as it doesn't work properly with the newest screen readers.
- **Changed** Removed inner `foreignObject` element with `aria-live` element as it doesn't work properly with the newest screen readers.
- **Fixed** `max-width` size in line with figma design.

## [15.97.0] - 2024-06-26

### @semcore/breadcrumbs

- **Fixed** `box-shadow` displaying on focused item.
- **Added** `onClick` handler for `HoverRect.Tooltip`.
- **Added** `onClickHoverRect` and `onClickBar` handlers for `Chart.Bar`.
- **Added** `barIndex` and `barKey` values for `onClick` handler for `Bar` and `HorizontalBar`.
- **Added** `catch` for errors in animation promises in headers.
- **Added** Possibility to pass `scrollContainerRef` property to `Datatable.Body` and set it to a real table body container - `Scroll.Containter`.
- **Fixed** `highlightedIndex` type wasn't accepting `null`.
- **Fixed** Incorrect calculation of text width with font settings: `font-feature-settings` or `font-variant-numeric`.
- **Changed** `Report`, `PopularProducts`, `AddressPack`, `ChatQuestion` icons according to our icon design guidelines.
- **Added** New `OrganicCarousel`, `PopularStores` and `QuestionsAnswers` icons.
- **Changed** Notice with `warning` and `danger` themes now has aria-label "Critical Notification" (other teams has "Notification" as before).
- **Added** `muted` theme support.
- **Added** Notice bubble manager `.add()` method now returns `ref` and `focus()`.
- **Changed** Notice with `warning` and `danger` themes now has aria-label "Critical Notification" (other teams has "Notification" as before).
- **Changed** Close button aria-label now is "Close Notification" instead of "Close".
- **Changed** Hide `Addon` with confirmation icon in pagination input.
- **Fixed** Error about `foreignObject` on elements other than `svg`.
- **Added** Utility type `RequireAtLeastOne` in Intergalactic namespace.

## [15.96.1] - 2024-06-14

### @semcore/dropdown

- **Fixed** Dropdown with any `interaction` except `none` should be opened by pressing `Enter` or `Space`.
- **Fixed** Dropdown with `interaction='none'` shouldn't be opened by pressing `Enter` or `Space`.
- **Added** Possibility to open `focusable` popper by click on it (if the trigger is already focused).

## [15.96.0] - 2024-06-13

### @semcore/counter

- **Fixed** Using `theme` property with typed values instead of CSS-variables.
- **Fixed** Incorrect display of `ScrollArea.Bar` after reducing the parent size.
- **Fixed** Show popover with error message only for opened or focused `DatePicker`.
- **Changed** style for `FeaturePopover.Spot` background-color from `--intergalactic-bg-highlight-results` to `--intergalactic-feature-popover-dot-outer-border`.
- **Fixed** Now `string` is not an allowed value for theme prop.
- **Changed** Role from `status` to `region`.
- **Fixed** Now `string` is not an allowed value for theme prop.
- **Changed** value for `--intergalactic-feature-popover-dot-outer-border` token.

## [15.95.0] - 2024-06-12

### @semcore/carousel

- **Fixed** Display of zoomed item after transition from the last item to the first one in the cyclic scroll.
- **Fixed** DropdownMenu was getting unexpected autofocus if nothing else on page is focused.
- **Fixed** `aria-label` for the `Notice` in `FeedbackRating`.
- **Changed** `Facebook` icon according to the latest Facebook logo guidelines.
- **Fixed** Fixed case when `NoticeBubble` was resized and mouse left it without any mouse move so `NoticeBubble` didn't hide automatically.
- **Changed** Set as deprecated `hidden` property on Switch.Addon to avoid use two `Addons` in `Switch`.
- **Removed** `aria-checked` from Switch.Value.
- **Removed** `aria-labelledby` from Switch.Value.
- **Removed** `aria-hidden` from Switch.Addon.
- **Fixed** errors in imports with `intergalactic/utils/lib/*`.

## [15.94.1] - 2024-06-10

### @semcore/scroll-area

- **Fixed** Auto resizing for `ScrollArea` should work only if pass prop `wMax` or `hMax` to the container.

## [15.94.0] - 2024-06-07

### @semcore/breadcrumbs

- **Changed** Added `nav` tag for breadcrumbs container.
- **Changed** Added default `a` tag for breadcrumb item.
- **Changed** Wrapped breadcrumb items in an `ol` list.
- **Added** `Hint` for Button with addon and without text.
- **Changed** `Tooltip` to `DescriptionTooltip` for hints in card title.
- **Fixed** Button styles because DOM for `Button` with only addons has been changed.
- **Added** `ReferenceStripes` component.
- **Added** `ReferenceBackground` component (previously `ReferenceLine.Background`).
- **Changed** `ReferenceLine.Background` deprecated in favor of `ReferenceBackground`.
- **Fixed** Children type for `FeedbackForm.Item`.
- **Changed** Tag for `FullscreenModal.Section` is `section` instead of `div`.
- **Fixed** Type definition for Input's `placeholder` prop.
- **Fixed** Incorrect increment/dicrement in formatted Number Inputs.
- **Fixed** Removed onChange handler call for the value that ends with `-` and `.` as in native input with `type="number"`.
- **Added** `Hint` for Link with addon and without text.
- **Fixed** Programmatically opened popper were getting `tabIndex={0}` even without focusable elements inside.
- **Added** Auto resizing for `ScrollArea` if the parent element changes its size.
- **Fixed** Merging tooltip with Button component was breaking the button styles.
- **Fixed** Removed `aria-haspopup` and `role` from triggers of `Hint` and `Tooltip`.
- **Fixed** Removed `interaction` property from types of `Hint`.
- **Fixed** Removed warning theme from types of `Hint`.
- **Changed** `aria-haspopup` of `DescriptionTooltip` changed to `dialog`.
- **Fixed** `DescriptionTooltip` default children.

## [15.93.0] - 2024-05-31

### @semcore/feedback-form

- **Added** Max width for feedback rating modal by default to `320px`.
- **Added** Beautiful number formatting in `InlineInput.NumberValue`.
- **Fixed** Internal API to make it usable in `InlineInput`.
- **Fixed** Combobox pattern wasn't working out of the box with mouse interactions.

## [15.92.1] - 2024-05-30

### @semcore/date-picker

- **Fixed** Some dates might shift the month when entered in the input trigger.

## [15.92.0] - 2024-05-28

### @semcore/d3-chart

- **Fixed** Donut chart animation glitching on data change.
- **Fixed** Closing popper with `Esc` and `interaction=focus` might cause immediate reopen.
- **Fixed** `Tooltip` (`DescriptionTooltip` and `Hint` as well) with click interactions wasn't opening by keyboard interaction if trigger was not a button or icon.
- **Fixed** `getNodeByRef` issue that was causing errors in console when clicking on `Chart.Bubble`.

## [15.91.0] - 2024-05-27

- **Changed** `Line.Area` got an option `autoInterpolate` that allows to disable auto interpolation of all missing values.
- **Changed** `Line.Area` data now accepts `interpolateValue` symbol that allows spot interpolation of values if `autoInterpolate` set to `false`.
- **Fixed** Switching popper trigger was causing a glitch during the close animation.

### @semcore/popper

- **Fixed** Focusing popper might break next popper opening.

### @semcore/skeleton

- **Fixed** Dependency on `@semcore/portal` when Skeleton installed as a separate package.

## [15.90.0] - 2024-05-24

### @semcore/date-picker

- **Fixed** Range pickers with disabled dates were throwing an error in console after selecting a range.
- **Fixed** In some cases the second open of any popper was breaking the positioning engine.

## [15.89.0] - 2024-05-23

### @semcore/skeleton

- **Added** Live region "Loading…" announcement for assistive technologies.
- **Added** "Loading…" aria-label.
- **Added** `locale` prop.
- **Changed** `aria-atomic` attribute moved to inner `foreignObject` element.
- **Added** Live region "Loading…" announcement for assistive technologies.
- **Added** "Loading…" aria-label.
- **Added** `locale` prop.
- **Changed** Content inside of loading container is unavailable for interacting now.
- **Changed** `ScreenReaderOnly` now passed all props to the inner `span` element as DOM attributes.

## [15.88.0] - 2024-05-22

### @semcore/feedback-form

- **Added** New `FeedbackRating` component.
- **Added** New design tokens: `--intergalactic-slider-rating-normal` and `--intergalactic-slider-rating-hover-active`.

## [15.86.0] - 2024-05-17

### @semcore/breadcrumbs

- **Fixed** Line height, changed from `lh-100` to `lh-200` (from 133% to 142%).
- **Fixed** `RangeCalendar` customized children rendering layout.
- **Fixed** `MonthDateRangeComparator` trigger was formatting dates in trigger as dd/mm/yyyy instead of mm/yyyy.
- **Fixed** `disabledErrorText={null}` wasn't hiding error tooltip.
- **Fixed** In range pickers it was still possible to select range with disabled date.
- **Fixed** Hours and minutes of dates, selected from input trigger was containing current time instead of 00:00.
- **Fixed** `disabled` prop types.
- **Fixed** Unchecking "Compare to" checkbox in date range comparators wasn't clearing a date range to compare.
- **Added** Exports for `DateRangeComparatorValue` and `DateRangeComparatorFocusRange` types.
- **Fixed** `ThemeProvider` wasn't working with Storybook.

### @semcore/animation

- **Changed** Added fallback for `onAnimationEnd` callback to be triggered even if the environment doesn't support animations.
- **Changed** Added mechanism to return focus to the trigger after closing the dropdown menu after item's interaction.
- **Changed** Removed mechanism that returns focus to the trigger after items selecting as it was moved to underlying `DropdownMenu`.
- **Fixed** `ThemeProvider` wasn't working.
- **Fixed** In some cases focus was not returned after focus lock was released.

## [15.84.0] - 2024-05-16

### @semcore/popper

- **Fixed** Using singleton popper with a visibility delay set was causing popper to change position trigger with a delay.

### @semcore/data-table

- **Changed** If sorted column is too narrow to fit sorting item, the column slightly increases it's width.
- **Added** `showError` property to `*Comparator.ValueDateRange` and `*Comparator.CompareDateRange` components.
- **Added** Render children in `MonthDateRangeComparator.RangeCalendar`.
- **Fixed** `disabled` input was not loosing focused styles when it was disabled.
- **Changed** `disabled` prop was deprecated on `Input.Value` to avoid confusion with `disabled` prop on `Input` component.
- **Fixed** Controlled mode.
- **Fixed** Poppers with `interaction=hover` were not opening on touch devices.
- **Fixed** Page resizing was causing popper to move to the wrong position.
- **Removed** Unnecessary `aria-posinset` attribute on each tab.
- **Removed** Unnecessary `aria-posinset` attribute on each tab.

## [15.80.0] - 2024-04-22

### @semcore/accordion

- **Fixed** Pressing `Space` on focused `Accordion.Item.Toggle` was causing the page to scroll.
- **Fixed** `duration` prop on `Chart` component.
- **Changed** Plot `eventEmitter` prop now is strongly typed.
- **Added** `PlotEventEmitter` class that allows to create typed event emitter for imperative control over chart tooltip.
- **Fixed** stroke color for ReferenceLine from `--intergalactic-chart-grid-x-axis` to `--intergalactic-chart-grid-y-accent-hover-line`.
- **Fixed** Warning in console about invalid value of `tabIndex` attribute.
- **Fixed** Focus ring styles.
- **Fixed** Dropzone was draggable by keyboard.
- **Fixed** Screen readers were announcing wrong items' position.
- **Fixed** There were a visual glitch right after item drop.
- **Changed** Removed additional padding that was added to the draggable element.
- **Changed** Keyboard arrows navigation better works with built-in arrows navigation of base components and better works with items grid placement.
- **Fixed** It was loosing browser focus with DragAndDrop component integration.
- **Changed** `cursorAnchoring` added to the list of props that are passed to the build-in tooltip.
- **Changed** Disabled link now will always have empty href attribute.
- **Changed** Removed `aria-disabled` and `disabled` DOM attributes from Link as it was violating the specs.
- **Added** `cursorAnchoring` prop that allows to make popper appear near the cursor if trigger is bigger than popper.
- **Added** Low level `explicitTriggerSet` API for more granular control over which element will be used as popper trigger.
- **Changed** Slider options text now has secondary color and smaller font size by default.
- **Fixed** `minRows` prop behavior.
- **Changed** Renamed types `HintProps` to `TooltipHintProps` and `HintPopperProps` to `TooltipHintPopperProps`. Old names are preserved and deprecated.
- **Changed** Renamed types `HintProps` to `TypographyHintProps`. Old name is preserved and deprecated.
- **Added** New token for the color of stripes in the diagonal chart grid pattern: `--intergalactic-chart-grid-period-pattern`.
- **Fixed** Typings of event emitter util.
- **Changed** Added role `status`.

## [15.79.0] - 2024-04-16

### @semcore/date-picker

- **Added** Input trigger placeholder now is localized out of the box based on `locale` prop.
- **Fixed** Added missing translations for input trigger error tooltip.
- **Fixed** Input trigger text was little trimmed at the end.
- **Fixed** Component display in dark mode.
- **Fixed** Input trigger referencing `label` tag support.
- **Fixed** Default `aria-label` for the second input of date range trigger.
- **Added** `inputW` prop to override the width of the input field.
- **Added** Beautiful number formatting.
- **Changed** The default trigger `role` is `combobox` if an input is used as the trigger, and button otherwise.
- **Fixed** Date picker related design tokens in dark mode.

## [15.78.0] - 2024-04-15

### @semcore/base-trigger

- **Added** composition API for `FilterTrigger`.
- **Added** `Cigarette` chart.
- **Fixed** Dot's size for line, aria and bar charts.
- **Fixed** background color for Bar chart from `--intergalactic-chart-palette-order-other-data` to `--intergalactic-chart-grid-bar-chart-base-bg`.
- **Changed** Table body focus ring top border got little offset to prevent overlapping with fixed (sticky) header.
- **Changed** Input trigger now resizes to fit the content on mount and on blur.
- **Fixed** On some locale in which formatted dates are longer than the input trigger, date text was overflowing the input container.
- **Fixed** Component was loosing browser focus after reaching the last of first page with keyboard navigation.
- **Fixed** Type of `value` in `Radio` item component.
- **Added** `focusRingTopOffset`, `focusRingRightOffset`, `focusRingBottomOffset` and `focusRingLeftOffset` props.
- **Changed** Allowed to use `SpinContainer.Overlay` without `SpinContainer.Content`.
- **Added** API in internal mechanism for recursive search of child elements.

## [15.77.1] - 2024-04-12

### @semcore/popper

- **Fixed** In some cases popper mouseenter was unexpectedly ignored.

### @semcore/dropdown-menu

- **Fixed** DropdownMenu with input in the trigger was not highting current items when focus comes to input with mouse click.
- **Fixed** Multiselect interactions were not annotated properly by screen readers when select was used with `options` prop.
- **Fixed** Focused tag was rendering focus ring even if it wasn't marked as interactive.

## [15.76.1] - 2024-04-10

### @semcore/date-picker

- **Added** Missing `@semcore/tooltip` dependency in `@semcore/date-picker` package.
- **Fixed** Very longs words were not wrapped in multiline ellipsis.
- **Fixed** Rendering `Ellipsis` with tag `Link` wasn't displayed correctly.
- **Fixed** Attempting to render `Link tag={Ellipsis}` was causing empty node rendered.
- **Fixed** `Select.InputSearch.Value` was undefined.
- **Fixed** Fixed internal mechanism of converting React nodes into text string of it's content.

## [15.76.0] - 2024-04-09

### @semcore/d3-chart

- **Added** API to customize A11Y module values and titles formatting, see <https://developer.semrush.com/intergalactic/data-display/d3-chart/d3-chart-code#a11y-formatting> for details.
- **Changed** Error tooltip appears on user attempt to input disabled date in date input.
- **Added** `disabledErrorText` prop to control error in tooltip.
- **Fixed** Types of `disabled` prop of `DateRangeComparator` and `MonthDateRangeComparator`.
- **Added** `DropdownMenu.Nesting.Item` for more granular control over nested dropdown menus.
- **Fixed** Menu item was displaying highlighted ring when dropdown is opened by mouse interaction.
- **Fixed** Holding mouse over a place where popper appear was preventing popper from disappear back.
- **Fixed** Fast keyboard navigation over multiple closely placed poppers was causing multiple poppers to stay open.
- **Fixed** Select and similar components with disabled portal were not working properly being wrapped into `label` tag.
- **Fixed** Holding mouse over a place where popper appear was preventing popper from disappear back.
- **Fixed** Fast keyboard navigation over multiple closely placed poppers was causing multiple poppers to stay open.
- **Fixed** Select with `disabpledPortal` inside a label was opening second time after selecting the option.
- **Fixed** Copying a textarea node with computed styles for calculating rows.
- **Added** Added option `keyboardFocusEnhance` to control should the enhance make components focusable.

## [15.75.2] - 2024-03-29

### @semcore/data-table

- **Fixed** Displaying elements with `position=relative` in table with fixed columns.
- **Fixed** Made Table.Header unfocusable.

## [15.75.1] - 2024-03-27

### @semcore/tooltip

- **Fixed** Added missing portal component dependency.

### @semcore/utils

- **Fixed** Lot of disallowed attributes were appling to DOM nodes.
- **Fixed** Little (~10%) render performance improvement.

## [15.74.0] - 2024-03-26

### @semcore/date-picker

- **Added** `DateRangeComparator` and `MonthDateRangeComparator` missing translations.
- **Fixed** After second reopen of dropdown menu, the second item was highlighted instead of the first one.
- **Changed** `DeletedPage` illustration was updated according to new style.
- **Changed** `role` was changed from `status` to `region`.
- **Added** Default `aria-label` ("Notification" in English and translated for other locales accordingly).
- **Fixed** Focus lock with `disablePortal` prop.
- **Added** API to get know if the portal is mounted (`onMount` prop).
- **Fixed** Portal hydration errors in nextjs and astro.
- **Fixed** Attribute `inert` was not appling to components.
- **Fixed** Focus order for poppers opened from other poppers.

## [15.73.0] - 2024-03-22

### @semcore/d3-chart

- **Fixed** Errors in children render functions.
- **Changed** `DotCircle` size in Tooltip from 12px to 8px.
- **Added** New `ChartBarStackedColumn` icon.
- **Added** `AccessLogIn` illustration.
- **Fixed** Error about `zIndex` in DOM element.

## [15.72.0] - 2024-03-19

### @semcore/data-table

- **Fixed** `data-table` layout shift on the first render
- **Changed** Keyboard navigation in table with fixed columns.
- **Fixed** `Enter` or `Space` keypress on focusable element inside of DropdownMenu was causing last highlighted item to be clicked.
- **Fixed** It wasn't possible to move focus back from the empty input-tags container with `Shift+Tab`.
- **Fixed** Enforced that close button now uses `button` tag by default.
- **Fixed** Values in Input after keyboard navigation.
- **Changed** Popper focus ring is rounded now.
- **Added** Feature `offset`.
- **Fixed** `Select.Option.Checkbox` visual displaying.
- **Removed** `undefined` role from `Tooltip.Trigger`.
- **Fixed** Removed `aria-live` from trigger and added it to popper.
- **Changed** `List.Item` is `block` element by default.
- **Fixed** Added widget empty image default width and height.
- **Fixed** Widget empty image alt set to empty string to hide it from screen readers.

## [15.71.0] - 2024-03-15

### @semcore/carousel

- **Changed** The whole Carousel is focusable and prev/next buttons not focusable.
- **Changed** Improved `Chart.Bubble` plot scaling to better fit bubbles and reduce plot empty space.
- **Changed** Highlight initially selected item after opening dropdown.
- **Added** New `ShareAlt` icon.
- **Changed** Close button now uses `button` tag (instead of `div` before).
- **Added** Alongside `Tooltip` component, `Hint` and `InformationDropdown` components were added to better handle A11Y specific cases.
- **Fixed** Tooltips `z-index` was lower than `z-index` of all other floating elements..
- **Fixed** `useUID` hook was producing different ids on SSR and client. Now it uses `React.useId` if it's available.

## [15.70.0] - 2024-03-12

### @semcore/d3-chart

- **Added** Feature to render custom components (in foreignObject) as axis tick value.
- **Added** `withScrollBar` prop to enable scrolling in `DataTable.Head`.
- **Added** `renderRows` prop to `DataTable.Body` for low level control over rows rendering. Especially it allows to use custom virtual rendering.

## [15.69.0] - 2024-03-11

### @semcore/base-trigger

- **Added** ButtonTrigger got `chevron` prop that controls display of chevron icon.
- **Changed** Selected date range now is immediately represented in input trigger even before clicking the apply button.
- **Changed** While typings date range in input trigger, the calendar changes displayed period to a typed one.
- **Fixed** In month date range pickers the second calendar was not usable from the keyboard.
- **Fixed** Unexpected scroll in some corner cases.

## [15.68.1] - 2024-03-08

### @semcore/data-table

- **Changed** Don't focus hidden DataTable.Head.
- **Fixed** Unexpected scroll after mouse clicks.

## [15.68.0] - 2024-03-07

### @semcore/base-trigger

- **Fixed** Behavior in forms was broken.
- **Fixed** In controlled mode popper was infinitely returning focus to trigger on close attempt.

### @semcore/animation

- **Fixed** `Collapse` animation was not working with `preserveNode` prop.
- **Added** Logic to define X and Y axis for A11Y summary in Bar charts.
- **Fixed** Rolled back change format of `date` property in children render function of `MonthPicker` and `MonthRangePicker` components.
- **Added** Check that focused element is outside scroll area container before scroll to them.

## [15.67.0] - 2024-03-06

### @semcore/base-trigger

- **Changed** Tag for `ButtonTrigger` is `button` instead of `div`.
- **Fixed** In some rare cases `FilterTrigger` may share it's ref between component instances.
- **Changed** Use `event.key` instead of `event.code`.
- **Fixed** Double reading `aria-label` in checkbox without label.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Fixed** Style for today (current) date border.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Added** Scroll to focused element in scroll area.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Changed** Use `event.key` instead of `event.code`.
- **Fixed** VoiceOver was not reading the tooltip content in Safari.
- **Changed** `aria-live` container that announces the tooltip content was moved from tooltip inner container with `display: contents` to tooltip popper wrapper.
- **Fixed** Errors in console.
- **Changed** Use `event.key` instead of `event.code`.

## [15.66.0] - 2024-03-01

### @semcore/animation

- **Changed** `Collapse` now uses `clip` instead of `hidden` for the overflow property as `overflow: hidden` was breaking position sticky of children elements.
- **Fixed** Old themization with `@semcore/babel-plugin-react-semcore` wasn't working.
- **Changed** `Card.Title` prop `hint` renamed to `hintAfter`.
- **Added** `Card.Title` `innerHint` prop.
- **Fixed** `onIndexChange` to return correct index.
- **Added** `Line.Dots` and `Area.Dots` components `display` prop now accepts function that allows developers to granularly control which dots should be displayed.
- **Fixed** A11Y module "Skip to content after plot" link was not working in some cases.
- **Fixed** view of Line.Area with `null` in data.
- **Added** `disablePortal` prop to `Table.StickyHead`.
- **Changed** Sortable focused headers cell now shows sorting icon.
- **Fixed** Calculation of column widths to properly render Skeleton after the first paint.
- **Fixed** Keyboard navigation was not working in calendars of `DateRangeComparator` and `MonthDateRangeComparator` components.
- **Fixed** Paddings of `DateRangeComparator` and `MonthDateRangeComparator` periods presets (from `0` to `8px`).
- **Fixed** Removed Input trigger invalid `aria` attributes.
- **Changed** Calendars now are focusable by keyboard, focus order of default (unwrapped) popper is changed to put periods presets and apply/clear button first.
- **Changed** Assistive technologies now announce navigated calendar cell and period.
- **Changed** Assistive technologies now announce what date ranges will be selected.
- **Changed** New `Cmd+Enter`/`Ctrl+Enter` keyboard shortcut to apply selected date ranges.
- **Fixed** selection item by keypress `Space` when button trigger is used.
- **Fixed** Allowed to `Tab` navigate from focusables inside of an item if the item was highlighted right before the focusable was focused.
- **Fixed** Disabled `DropdownMenu.Nesting` was opening nested menu by `Tab` key pressing.
- **Added** New `CollapseAlt`, `ExpandAlt` and `CheckDouble` icons.
- **Changed** `Check` icon.
- **Fixed** View of `keyboardFocused` Pill.
- **Added** Focus border for focused Pills without default value.
- **Fixed** Order in layers for `Tag.Close` component for correct handling `onClick` events.
- **Fixed** TimePicker dropdowns had unexpected visual horizontal offset.
- **Fixed** Attribute `attr` was not appling to components.

## [15.65.2] - 2024-02-26

### @semcore/base-trigger

- **Fixed** A11Y in Firefox for clear button in FilterTrigger.
- **Fixed** paddings on X axis in Firefox.
- **Fixed** Pressing tab in pagination input was causing input to clear.

- **Fixed** Returning focus on trigger after clear `FilterTrigger`.
- **Fixed** Virtual scroll in table - setup row size observer in `requestAnimationFrame`.
- **Fixed** Height for `InputTag` with size `l` (from 44px to 40px, like our other `large` components).

## [15.65.0] - 2024-02-22

- **Fixed** Filter trigger options navigations were not announced by assistive technologies.
- **Changed** `DateRangeComparator` and `MonthDateRangeComparator` got new subcomponents `DateRangeComparator.Periods.Divider`, `DateRangeComparator.Periods.Column`, `DateRangeComparator.Periods.Options` and `DateRangeComparator.Periods.Controls` that allows customize comparators sidebars.
- **Changed** `DateRangeComparator` and `MonthDateRangeComparator` apply and clear buttons default placement is changed from footer to sidebar.

## [15.62.1] - 2024-02-21

### @semcore/typography

- **Fixed** Some styles for `List.Item` component.
- **Added** `List.Item.Content` component for customise view of each list item.

### @semcore/d3-chart

- **Changed** Removed wrongly added deprecation messages about `ReferenceLine` `value` props.
- **Changed** Added `valueEnd` prop to `ReferenceLine.Background` component that allows to specify background width by chart value.
- **Fixed** `patterns` prop was missing in multiple chart types.
- **Changed** A11Y module links are clickable by `Space` now (along with `Enter` as before).

### @semcore/dropdown-menu

- **Fixed** Assistive technologies were not announcing the selected item if dropdown contained focusable elements.
- **Changed** When dropdown menu item has focusable elements inside, pressing tab locks focus inside the item. Closing or navigating inside the dropdown menu unlocks the focus.
- **Changed** If dropdown menu poppers placed to the left or right side of trigger, user needs to press `ArrowLeft` or `ArrowRight` to open the popper (`ArrowUp` or `ArrowDown` was opening popper with any placement before the change).
- **Added** `DropdownMenu.Nesting` component to support accessible nested dropdowns.
- **Changed** Used native outline to display links focus ring to fix highlighting of wrapped inline links.
- **Changed** Used native outline to display links focus ring to fix highlighting of wrapped inline links.
- **Changed** Interactive tags keyboard focused ring style adjusted to same focus ring styles of other components.
- **Changed** Interactive tags now get `role=button`.
- **Changed** If tag contains `Tag.Close`, tag will not be focusable. Instead, focus will go to `Tag.Text`.

## [15.60.1] - 2024-02-19

### @semcore/base-trigger

- **Fixed** Pressing enter in forms was triggering `FilterTrigger` to open.
- **Fixed** Focusing trigger right after popper had been closed by mouse leave was not opening popper again.

## [15.60.0] - 2024-02-16

### @semcore/accordion

- **Added** Ability to set 'l' icon size for `Accordion.Item.Chevron`

### @semcore/dropdown

- **Fixed** Removed deprecation messages about `interaction` property (that were added by mistake).
- **Fixed** Removed deprecation messages about `interaction` property (that were added by mistake).

## [15.59.0] - 2024-02-14

### @semcore/carousel

- **Changed** Navigation buttons are clickable by `Space` now (along with `Enter` as before).
- **Changed** Color palette items are clickable by `Space` now (along with `Enter` as before).
- **Changed** Header sorting cells are clickable by `Space` now (along with `Enter` as before).
- **Changed** Icons are clickable by `Space` now (along with `Enter` as before).
- **Changed** `InlineEdit.View` are clickable by `Space` now (along with `Enter` as before).
- **Fixed** Confirm and cancel controls were ignoring `Space` click.
- **Changed** Tags are clickable by `Space` now (along with `Enter` as before).
- **Changed** Pills are clickable by `Space` now (along with `Enter` as before).
- **Changed** Switches are clickable by `Space` now (along with `Enter` as before).
- **Changed** Tabs are clickable by `Space` now (along with `Enter` as before).
- **Changed** Tags are clickable by `Space` now (along with `Enter` as before).
- **Fixed** Some assistive technologies were reading tooltip popper content twice.
- **Added** Tooltip trigger children render function got `popperId` param that allows to apply `aria-describedby` on specific children of tooltip trigger.
- **Changed** Wizard steps are clickable by `Space` now (along with `Enter` as before).

## [15.58.1] - 2024-02-13

### @semcore/d3-chart

- **Fixed** `Dots` component was missing `value` prop in it's props mapping function.

### @semcore/checkbox

- **Fixed** indeterminate mark color were different from checked mark color.
- **Added** `indeterminate` prop for `Select.Option.Checkbox`,

## [15.57.0] - 2024-02-09

### @semcore/icon

- **Added** New `Hashtag` icon.
- **Added** `focusLoop` API that controls how browser focus behaves when goes out of popper.
- **Changed** Invisible focus return and catch elements are removed that were used for keyboard users focus flow control. Instead, trigger may ignore focus event for a short time just after corresponding popper close.
- **Changed** Disabled focus looping when focusable elements exist in tooltip.
- **Fixed** Fixed edge case bug when browser focus should be returned from modal, but a button that triggered modal opening is already unmounted.

## [15.56.0] - 2024-02-07

### @semcore/base-trigger

- **Added** `triggerRef` prop for FilterTrigger component to access inner trigger.
- **Fixed** Prevented changing size of textarea while calculating rows.

## [15.55.0] - 2024-02-06

- **Fixed** Invalid attribute errors in console that appears when component has invalid state.
- **Fixed** `Prev` and `Next` `Buttons` are now Square instead of Rectangle.
- **Fixed** Invalid attribute errors in console that appears when component has invalid state.
- **Fixed** `Checkbox.Text` custom color were not working.
- **Fixed** `validateOnBlur=false` behavior.
- **Added** `InvalidStateBox` component.
- **Fixed** Invalid attribute errors in console that appears when component has invalid state.
- **Fixed** Invalid attribute errors in console that appears when component has invalid state.
- **Fixed** `Modal.Title` custom color were not working.
- **Fixed** Invalid attribute errors in console that appears when component has invalid state.
- **Fixed** `Radio.Text` custom color were not working.
- **Changed** Deprecated all `@semcore/ui/utils/lib/invalid-state-pattern/InvalidStatePattern`.

## [15.54.1] - 2024-02-02

### @semcore/accordion

- **Fixed** Handle keyDown event on `Toggle` only for target element.

## [15.54.0] - 2024-02-01

### @semcore/utils

- **Added** New tokens for branded orange buttons: `--intergalactic-control-primary-brand`, `--intergalactic-control-primary-brand-hover`, `--intergalactic-control-primary-active`.

### @semcore/d3-chart

- **Fixed** view data in BubbleChart.
- **Fixed** prevent animation on every rerender.
- **Changed** version of `postcss`.

## [15.53.0] - 2024-01-31

### @semcore/accordion

- **Changed** Keyboard focus view for `ItemToggle` with inner custom triggers - disable it if `tabIndex=-1`.
- **Added** `patterns` API that enhances charts accessibility.
- **Fixed** View of Apply/Reset buttons in Popper with empty `periods`.
- **Changed** A11Y hint in component - added name for d-n-d groups.
- **Changed** `Tab` click will not move by Pills with `behavior=manual`.
- **Changed** options in `a11yEnhance`. `childSelector` could be a function with props from the calling component.
- **Fixed** `--intergalactic-chart-grid-border` token for dark theme.

## [15.52.2] - 2024-01-25

### @semcore/d3-chart

- **Fixed** array index out-of-bounds crash and animation glitch at 0 duration

## [15.52.0] - 2024-01-23

### @semcore/checkbox

- **Changed** CSS selector specify to prevent rare edge case bug.
- **Changed** interaction with component - it'll open with `Enter`, `Space`, `ArrowDown` or `mouse click`.
- **Changed** CSS selector specify to prevent rare edge case bug.
- **Changed** CSS selector specify to prevent rare edge case bug.
- **Added** MiniChart component.
- **Changed** CSS selector specify to prevent rare edge case bug.
- **Changed** CSS selector specify to prevent rare edge case bug.

## [15.51.0] - 2024-01-19

### @semcore/outside-click

- **Fixed** Clicks were always considered as outside in Shadow DOM.
- **Added** Internal utility to handle DOM events inside of Shadow DOM.

### @semcore/core

- **Added** `wrapIntergalacticComponent` utility for wrapping components.

## [15.49.1] - 2024-01-18

### @semcore/radio

- **Fixed** `disabled` wasn’t working for a standalone `Radio`.

## [15.49.0] - 2024-01-16

### @semcore/d3-chart

- **Fixed** Selection of next focusable element after chart plot.
- **Added** Sort icon animation back.

## [15.48.0] - 2024-01-15

### @semcore/input-tags

- **Fixed** Removed `role="list"` and `role="listitem"` from tags container and tags as it was misleading screen readers and other assistive technologies.
- **Changed** `aria-label` in close notice button.

### @semcore/icon

- **Fixed** Icon typings was containing `{ [key: string]: unknown; }`.

## [15.47.0] - 2024-01-12

### @semcore/dropdown-menu

- **Fixed** Pressing `ArrowUp`/`ArrowDown` on closed `DropdownMenu` trigger was causing error in console.
- **Fixed** After closing popper with interaction `click` focus is returned to the trigger instead of special focus catch element.

## [15.46.1] - 2024-01-11

### @semcore/d3-chart

- **Fixed** Error in ScatterPlot with undefined values.

## [15.46.0] - 2024-01-10

### @semcore/base-trigger

- **Fixed** `BaseTriggerProps` type had `{ [key: string]: unknown; }` that was breaking it's and all inherited types manipulations.
- **Fixed** Grouped controls separator color and shape. Additional separators are now added only between sibling `Button`s, all other components just removes one of sticked border.
- **Fixed** Disabled dates should not be available from the keyboard.
- **Fixed** Months should change when goes outside the current period.
- **Added** Two new tokens for extra-small border-radii: `--intergalactic-rounded-extra-small` and `-intergalactic-chart-rounded`.

## [15.45.0] - 2024-01-04

### @semcore/popper

- **Added** `disabled` prop to types.
- **Fixed** `aria-haspopup` for `disabled` tooltips.
- **Fixed** When focus is lost during the step change, the focus is moved to the wizard first focusable element.

## [15.44.0] - 2023-12-22

### @semcore/d3-chart

- **Fixed** Order of chart lines/bars and tooltip HoverLine.
- **Fixed** Focused Pill with `behavior=tabs` were not visually highlighted.
- **Changed** When keyboard users are focus-triggered closing popper, trigger is highlighted with focus ring while actually focus is placed on the sibling invisible element.
- **Changed** `keyboardFocusEnhance` got context based keyboard focus enforcing.

- **Fixed** Order of chart lines/bars and tooltip HoverLine.
- **Fixed** Focused Pill with `behavior=tabs` were not visually highlighted.

## [15.43.0] - 2023-12-19

### @semcore/core

- **Fixed** Internal types in `Component`.
- **Fixed** Chart dots were not displaying in Firefox.
- **Fixed** Charts appearing animation in Firefox.
- **Added** `preselectedValue` and `onPreselectedValueChange` API to `DatePickerRange` and `MonthRangePicker` components for more control over.
- **Added** `preselectedValue`, `onPreselectedValueChange`, `preselectedCompare`, `onPreselectedCompareChange`, `compareToggle`, `onCompareToggleChange`, `focusedRange` and `onFocusedRangeChange` apis to `DateRangeComparator` and `MonthDateRangeComparator` components for more control over.
- **Added** `preselectedValue` and `onPreselectedValueChange` API to `DatePickerRange` and `MonthRangePicker` components for more control over.
- **Added** `preselectedValue`, `onPreselectedValueChange`, `preselectedCompare`, `onPreselectedCompareChange`, `compareToggle`, `onCompareToggleChange`, `focusedRange` and `onFocusedRangeChange` apis to `DateRangeComparator` and `MonthDateRangeComparator` components for more control over.
- **Added** `preselectedValue` and `onPreselectedValueChange` API to `DatePickerRange` and `MonthRangePicker` components for more control over.
- **Added** `preselectedValue`, `onPreselectedValueChange`, `preselectedCompare`, `onPreselectedCompareChange`, `compareToggle`, `onCompareToggleChange`, `focusedRange` and `onFocusedRangeChange` apis to `DateRangeComparator` and `MonthDateRangeComparator` components for more control over.
- **Added** Set `displayedPeriod` from current `value` for each open of `Calendar`.
- **Fixed** Component was breaking a page when initial value was not allowed by outer pipe.
- **Added** `maskOnlySymbols` prop.
- **Fixed** Text cursor position after pressing `Backspace`.
- **Fixed** `Select.Item's` `Tooltip` with keyboard navigation.
- **Fixed** Types in `splitProps` function.

## [15.42.3] - 2023-12-13

### @semcore/d3-chart

- **Fixed** Squeeze of shapes in `ChartLegendTable`.

## [15.42.2] - 2023-12-12

### @semcore/color-picker

- **Fixed** `d.ts` output.
- **Fixed** `ChartLegendTable` labels trimming with `Ellipsis` component.
- **Fixed** `focusLock` behavior for `hover` interaction.
- **Fixed** Incorrect behavior in Tooltip when it has a focusable elements inside themself and don't close from the first `esc` keypress.

## [15.42.1] - 2023-12-07

### @semcore/checkbox

- **Fixed** How to `indeterminate` will be read by screen readers.
- **Fixed** Removed unnecessary `role` from input element.

## [15.42.0] - 2023-12-06

### @semcore/core

- **Changed** Renamed type `RemoveFields` to `EfficientOmit` and moved it into `InternalTypings`. For INTERNAL usage only. Don't use it.
- **Changed** Deprecated some values of `interaction` property.
- **Changed** Deprecated some values of `interaction` property.
- **Removed** unnecessary style for focused `Popper`.
- **Added** Internal API to enable new focus lock scope.
- **Added** `aria-disable` attribute for disabled `Trigger` and `Option` components.
- **Changed** Deprecated `interaction` property.

## [15.41.0] - 2023-12-05

### @semcore/modal

- **Fixed** Pass `ignorePortalsStacking` prop to the `Portal`.

## [15.39.0] - 2023-12-04

### @semcore/data-table

- **Fixed** Lighthouse accessibility warning about existing scrollbar role element inside of the table.
- **Fixed** Input trigger were not displaying date or date range when it is passed as number or string.
- **Fixed** Fixed vertical gaps between tags for `l` size.
- **Added** New `--intergalactic-border-critical-pattern` token for marking controls invalid state.

## [15.38.0] - 2023-11-30

### @semcore/breakpoints

- **Removed** `defaultIndex` from `MediaList` as unusable.
- **Added** Sort icon is visible when column is focused by keyboard.

## [15.37.0] - 2023-11-28

### @semcore/carousel

- **Added** Reexport for types.
- **Added** Added `DateRangeComparator` and `MonthDateRangeComparator` components.

## [15.36.0] - 2023-11-21

### @semcore/breadcrumbs

- **Fixed** `aria-current` value.
- **Fixed** Matcher function in `MediaList` to use `defaultIndex`.
- **Changed** Some styles in controls were changed.
- **Changed** Types for `abstract class RootComponent`.
- **Fixed** Correct types for `Tooltip`s children render function.
- **Added** Support for both non-focusable and focusable items in DropdownMenu.
- **Added** Reexport utils and types.
- **Added** `Ghost` view for modals.
- **Added** New behavior `auto` instead of `radio` and `manual` instead of `tags`.
- **Fixed** Selection of disabled `Pills.Item`.
- **Added** Behavior `auto` and `manual`.
- **Added** Behavior `auto` and `manual`.
- **Added** Behavior as `Button` when working from the keyboard.
- **Fixed** `aria-describedby` instead of `aria-labelledby`.
- **Fixed** Working that `aria` property in uncontrolled mode.
- **Added** Types for enhances.
- **Added** Pass `props` from component into `onNeighborChange` in `a11yEnhance` as a second args.
- **Added** New `findAllComponents` (for passed `Children`) util method.
- **Changed** Values for `--facebook`, `--twitter` and `--linkedIn` variables to new ones.

## [15.35.2] - 2023-11-20

### @semcore/data-table

- **Changed** Removed animation from sort icon.

## [15.35.1] - 2023-11-14

### @semcore/button

- **Fixed** Width of `Button` by fit-content in flex containers.

## [15.35.0] - 2023-11-13

### @semcore/d3-chart

- **Fixed** Import path in `LegendItem`.
- **Added** New `Unsplash` icon.

## [15.34.1] - 2023-11-10

### @semcore/popper

- **Fixed** Fixed popper wasn't opening in date-picker.

### @semcore/base-trigger

- **Fixed** Blue border for `Trigger` when it `active` and in `normal` state.
- **Added** New icons for marking AI features: `AskAI`, `ChatAI`, `StoriesAI`, `SummaryAI`.
- **Fixed** Sometimes scroll area focus ring was overlapped by sibling elements.

## [15.33.3] - 2023-11-09

### @semcore/d3-chart

- **Fixed** Charts exporting to image.
- **Fixed** Fixed old palette colors resolving that was broken in `@semcore/utils@4.9.0`.

## [15.33.1] - 2023-11-07

### @semcore/date-picker

- **Fixed** "Today" button wasn't disabling with DatePicker `disabled` prop.
- **Changed** Deprecated `notInteractive` prop.

## [15.33.0] - 2023-11-06

### @semcore/core

- **Fixed** Fixed components CSS output of complex selectors.
- **Added** New `AttacheCase` icon.
- **Added** Added passing `ignorePortalsStacking` prop to `Portal`.
- **Changed** Updated colors of hover/active states a little to sync it across components.
- **Changed** Tag component design tokens are transformed from rgba colors with opacity to hex colors without opacity.
- **Changed** Don't animate the width/height of a node if they are specified as a percentage.
- **Changed** Values for tag and icon tokens that are built with CSS filters.

## [15.32.0] - 2023-10-31

### @semcore/select

- **Changed** Disabled switch between `Select.Option.Checkbox` by press `Tab` instead of Arrows.

### @semcore/d3-chart

- **Added** `ChartLegend` component.
- **Fixed** Animation wasn't working.

## [15.30.0] - 2023-10-27

### @semcore/badge

- **Added** Design tokens resolving for prop `color`.
- **Changed** Default text color is based on inversed and processed background color.
- **Added** Design tokens resolving for prop `color`.
- **Added** Design tokens resolving for prop `theme`.
- **Added** Design tokens resolving for prop `theme`.
- **Changed** Default text color is based on inversed and processed background color.
- **Added** Design tokens resolving for `color` props.
- **Changed** Default color of grouped charts (e.g for pie chart) are different by default.
- **Changed** Default text color is based on inversed and processed background color.
- **Added** Design tokens resolving for `color` prop.
- **Added** Design tokens resolving for `color` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for prop `color`.
- **Changed** Default text color is based on inversed and processed background color.
- **Added** Design tokens resolving for `theme` prop.
- **Added** Design tokens resolving for `color` prop of `<Text />`.
- **Added** Internal API for design tokens resolving.

## [15.29.0] - 2023-10-26

### @semcore/icon

- **Changed** Made `Twitter` and `TwitterCarousel` icons bolder.

## [15.28.2] - 2023-10-24

### @semcore/popper

- **Fixed** Undelivered ResizeObserver's loop in popper after it is closed.
- **Fixed** View of `Switch` with long text in addons.
- **Fixed** Focus lock merging was causing invalid hooks order error.

## [15.28.1] - 2023-10-16

### @semcore/button

- **Fixed** Improved `focus` for `Buttons` in `disabled` states.
- **Fixed** Added additional checks to prevent focus catching after popper close in some cases when focus is moved to another component and focus catch is not necessary.
- **Changed** Fixed name for `--intergalactic-text-secondary-invert` (from `--intergalactic-text-secondary-Invert`) and changed it's value, from `0.75` to `0.8`.

## [15.28.0] - 2023-10-13

- **Fixed** Removed `box-shadow` for focused `Buttons` in `loading` or `disabled` states.
- **Added** `maxBarSize` prop for `Bars` (Bar, GroupBar, StackBar and horizontals).
- **Added** `Line.Area` component.

## [15.27.0] - 2023-10-10

### @semcore/flex-box

- **Added** `display` CSS property as prop to `Box` component.
- **Changed** For `NoticeBubbleContainer` with `disabledPortal` added new styles for `position sticky` behavior.
- **Fixed** Prevent to scroll to `Trigger` item after `Popper` is closed.

## [15.26.0] - 2023-10-09

### @semcore/base-trigger

- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.
- **Added** `nl` locale support.

## [15.25.2] - 2023-10-06

- **Fixed** Invalid attribute React warnings.
- **Fixed** added `aria-busy='true'` for loading state and `aria-disable` for disabled state.
- **Fixed** Table with columns with fixed position was not displayed correctly.
- **Fixed** Pills with `behavior="tabs"` had focus ring both on container and on pills. Now focus ring is only on pills.
- **Fixed** Focus ring of every pill was overlaped by the next sibling pill.
- **Fixed** In some rare cases due to wrong rounding scroll shadow was displayed even if content was scrolled to the edge.
- **Fixed** Duplicated ref function callback.

## [15.25.1] - 2023-10-03

### @semcore/radio

- **Fixed** Radio in invalid state was missing red outline.
- **Fixed** Incorrect animation on mouse right button click.
- **Fixed** After getting disabled components were not loosing focus visual state.

## [15.25.0] - 2023-10-02

### @semcore/base-trigger

- **Fixed** Empty FilterTrigger now gets role `button` during empty state instead of `group`.
- **Added** simplified use: `<Checkbox />`.
- **Added** advanced use with new sub-components `<Checkbox.Value.Control />` and `<Checkbox.Value.CheckMark />`
- **Added** added warning about using `disabled` prop on `Checkbox.Value` with recommendation to use `disabled` prop on root `Checkbox` because it may cause SSR related issues.
- **Added** input tag now gets `aria-invalid` if `state` prop is `invalid`.
- **Changed** Improved core component typings flexibility
- **Changed** `Redo` and `Undo` icons according to their actual design.
- **Fixed** Fixed bug with strange crop in icons if there are a lot of them on a page
- **Added** simplified use: `<Radio />`.
- **Added** advanced use with new sub-components `<Radio.Value.Control />` and `<Radio.Value.RadioMark />`
- **Added** added warning about using `disabled` prop on `Radio.Value` with recommendation to use `disabled` prop on root `Radio` because it may cause SSR related issues.
- **Added** input tag now gets `aria-invalid` if `state` prop is `invalid`.
- **Fixed** Extended internal mechanism of component wrapper props modifying.
- **Fixed** React invalid Hooks call caused by `useFocusLock` in some rare cases from it's nested hooks.

## [15.24.0] - 2023-09-21

### @semcore/data-table

- **Added** `font-variant-numeric` for table cells

## [15.23.1] - 2023-09-20

### @semcore/core

- **Fixed** Release doesn't contain any meaningful changes but contains inner dependencies fixes required by the previous release.

### @semcore/d3-chart

- **Added** `index` to render function context type of `HoverLine` and `HoverRect`.
- **Added** `size`, `x` and `y` to render function context type of `XAxis.Ticks` and `YAxis.Ticks`.
- **Fixed** Fixed types for `value` and `onChange` in DateRangePicker. Trigger.
- **Changed** Enforced `0` margins of `ProductHeader.Title`.
- **Added** Added size in playground for SpinContainer
- **Fixed** Reverse focus in modals (Fixed `useFocuseLock`. Call `safeMoveFocusInside` in `handleFocusIn` with correct second parameter (focusCameFrom instead of event.target))

## [15.22.0] - 2023-09-19

### @semcore/icon

- **Added** Added new `Plug` icon.

## [15.21.0] - 2023-09-15

### @semcore/typography

- **Added** `use` and `disabled` props to `Text` component.

## [15.20.1] - 2023-09-14

### @semcore/feature-popover

- **Fixed** Added missing `aria-live='polite'` attribute.

## [15.20.0] - 2023-09-13

### @semcore/format-text

- **Changed** Specified font for `code` and `pre` tags inside of `FormatText` component.
- **Fixed** Fixed strange svg issue that was cutting the edge of the `Favorite` and `FavoriteFilled` icons.
- **Added** `monospace` prop to `Text` component.
- **Added** Added new design tokens for period comparison in DatePicker: `date-picker-cell-comparison-active`, `date-picker-cell-comparison-active-hover`, `border-date-picker-range-comparison`.
- **Changed** Changed colors of `--intergalactic-date-picker-cell-current` and `--intergalactic-date-picker-cell-current-invert` design tokens to make them more contrast against background.
- **Changed** Removed design tokens `--intergalactic-bg-tertiary-neutral` and `--intergalactic-brand-tertiary` that was added by mistake.

### @semcore/date-picker

- **Fixed** Enforced input trigger line height to prevent visual break due to non `normal` line height on page.
- **Changed** Added error throwing if bundled locales are excluded or not included.

## [15.18.0] - 2023-09-12

### @semcore/core

- **Fixed** Fixed `locale` propagation in complex components.
- **Added** `titleTag` prop for specifying error widget tag (`h2` by default).

## [15.16.3] - 2023-09-08

### @semcore/utils

- **Fixed** Focus lock version merger was not respecting React version and was causing React#321 error.

### @semcore/data-table

- **Fixed** Fixed initial columns rendering width when `wMax` or `wMin` props provided.

### @semcore/date-picker

- **Fixed** Navigation arrow in calendar that were navigating to the next month/year was visually displayed as a navigation arrow to the previous month/year.

## [15.16.0] - 2023-09-05

### @semcore/icon

- **Added** Added new `Phone` icon.
- **Added** `InputSearch` advanced usage with `InputSearch.SearchIcon`, `InputSearch.Value` and `InputSearch.Clear` components.
- **Added** `semibold` prop to `Text` component.

### @semcore/core

- **Fixed** Functional component default props warnings from the nextjs.
- **Fixed** Fixed rendering zero segments pies in React<17.
- **Added** Added `customFocus` prop that allows keyboard users to use drag and drops without moving actual browser focus. Especially useful for comboboxes and selects that allows to reorder items.
- **Fixed** Both highlighted and selected menu items were not visually distinguishable from selected items.
- **Fixed** `highlightedIndex` prop was added to `DropdownMenu.Menu` context type.

## [15.14.0] - 2023-09-04

- **Changed** Core types compilation speed up.

## [15.13.0] - 2023-08-31

### @semcore/d3-chart

- **Fixed** Added `exports.types` field to fix types resolving.
- **Fixed** Removed deprecation notes from `ticks` props (it was added by mistake).
- **Added** Added `radius` prop on `Line.Dot` component.

## [15.12.0] - 2023-08-28

### @semcore/utils

- **Changed** Focus lock got focus war surrender mechanism to prevent page freeze if page contains older focus lock. In such case the error is logged into console.
- **Changed** Focus lock got improved focus control in multiple nested modals (or side-panels) when modals count is bigger then 2.
- **Changed** Focus lock uses only one version of it if multiple focus lock versions are present on same page.

## [15.11.1] - 2023-08-24

### @semcore/d3-chart

- **Fixed** Passing `x` and `y` props to `Donut.Label` component.

### @semcore/ellipsis

- **Added** Ellipsis advanced usage with `Ellipsis.Content` and `Ellipsis.Popper` components.
- **Added** Internal API for enforcing component advanced mode.

### @semcore/input-mask

- **Fixed** Removed `pattern` prop that were not providing any helpful user experience enhancements but was causing unexpected HTML form validation errors.
- **Changed** Enabled "single focus owner mode" to better handle nested modals focus lock.
- **Fixed** Progress bar animation wasn't working.
- **Changed** Enabled "single focus owner mode" to better handle nested side panels focus lock.
- **Fixed** Keyboard triggered focus was not properly detected for recently mounted components.
- **Added** Improved modals and side panels focus lock behavior by adding "single focus owner mode" to focus lock handler.

## [15.9.0] - 2023-08-23

### @semcore/scroll-area

- **Fixed** SSR rendering.

### @semcore/button

- **Fixed** Fixed paddings for Button's text and addons.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Fixed** Fixed token for hover state of the range cell ( `SCalendarUnit[selected]` ).
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Disable forced lists counter reset if `start`, `reversed` or `type` attributes are set on corresponding `ol` or `ul` tags.
- **Changed** Updated `Twitter` and `TwitterCarousel` icons, bye-bye birdie 😢
- **Fixed** Fixed padding for addons.
- **Changed** Enforced input wrapper to be non-focusable (primary for other components that use input wrapper).
- **Changed** Improved visual state of focused tags container.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.
- **Changed** Improved visual state of focusable tags.
- **Changed** Moved default props value from deprecated `FCComponent.defaultProps` to function default arguments.

### @semcore/date-picker

- **Fixed** MonthPicker default locale wasn't `en` and was based on the system locale.
- **Fixed** Base DOM element of `Pagination.TotalPages` component typings.

## [15.6.6] - 2023-08-21

### @semcore/core

- **Fixed** Component types edge case when two nested prop with same name from different components create conjunction instead of disjunction.
- **Changed** Donut chart now doesn't render `Donut.Pie` that represent 0 part of circle.
- **Fixed** Broken keyboard drag-and-drop handling.

## [15.6.5] - 2023-08-18

- **Added** Exported type `Intergalactic.DomProps` that may be helpful for typing component wrappers.
- **Added** `paddingAngle` prop for Donut chart.
- **Added** `data` prop for `DataTable.Cell` and `DataTable.Row` that allows more convenient typings than `DataTable.Cell<typeof data>`.
- **Fixed** Collapsing of table included in row of other table.
- **Changed** Made `resolveColor` types generic.

### @semcore/carousel

- **Changed** Removed `aria-hidden` from navigation buttons.
- **Changed** Added `aria-current` on the current slide.
- **Changed** Added i18n locales for `aria-label` of Next and Previous buttons.

### @semcore/d3-chart

- **Added** Added special `interpolateValue` symbol that allows to interpolate points on line and area charts.
- **Fixed** `zIndex` passing.
- **Fixed** Removed wrong `tag` component declaration in `NeighborLocationProps` type.
- **Fixed** Removed wrong `tag` component declaration in `RadioGroupProps` type.
- **Fixed** Fixed vertical direction of radio group (due to `typo` it was horizontal by default).

## [15.6.2] - 2023-08-17

### @semcore/input-tags

- **Fixed** Fixed aria roles issues.
- **Changed** Focus ring is now provided by overflowing pseudo element.
- **Changed** Remove tag button aria-label now refers both to the tag and remove button itself.

## [15.6.1] - 2023-08-16

### @semcore/core

- **Changed** Internal typings update that fixes edge cases of props nesting.
- **Changed** Deprecated `IFlexProps`.
- **Fixed** Fixed colors of `--intergalactic-table-td-cell-hover` and `--intergalactic-table-td-cell-active` design tokens to a lighter ones.

## [15.6.0] - 2023-08-11

### @semcore/textarea

- **Fixed** Line height of textarea of `l` size changed from `lh-400` to `lh-300`.

## [15.4.7] - 2023-08-10

### @semcore/select

- **Fixed** Default options DOM ids where not synced with aria-activedescendant value.

## [15.4.0] - 2023-08-09

### @semcore/d3-chart

- **Changed** Updated d3 dependencies to resolve peerDependencies mismatch.

## [15.3.3] - 2023-08-08

### @semcore/i18n-unplugin

- **Changed** Updated `@semcore/core` peer dependency from major 1 to major 2.

### @semcore/d3-chart

- **Changed** Added `exports` fields for better nextjs support.

## [15.3.0] - 2023-08-07

### @semcore/utils

- **Fixed** Fixed core invalid peer dependencies warning.

## [15.2.4] - 2023-08-04

### @semcore/ellipsis

- **Fixed** Component build output was corrupted after the previous change.

## [15.2.3] - 2023-08-02

- **Fixed** Passing jsx element to tooltip inherited `title` prop was causing setting DOM attribute `title` to `[object Object]`.

- **Fixed** Added missing `EllipsisProps` export.

## [15.2.1] - 2023-08-01

### @semcore/data-table

- **Fixed** Using special characters and spaces in the data keys were braking columns width.

### @semcore/core

- **Change** Supported `tag={React.Fragment}` for all root components.
- **Fixed** Different calendar cells color for selected and highlighted states.
- **Change** Supported `tag={React.Fragment}` for all components based on `Flex` or `Box`.
- **Added** Added new `GoogleGenerativeAI` icon.

## [15.1.1] - 2023-07-31

### @semcore/d3-chart

- **Fixed** Donut chart hover animation after chart resizing.

## [15.1.0] - 2023-07-27

### Global

- **Changed** Use `event.key` instead of `event.code` for better support of non QWERTY keyboard layouts.

## [15.0.3] - 2023-07-24

### @semcore/base-trigger

- **Fixed** `BaseTrigger` props strictness.
- **Fixed** `Button` props strictness.
- **Fixed** Broken tooltip styles.
- **Fixed** `SingleDateInput` props strictness.
- **Fixed** `Input` and `Input.Value` props strictness.
- **Fixed** `InputMask` props strictness.
- **Fixed** `InputNumber` props strictness.
- **Fixed** `NeighborLocation` props strictness.
- **Fixed** Notice bubble manager methods strictness.
- **Fixed** `Pills` props strictness.
- **Fixed** `Switch` props strictness.
- **Fixed** `TabLine` props strictness.

## [15.0.2] - 2023-07-18

### @semcore/data-table

- **Fixed** Fixed `disabledScroll` visual behavior.

### @semcore/d3-chart

- **Fix** Removed ResizeObserver initiating during SSR.
- **Fix** Removed ResizeObserver initiating during SSR.
- **Fix** Removed ResizeObserver initiating during SSR.
- **Fix** `PillsProps` wasn't including `BoxProps`.
- **Fix** Removed ResizeObserver initiating during SSR.
- **Changed** Enabled textarea resize observing even if no `maxRows` prop provided.
- **Change** Removed ScreenReaderOnly block for tooltips with `interaction=hover`.

## [15.0.0] - 2023-07-17

### Global

- **Break** Strict, backward incompatible typings.
- **Break** Strict typings.
- **Changed** Internal API for exposing component destructuring children.
- **Break** Strict, backward incompatible typings.
- **Changed** Deprecated `import { Tooltip } from '@semcore/ui/d3-chart` in favor of better typed Tooltips.
- **Changed** On type level made `name` property of `Donut.Pie` obligatory.
- **Changed** On type level made `name` property of `Venn.Circle` obligatory.
- **Added** Typed `HoverLine.Tooltip` , `HoverRect.Tooltip` , `Radar.Tooltip` , `Bubble.Tooltip` , `Donut.Tooltip` , `ScatterPlot.Tooltip` and `Venn.Tooltip` .
- **BREAK** `DatePicker.Trigger` now represents input trigger (previously available as `DatePicker.InputTrigger`). Old and deprecated trigger still available as `.ButtonTrigger`.
- **Break** Removed unused flags without ISO code.
- **BREAK** Removed all icons from `@semcore/icon/lib/*` path.
- **BREAK** Removed `Stoller` icon.
- **BREAK** Removed `YoutubeAlt` icon.
- **BREAK** Removed `YoutubeRed` icon.
- **BREAK** Removed `FeauturedImage` icon.
- **BREAK** Removed `FeauturedVideo` icon.
- **Added** Added `Diners` pay icon.
- **Break** Removed previously deprecated props `positionFixed`, `eventsDisabled`, `boundary`, `displayEvents`, `displayTimeout`, `popperZIndex`.
- **BREAK** `RadioGroup` now wraps it's content into `Flex` container (previously it was wrapping content into `React.Fragment` by default).
- **BREAK** Changed all skeleton for chart from svg to HTMLDivElement with styled background.
- **BREAK** Renamed `PieChartSkeleton` to `DonutChartSkeleton`.

## [14.11.0] - 2023-07-14

### @semcore/select

- **Fixed** `InputSearch` clear button keyboard support.

## [14.10.0] - 2023-07-04

### @semcore/textarea

- **Changed** Textarea `minRows` now works without `maxRows`.

## [14.9.0] - 2023-06-29

### @semcore/data-table

- **Added** Added background for active state for `Row`.
- **Fixed** `usePreventScroll` was causing 150px right padding.

### @semcore/d3-chart

- **Fixed** Fixed animation on hover when moving mouse quickly on border of `Donut` chart.
- **Fixed** Fixed SSR, `window` access changed to `globalThis`.
- **Added** Added new `GoogleSheets` and `GoogleSlides` icons.
- **Fixed** Removed duplication custom CSS class.

## [14.7.0] - 2023-06-23

### @semcore/base-trigger

- **Added** `FilterTrigger` focus returning after the clear effect.
- **Fixed** React warning about passing `null` to the input element.
- **Fixed** Providing explicit `size={undefined}` to `Select` with `InputSearch` was causing breaking of page rendering.
- **Changed** Improved focus handling with `FilterTrigger`.
- **Added** Exposed internal util for setting focus on top focusable child.

## [14.6.0] - 2023-06-22

### @semcore/input

- **Changed** Input now catches focus after keyboard events happened inside of the input container if no other element on page has focus.
- **Fixed** Keyboard focused poppers were not intractable with mouse.
- **Added** Swedish (`sv`) locale support.

## [14.5.0] - 2023-06-19

### @semcore/inline-input

- **Fixed** `onBlurBehavior` specified callback was unexpectedly being called when page had non-zero scroll.
- **Changed** Added `tabIndex` by default even if ScrollArea is used without explicit `ScrollArea.Container`.

## [14.4.0] - 2023-06-15

### @semcore/data-table

- **Changed** Moved `role="rowgroup"` on focusable scroll areas to match automatic A11Y checks.
- **Fixed** In some cases ScrollAria might break the page rendering.

## [14.3.0] - 2023-06-14

### @semcore/base-trigger

- **Fixed** Transferring style for trigger active state from FilterTrigger/LinkTrigger to BaseTrigger.
- **Changed** Removed unused style in FilterTrigger.
- **Fixed** Grouped rows aria roles.
- **Fixed** Fixed setting aria attribute on initial render.
- **Fixed** Transferring style for trigger active state to `@semcore/base-trigger`.
- **Fixed** AutoFocus in the animated popovers might be causing instant scroll to the page top.

## [14.2.0] - 2023-06-12

### Global

- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.
- **Added** Swedish (`sv`) locale support.

### @semcore/base-trigger

- **Fixed** Disabled FilterTrigger inner parts animations for proper container animation.
- **Added** FilterTrigger `aria-labelledby` reference from the "Clear" button to make screen reader users easier understand what the button is related to.
- **Fixed** Animations in complex components (for example `FilterTrigger`) might not be finished.

## [14.1.0] - 2023-06-09

- **Fixed** Passing props to FilterTrigger inner select.
- **Added** Added new `SecurityNo` icon.
- **Fixed** Fixed defaults event handlers calling when same, non-function handler provided.

### Global

- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Fixed** Excluded unwanted development dependencies from package dependencies.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.
- **Added** Polish (`pl`) locale support.

## [13.33.0] - 2023-06-07

### @semcore/animation

- **Fixed** Fixed unmount error of `<Scale />` and `<Popper />` integration.
- **Changed** FilterTrigger background changed from gray to white.
- **Fixed** Fixed browser focus cursor position after picking date with mouse.
- **Fixed** Improved `<Popper />` integration.
- **Fixed** Fixed `aria-activedescendant` value.
- **Fixed** Fixed double focus inside of popper.
- **Changed** Descend combobox related aria attributes from input wrapper to the input itself.
- **Fixed** Fixed corner case of focus return with `interaction=focus`.
- **Fixed** Added `disableEnforceFocus` API prop.
- **Changed** Updating `strategy`, `placement`, `offset`, `preventOverflow`, `arrow`, `flip`, `computeStyles`, `eventListeners` or `onFirstUpdate` props now triggers popper positioning update.
- **Added** Allowed to set scroll container tab index by setting it on scroll area root element.
- **Fixed** Fixed browser focus cursor position after selecting value in non multiple choice `<Select />`.
- **Added** Added `aria-owns` attribute for trigger that refers to the corresponding popper.
- **Fixed** Fixed color SSR hydration.

## [13.32.0] - 2023-06-06

### @semcore/base-trigger

- **Changed** Blue border of trigger in the active state.
- **Fixed** Setting `tag` prop on `RadioGroup` was breaking component `onChange` handling.
- **Fixed** Fixed `SidePanel` default text color.
- **Changed** Removed white bottom border under selected tab panels.
- **Added** Focused text part highlight.

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
- **Added** All focusable components get `autoFocus` prop via `keyboardFocusEnhance`.
- **Added** Added new `--keyboard-focus-invert` token for using with dark background.
- **Changed** Add lighten modifier to table cell tokens, to remove the opacity.

## [13.30.0] - 2023-05-25

### @semcore/core

- **Changed** Prop `locale` default value is provided for all Intergalactic components under this `I18nProvider`.
- **Changed** Improved support of `zh` and `ja` locales in vertical titles.
- **Changed** Improved `DataTable` typings, now props `sort`, `onSortChange`, `uniqueKey` types are automatically infered from `data` prop and children rendering row data might be better typed like `<DataTable.Cell<{}, typeof data> name="keyword">`.
- **Fixed** Use en-dash symbol as range separator.
- **Fixed** Fixed error tooltip sizing.
- **Changed** Updated cat in `PageError` illustration.
- **Fixed** Part of illustrations were incorrectly displayed in Firefox.
- **Fixed** In some rare `onConfirm` and `onCancel` race condition were occurring.
- **Added** Added `behavior` prop for better accessibility in forms. Props takes value `tabs` and `radio`, `tabs` is a default value and correspond to the old component behavior.
- **Fixed** Fixed error if token for localization is not defined.

## [13.29.0] - 2023-05-22

### @semcore/base-trigger

- **Changed** Updated border-color for invalid and valid states. Made them more contrast according to accessibility recommendations.
- **Changed** Updated styles for FilterTrigger, added styles for `hover` distinguished from `active` state.
- **Changed** Fixed token for text in button with `use="secondary"` and `theme="info"`.
- **Changed** Updated border-color for invalid state. Made it more contrast according to accessibility recommendations. HEAD
- **Changed** Added visual cue to the `selected` DropdownMenu. Item.
- **Changed** Updated border-color for invalid and valid states. Made them more contrast according to accessibility recommendations.
- **Changed** Updated token for `selected` Pill.
- **Changed** Fixed token for background-color of the checked Checkbox.
- **Changed** Updated reference for `--text-placeholder` token from `--gray-300` to `--gray-400`, to add more contrast to all placeholder texts in all components.

### @semcore/input-number

- **Changed** Prevent page scrolling while incrementing or decrementing input value with mouse wheel.
- **Added** Set default color of modals for better support of dark themes.
- **Added** Set default color of popper for better support of dark themes.

## [13.27.4] - 2023-05-15

### @semcore/d3-chart

- **Fixed** Fixed radial tree icons displaying.
- **Fixed** Pressing `Escape` or `Enter` might trigger both `onConfirm` and `onCancel`.

## [13.27.3] - 2023-05-12

### @semcore/feedback-form

- **Fixed** Fixed empty tooltip content while fading out.
- **Changed** Improved next and prev buttons aria labels.
- **Fixed** Fixed `i18n` interpolation of falsable values.

## [13.27.2] - 2023-05-10

### @semcore/divider

- **Changed** Role `separator` and `aria-orientation` were added for better accessibility.
- **Fixed** Fixed SSR when `ignorePortalsStacking` is turned on.
- **Fixed** Screen reader tooltip content updates correctly on change
- **Changed** Changed content layout for screen reader. Now it's in `Tooltip.Popper`
- **Fixed** Made automatic focus return more friendly for modals and side panels.

## [13.27.1] - 2023-05-04

### @semcore/badge

- **Changed** Made default `<Badge />` background more contrast.
- **Changed** Made `<Carousel />` arrows color more contrast.
- **Changed** Made draggable elements dragging pattern more contrast.
- **Added** Allowed pills focus navigation with left and right keyboard arrows.
- **Changed** Hid skeleton for screen readers.
- **Fixed** Fixed uncontrolled `<TabLine />` animation.

### @semcore/popper

- **Fixed** Using `ignorePortalsStacking` on top-level poppers was causing application crash.
- **Added** Added the ability to set tag for `RadioGroup`.
- **Fixed** `<ScrollArea.Bar />` component might break app in some rare use cases.

## [13.26.0] - 2023-05-03

### @semcore/animation

- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.
- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.
- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.
- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.
- **Changed** Added required `role` and `aria` attributes for better screen readers support.
- **Changed** Scroll area container are now focusable by keyboard.
- **Changed** During SSR all `useLayoutEffect` are called as `useEffect` to resolve React SSR warnings.

## [13.25.2] - 2023-05-02

- **Fixed** Fixed collapse animations blinking.
- **Fixed** Fixed image display when specifying an index other than 0.

## [13.25.1] - 2023-04-28

### @semcore/carousel

- **Fixed** Fixed warnings in development mode.
- **Fixed** Added `aria-label` for the close icon.
- **Fixed** Fixed warnings in development mode.
- **Fixed** Moved paddings from container to `<Input.Value />` and `<Input.Addon />` to fix addons in inputs of large size.
- **Fixed** `<Input.Addon />` now automatically takes size of `<Input />`.
- **Fixed** Fixed right border duplication when last addon is build on top of `<Button />`.

## [13.25.0] - 2023-04-26

### @semcore/animation

- **Fixed** Fixed collapse animations (for example used in `<Accordion />`) in Safari.
- **Fixed** Fixed missing `key` warning.
- **Changed** Improved date picker rendering performance.
- **Added** Added `uppercase`, `lowercase`, `capitalize` text transformation props.

## [13.24.0] - 2023-04-24

### @semcore/date-picker

- **Fixed** Fixed issue with custom styles when using `shadow-loader` plugin.
- **Added** Added `disablePreventScroll` prop.
- **Added** Added `disablePreventScroll` prop.
- **Fixed** Fixed `usePreventScroll` (used in `<Modal />` and `<ScrollBar />`) might totally block document body scroll with async components appearing and fading.

## [13.23.0] - 2023-04-19

### @semcore/color-picker

- **Fixed** Added `aria-hidden="true"` for input control because they are auxiliary.
- **Fixed** Fixed calculating height of `StackBar` and `HorizontalBar` components.
- **Changed** Default title tag switched from `h4` to `h2` without changing visual representation.
- **Fixed** Fixed ability to control from keyboard for `Close` and `Back`.
- **Fixed** Improvements for A11Y. Added more correct label. Added role attribute. Return focus on cancel or confirm.
- **Fixed** Improvements for A11Y. Hidden controls because they are accessible via the keyboard.
- **Changed** Fixed outline styles so that they work even if the `Value` is wrapped in other elements.
- **Changed** Remove `aria-invalid` because you can't enter the wrong value.
- **Changed** Added hint for screen reader.
- **Changed** Controls are now `display:none` rather than `visibility:hidden`, this gives more space for placeholder.
- **Fixed** Fixed visual keyboard focus highlight of inline links.
- **Fixed** `interaction=hover` poppers now might be triggered by keyboard focus (but not mouse focus).
- **Changed** Changed `tag` of `Title` from `div` to `h1` for better accessibility.
- **Added** Added `aria-multiselectable` attribute to `Menu` component for better accessibility.
- **Added** Return focus to trigger when option is selected.
- **Added** Added `aria-hidden` attribute for better accessibility.
- **Added** Added ARIA attributes for better accessibility.
- **Fixed** Fixed behavior when returning focus. Now focus return does not work if user used the mouse.
- **Change** Added `id` propertie for `ScreenReaderOnly` component.
- **Fixed** Keyboard focus highlight wasn't working until keyboard focuses any focusable element second time.
- **Fixed** Delayed focus return in the macrotask to prevent focus return trigger event passing to to the return focus target.
- **Changed** Title got semantic `h2` tag.
- **Fixed** Added screen reader only hint about completed steps.

## [13.22.2] - 2023-04-11

### @semcore/button

- **Fixed** Removed `role=button` from native button.
- **Fixed** Non-interactive container are not focusable by keyboard now.
- **Fixed** Fixed "confirm" icon keyboard navigation.
- **Fixed** Fixed `aria-posinset` attribute value generation.
- **Fixed** Fixed `aria-posinset` attribute value generation.
- **Fixed** Non-interactive tags are not focusable by keyboard now.
- **Fixed** Turn `aria-haspopup` to `false` for Tooltip with `hover=interaction`.

### @semcore/feedback-form

- **Changed** Patched `final-form` to meet `react-final-form` peer dependency.

### @semcore/data-table

- **Changed** Changed the presentation of the sort icon. Now it always runs into the text.
- **Changed** Added React 18 to the peer dependencies.
- **Changed** Patched `react-final-form` to the latest version.
- **Added** Return focus to trigger when option is selected.

## [13.21.0] - 2023-04-03

### @semcore/animation

- **Fixed** Nested animation might take initial keyframe from animated parent component in some cases.
- **Fixed** Fixed carousel HTML roles.
- **Fixed** Fixed `aria-checked` attribute values.
- **Fixed** Fixed screen reader annotation of visually untitled items.
- **Changed** Moved screen reader hint from `aria-label` attribute to `aria-live="polite"` alert block.
- **Changed** Improved keyboard navigation on exit from focus-triggered popovers.
- **Changed** Tooltip with `hover` `interaction` content is duplicated into screen-reader-only block.

## [13.20.5] - 2023-03-31

### @semcore/d3-chart

- **Fixed** Fixed calculating width of `HorizontalBar` component.
- **Fixed** Fixed display `Line.Null`.
- **Fixed** Fixed adding custom styles for `Radar` chart.
- **Fxed** Fixed scrolling when paste and enter items.

## [13.20.4] - 2023-03-30

### @semcore/input-tags

- **Added** Added checking if the input `ref` has `scrollIntoView` method.

- **Fixed** Fixed checking if the input `ref` is exists.

## [13.20.2] - 2023-03-29

### @semcore/d3-chart

- **Fixed** Fixed calculating height of `Bar` component.

### @semcore/date-picker

- **Added** Added default color (`--intergalactic-text-primary`) to the component.
- **Added** Added default color (`--intergalactic-text-primary`) to the component.
- **Added** Added default color (`--intergalactic-text-primary`) to the component.
- **Changed** Changed color in default and focused states as in `Figma`.
- **Added** Added default color (`--intergalactic-text-primary`) to the component.
- **Added** Added design tokens to `TotalPages` component.
- **Added** Added default color (`--intergalactic-text-primary`) to the component.
- **Fixed** Fixed that switch with single label was turning label into secondary text color.
- **Added** Added default color (`--intergalactic-text-primary`) to `Separator` component.
- **Fixed** Fixed tooltip border color for default theme.

## [13.20.0] - 2023-03-28

### @semcore/animation

- **Added** Animation context that allows children components react to parent animation execution.
- **Added** Supported ignoring parent portals nesting via `ignorePortalsStacking`.
- **Added** Small internal util for context consuming in class-based components.

### @semcore/d3-chart

- **Fixed** Added correct display when there is no data in A11Y table.
- **Fixed** Added A11Y error binding to field.
- **Fixed** Utils package was breaking building via webpack and vite.

## [13.19.0] - 2023-03-24

### @semcore/animation

- **Added** Added `pointer-events` properties to scale group `keyframes` to avoid problems with overlapping elements and changing the cursor.
- **Fixed** Fixed local themes on dot.
- **Fixed** Fixed local themes in modals.
- **Fixed** Fixed local themes in notice bubbles.
- **Fixed** Fixed local themes in poppers.
- **Removed** Non-working portalled local theme reapplying.
- **Fixed** Fixed local themes in side panels.
- **Added** Supported portalled local theme reapplying in class-based components.
- **Removed** Removed `Status` group in semantic tokens.
- **Changed** Moved the gray-white token in front of the gray-50, slightly tweaked the order.

## [13.18.0] - 2023-03-23

### @semcore/accordion

- **Fixed** Toggles attributes `aria-expanded` and `aria-controls` were not applied when accordion section was closed.
- **Fixed** Made Badge visible for screen readers again.
- **Fixed** Made `<Card.Title />` `hint` available for screen readers.
- **Added** Added `additionalFields` in `a11yAltTextConfig` for extra text description to the data when using a screen reader
- **Fixed** `aria-controls` and `aria-expanded` HTML attributes wasn't applied on closed dropdown.
- **Added** Added `z-index: 0` to `DropdownMenu.List` so that it doesn't overlap the focus border of neighboring elements.
- **Fixed** `aria-controls` and `aria-expanded` HTML attributes wasn't applied on closed dropdown.
- **Fixed** Navigating options with keyboard now doesn't trigger browser focus.
- **Fixed** `aria-activedescendant` now is properly updated on keyboard navigation.
- **Fixed** Add tabIndex for Icon close.
- **Added** Added properties `backgrouund` and `theme` responsible for spinner theme.
- **Fixed** `aria-controls` and `aria-expanded` HTML attributes wasn't applied on closed dropdown.
- **Fixed** `aria-activedescendant` was applied to selected option but not on focused one.
- **Fixed** Option keys are now based on option value.
- **Fixed** Removed unexpected tabIndex=-1.
- **Added** Added internal util `ScreenReaderOnly` to declaratively put screen reader only text in the components.

## [13.17.2] - 2023-03-22

### @semcore/notice-bubble

- **Fixed** Default export typings wasn't corresponding to the runtime one.
- **Changed** Added `noticeBubbleDefaultManager` export that is equal to the default export.
- **Changed** Deprecated default export. `noticeBubbleDefaultManager` is recommended as a drop-in replacement.
- **Fixed** Focus locked tab navigation might cause scrolling to the end or to the start of the page.

## [13.17.1] - 2023-03-21

### @semcore/d3-chart

- **Fixed** Fixed `Radar` chart with negative rotation hover handling.
- **Fixed** Fixed alignment cursor when there are no tags.

### @semcore/icon

- **Added** Added `GitHubInvert` icon.
- **Fixed** Fixed tag display when crossing the border during scroll.
- **Fixed** Fixed tag alignment when set minimum height.
- **Changed** Updated `Error` view texts in all languages.
- **Changed** Updated `NoData` view texts in all languages.

## [13.16.0] - 2023-03-16

### @semcore/core

- **Changed** Changed logic of merging component styles and context styles due to losing context styles before.

### @semcore/d3-chart

- **Added** Add `angleOffset` parameter to `Radar` chart.
- **Changed** Changed Title's font-weight from `bold` to `semi-bold`.

### @semcore/feedback-form

- **Fixed** Fixed padding for the success state of the feedback form.
- **Fixed** Fixed focus lock might cause infinite focus war when multiple focus locks exist on same page.

## [13.14.0] - 2023-03-15

### @semcore/d3-chart

- **Changed** Much improved A11Y summary generation for `Radar` chart.
- **Fixed** Fixed color of selected period.
- **Fixed** Fixed focus locking and returning.
- **Added** Properties to add icons to notices.
- **Added** `NoticeBubbleManager` method typings.
- **Added** Documentation examples.
- **Fixed** Disappear animation of stacked notices.
- **Fixed** Warning notices were not removable.
- **Fixed** Default links color.
- **Changed** Deprecated adding notices by `NoticeBubble` and `NoticeBubbleWarning` without `NoticeBubbleManager`.
- **Fixed** Fixed typings of exported `NoticeBubbleManager`.
- **Fixed** Fixed focus locking and returning.
- **Fixed** Fixed focus locking and returning.
- **Added** Added `lib/use/useFocusLock` util to control focus lock in popup components (like `Popper`-based, `Modal` and `Sidebar`).

## [13.13.1] - 2023-03-10

### @semcore/tooltip

- **Fixed** Fixed tooltip borders color.

## [13.13.0] - 2023-03-09

### @semcore/d3-chart

- **Added** Added footer in d3 Tooltip.
- **Fixed** Added backward compatibility with react 16.9.
- **Fixed** Fixed non-enumerable slider with provided minimal value.
- **Fixed** Fixed component typings.

## [13.12.0] - 2023-03-06

- **Added** Added a new chart type `Radar`.
- **Fixed** Fixed the ability to move text to the next line with the Enter key in `Textarea`.
- **Fixed** Fixed the ability to move text to the next line with the Enter key in `Textarea`.
- **Fixed** Fixed automatic scrolling to selected option on popper open wasn't working.
- **Added** Added prop `scrollToSelected` to control automatic scroll to selected option on popper open.

## [13.11.2] - 2023-03-03

- **Fixed** Fixed summary generation was broken after i18n enhancement release.
- **Fixed** Fixed `animationsDisabled` prop passing.
- **Fixed** European Union flag with 2x size was fixed again and never again : D.
- **Fixed** European Union flag with 2x size was fixed.
- **Removed** Removed automatic setting of `aria-hidden` to `true`.
- **Fixed** Fixed `animationsDisabled` prop passing.
- **Fixed** Fixed `animationsDisabled` prop passing.
- **Fixed** Fixed `animationsDisabled` prop passing.

## [13.11.1] - 2023-03-01

- **Fixed** Fixed summary generation was broken after i18n enhancement release.

### @semcore/flags

- **Added** New European Union flag has been added to the set.
- **Fixed** Fixed DOM attributes `aria-hidden` and `role` were not overridable.
- **Fixed** Fixed underline width glitching by rebuilding internal animation mechanism.

## [13.10.0] - 2023-02-28

### @semcore/animation

- **Fixed** Fixed `ISlideProps` interface structure.
- **Fixed** Fixed path for `Confluence`, `GoogleCloud`, `Hubspot`, `JavaScript`, `LookerStudio` icons.

## [13.9.1] - 2023-02-22

### @semcore/popper

- **Fixed** Fixed popper autofocus wasn't working if popper contains any focusable elements.

## [13.9.0] - 2023-02-21

### @semcore/accordion

- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Added prop `animationsDisabled` to disable components' animation.
- **Added** Added prop `timingFunction` to control animation easing.
- **Added** Added `<Scale />` and `<Slide />` animation components.
- **Added** Added triggers width animation triggered by change of `value` prop.
- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Added `<AnimatedNumber />` exported component.
- **Fixed** Added check for the presence of DON at start of animation for `RadialTree`.
- **Fixed** Fixed empty table body with virtual scroll enabled displays unexpected "0".
- **Fixed** Added error message for empty `bundleLocale` list in plugin options.
- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Added appear and disappear animation.
- **Changed** Animation duration now might be controlled with design tokens.
- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Added appear and disappear animation.
- **Changed** Animation duration now might be controlled with design tokens.
- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Added value change animation.
- **Changed** Animation duration now might be controlled with design tokens.
- **Added** Little animation of switch active state.
- **Fixed** Fixed double click call.
- **Changed** Animation duration now might be controlled with design tokens.
- **Fixed** In some cases `<ThemeProvider />` was breaking rendering process.
- **Added** Added semcore enhance to animate component dimensions on change of specific props.

## [13.8.1] - 2023-02-16

### @semcore/ellipsis

- **Fixed** Ellipsis wasn't working when tooltip was disabled.
- **Fixed** Text on left and right sides of the Switch are using with "pointer" cursor when component is not disabled.

- **Added** Supported passing tooltip props.
- **Fixed** Fixed wrong intergalactic components filtering path.
- **Fixed** Fixed invalid syntax producing with multiple locales.
- **Added** Added `JavaScript` icon.

## [13.7.0] - 2023-02-13

### @semcore/badge

- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-badge-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Fixed** Fixed hovered state color.
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).
- **Changed** Split rounding design tokens (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded` and `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-addon-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-counter-rounded`).
- **Fixed** Fixed display of `Bar` with height 0 - it is should not be rendered.
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Fixed** Fixed inverted state colors.
- **Fixed** Fixed `m` and `l` sizes rounding.
- **Changed** Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-surface-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).
- **Changed** Renamed `YoutubeAlt` icon to `YoutubeColored`.
- **Changed** Renamed `YoutubeRed` icon to `YoutubeInvert`.
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-large` -> `--intergalactic-modal-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-surface-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-progress-bar-rounded`).
- **Fixed** Fixed scroll bars rounding (`3px` -> `4px`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-progress-bar-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-extra-large` -> `--intergalactic-switch-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-extra-large` -> `--intergalactic-tag-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`).
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-popper-rounded`).
- **Changed** Changed design tokens facebook color (`#3b5998` -> `#1877f2`).
- **Changed** Changed design tokens linkedIn color (`#1a7ab2` -> `#0a66c2`).
- **Changed** Changed design tokens twitter color (`#2bafeb` -> `#1d9bf0`).
- **Fixed** Fixed issue with scroll on small screen
- **Changed** Renamed rounding design token (`--intergalactic-rounded-medium` -> `--intergalactic-control-rounded`, `--intergalactic-rounded-large` -> `--intergalactic-modal-rounded`).

## [13.6.2] - 2023-02-07

### @semcore/carousel

- **Fixed** Fixed freezing when slide index is greater than number of slides.
- **Fixed** Fixed animation for `Donut`.
- **Changed** Changed minimum height in types for `Bar`.
- **Fixed** Fixed view of cells when using cell grouping and columns at the same time.
- **Fixed** Stopped showing tooltip if text is not truncated.

## [13.6.1] - 2023-01-26

### @semcore/d3-chart

- **Fixed** Fixed and changed minimum height of `Bar`.
- **Fixed** Fixed definition of users locale.
- **Fixed** Fix floating sort icon to right align.

## [13.6.0] - 2023-01-20

- **Fixed** Fixed animation in React strict mode for `RadialTree` and `Donut`.
- **Added** Added `TwitterCarousel`, `TopStories`, `WebStories`, `FindResultsOn`, `InterestingFinds`, `Event`, `SeeResultsAbout`, `PopularProducts`, `RelatedProducts`, `AddressPack`, `RelatedSearches`, `ShortVideos`, `NotificationNo` icons.
- **Changed** Put all CSS `:hover` selectors into `@media(hover: hover)` block.

## [13.5.0] - 2023-01-19

### @semcore/accordion

- **Added** Added `duration` property to `Accordion.Item` types.
- **Fixed** Removed font-family enforcement.
- **Fixed** Removed font-family enforcement.
- **Fixed** Removed font-family enforcement.
- **Fixed** Removed font-family enforcement.
- **Fixed** Removed font-family enforcement.
- **Fixed** Fixed color picker display when using non-extended `<ColorPicker />` .
- **Fixed** Fixed `DatePicker.InputTrigger` edited text highlight color.
- **Fixed** Removed font-family enforcement.
- **Added** Added `Modal.Title` component and `aria-labelledby` property for better A11Y.
- **Fixed** Removed minimal height limitation.
- **Fixed** Removed font-family enforcement.
- **Changed** Renamed `--intergalactic-border-danger` token name to `--intergalactic-border-critical`.
- **Changed** Renamed `--intergalactic-border-danger-active` token name to `--intergalactic-border-critical-active`.
- **Changed** Renamed `--intergalactic-border-table-accent-border` token name to `--intergalactic-border-table-accent`.
- **Changed** Added description for every design token.
- **Changed** No other renaming expected in the future.

## [13.4.0] - 2023-01-16

### @semcore/popper

- **Fixed** Fixed focus hijacking by non editable poppers.

### @semcore/i18n-unplugin

- **Added** Added `@semcore/ui/i18n-unplugin`.
- **Added** Added `Feedback` illustration.

## [13.2.13] - 2023-01-11

### @semcore/animation

- **Fixed** Fixed flickering in `Collapse` animation.
- **Fixed** Added prop `transparent` for all charts opacity
- **Fixed** Fixed error loading styles in correct order for `mini-css-extract-plugin`.
- **Fixed** Fixed French, Japanese and Turkish translations.
- **Fixed** Fixed internal imports after babel transformation were causing "named import from JSON" errors in some bundlers.
- **Changed** Renamed `Stoller` icon to `Stroller`.
- **Fixed** Fixed displaying tooltip of `ConfirmControl`.
- **Changed** Changed all translations of `CancelControl` text tooltip.
- **Added** Added Korean translation.
- **Fixed** Fixed typo in property `tabIndex`.

## [13.2.12] - 2023-01-09

### @semcore/d3-chart

- **Added** Added prop `transparent` for charts opacity
- **Changed** `DropdownMenu.Popper` closes when the `Enter` button is pressed.
- **Fixed** Fixed internal mechanism of interpolating variables into translated texts.

## [13.2.11] - 2023-01-04

### @semcore/ellipsis

- **Fixed** Remove react warning with non-HTML props.
- **Fixed** Fixed CSS variable design tokens.
- **Added** Added cursor change when hovering `NoticeGlobal.CloseIcon`.
- **Fixed** Fixed CSS variable design tokens.

## [13.2.10] - 2022-12-27

### @semcore/card

- **Fixed** Hint tooltip is centered vertically.
- **Fixed** Fixed `Donut` chart rendering when hovering over a chart while it is loading.
- **Fixed** Fix style for `resizable`.
- **Added** Added `box-sizing` for correct offset display.
- **Added** Added `Jewelry`, `Photo`, `Military`, `Restaurant`, `Music`, `Recreation`, `Events'`, `Cosmetics`, `Fashion`, `Printing`, `Science`, `Comics`, `Gambling`, `Architecture`, `Veterinary`, `Furniture`, `Adult`, `Religion`, `PublicSafety`, `Security`, `Fish`, `Law`, `Oil`, `Packaging`, `Logistic`, `Marine`, `PublicUtility`, `Craft`, `Sport`, `Car`, `Games`, `Language`, `Smoking`, `Farm`, `Food`, `Wine` icons.
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
- **Fixed** Fixed underline for links from the design system.
- **Fixed** Fixed vertical align for use as a text link.
- **Fixed** Fixed display of placeholder with empty value.
- **Fixed** Fixed CSS syntax error.

## [13.2.7] - 2022-12-19

### Global

- **Added** Added internationalization of aria attributes.
- **Changed** Supported semi-async internationalization of text in A11Y module.
- **Fixed** Fixed syntax CSS.
- **Changed** Added `react-dom` to peer dependencies.
- **Fixed** Normalized path to re-export `@semcore/illustration`.
- **Fixed** Fixed non-react node detection for `addonTextChildren`.
- **Changed** Supported semi-async internationalization.

## [13.2.6] - 2022-12-14

### @semcore/illustration

- **Fixed** Fixed illustrations reexports.

### @semcore/base-trigger

- **Fixed** Fixed hardcoded spacing style literal.
- **Fixed** Fixed supporting ellipsis links with addon.
- **Fixed** Fixed default theme background.

## [13.2.4] - 2022-12-13

### Global

- **Changed** Added `react-dom` to peer dependencies.
- **Changed** The icon in `LinkTrigger` is centered vertically.
- **Fixed** Fix tabulation and moving highlighted items
- **Changed** centered `Link.Addon` vertically.

## [13.2.3] - 2022-12-09

### @semcore/animation

- **Changed** Changed prop `initialAnimation` to optional.
- **Fixed** Opening animation is working again.
- **Changed** Changed prop `initialAnimation` to optional.
- **Fixed** Fixed calculation size when changing height of the container.

## [13.2.2] - 2022-12-07

- **Added** Added prop `initialAnimation` to run animation on the first rendering
- **Fixed** Fixed exporting `iso2Name`, `iso3iso2` and `nameWithoutIso` because of linter warnings.
- **Added** Added type `IInputCtx` for export.
- **Fixed** Fixed `Value` type
- **Fixed** Fixed `NoticeBubbleManager` types
- **Added** Added prop `initialAnimation` to run animation on the first rendering
- **Fixed** Fixed screen readers support for `Select.List`
- **Fixed** Fixed layout so that the white background in the rounded borders of the modal would not be visible.

## [13.2.1] - 2022-12-02

### @semcore/dropdown-menu

- **Changed** Changed size of shadow in `DropdownMenu.List` from `9px` to `16px`.
- **Added** Added missed object `iso3iso2` in `index.d.ts` for exporting.
- **Fixed** Fixed exported types of components.

## [13.2.0] - 2022-11-30

### @semcore/base-trigger

- **Added** Added support text ellipsis in `LinkTrigger.Text`.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`.
- **Fixed** Allowed to pass any svg attributes.
- **Fixed** Fixed `Bar` click handler typings.
- **Fixed** Fixed support handling of bars event handling with `paddingOuter`.
- **Added** `Bar` component now supports `onClick` handler with bar data in callback.
- **Fixed** Fixed InputTrigger subcomponent types.
- **Added** Added CSS property `isolation` to container.
- **Changed** Component was fully rebuilt internally. Backward capability mostly preserved, legacy apis was marked as deprecated.
- **Changed** Due to the effect of cutting off the last line, it was decided to add a shadow to the container (`DropdownMenu.List`) when scrolling.
- **Changed** Changed `margin` to `padding` to make the scrollbar look better.
- **Changed** Now highlighted tabs are also browser focused.
- **Changed** Fixed few countries flag displaying.
- **Changed** Removed North Ireland flag as far as image of North Ireland flag was always missing in repository and random image was displayed instead.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Added** Added `Rephrase`, `SimplifyText`, `ExpandText` icons.
- **Fixed** Disabled moving focus in tooltips.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.
- **Fixed** Fix style for disabled state.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.
- **Added** Added `aria-invalid` for input in invalid state.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Fixed** Replaced `NoticeBubbleManager` instance typings with `NoticeBubbleManager` typing.
- **Fixed** Export of `NoticeBubbleManager` was missing in typings.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Fixed** Fixed attributes and line-height for last page
- **Added** Added CSS property `isolation` to container.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Changed** Changed margin-bottom from 16px to 24px.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`.
- **Changed** Removed `width` and `height` properties from `VennChartSkeleton` and `PieChartSkeleton`.
- **Fixed** Fixed showing types in autocomplete IDE.
- **Changed** Changed `font-weight` of tab's text and `height` of underline.
- **Changed** Tabs focus doesn't trigger tab select.
- **Changed** Pressing "Enter" and "Space" keys focuses current tab.
- **Changed** Changed `font-weight` of tab's text.
- **Added** Added hover styles for close icon.
- **Changed** Updated border-color in focus state from `--blue-400` to `--blue-500`, `--red-400` to `--red-500`, `--green-400` to `--green-500`.
- **Changed** Updated border-color for `warning` theme from `--red-400` to `--red-500`.
- **Changed** Changed `keyboard-focus` opacity
- **Added** Added ability to merge `styles` field for `assignProps` function.

## [13.1.1] - 2022-11-09

- **Fixed** Fixed `FilterTrigger` accessibility.
- **Fixed** Fixed displaying in unchecked and disabled state.
- **Fixed** Fixed hover and active animated for `Donut` chart.
- **Fixed** Fixed input trigger visual divergence from initial design.
- **Fixed** Removed lock on fixed version of `@semcore/input`.
- **Added** Component was added to export of `@semcore/ui`.
- **Added** Added `LookerStudio` icon.
- **Fixed** Fixed mask and text line-height mismatch.
- **Fixed** Fixed styles for last and single pages

## [13.1.0] - 2022-11-03

### @semcore/animation

- **Added** Added a property that removes the `overflow=hidden` setting.
- **Changed** Returning the original `overflow` after the animation has passed.
- **Fixed** Lazy checks for necessity of `aria-label` in non production environment.
- **Fixed** Fixed screen readers support.
- **Fixed** Fixed displaying in unchecked and disabled state.
- **Fixed** Fixed screen readers support.
- **Fixed** Fixed hover and active animated for `Donut` chart.
- **Fixed** Fixed display of minimum bar size in `StackBar` .
- **Added** Added display of minimum bar size in `HorizontalBar` .
- **Fixed** Fixed inner radius for `Donut` chart. It began to equal what is indicated in the `innerRadius` prop.
- **Fixed** Fixed reference lines were missing dashed style.
- **Fixed** Fixed typings of render functions.
- **Added** Support for inheritance of `alignItems` prop from header to cells.
- **Added** Added `disabledScroll` property that disables scrolling in tables.
- **Added** Added the ability(`flex="inherit"`) to inherit the size from the top table.
- **Fixed** Removed lock on fixed version of `@semcore/input`.
- **Fixed** Fixed paddings.
- **Fixed** Lazy checks for necessity of `aria-label` in non production environment.
- **Changed** Updated `Text` icon.
- **Added** Added icon `GoogleAds`
- **Fixed** Removed wrong aria role and added needed aria label.
- **Added** Added accessibility needed aria label.
- **Fixed** Fixed mask and text line-height mismatch.
- **Added** Allowed to pass children.
- **Fixed** Lazy checks for necessity of `aria-label` in non production environment.
- **Changed** Updated `focus-lock`.
- **Changed** Updated `focus-lock`.
- **Changed** Updated `focus-lock`.
- **Fixed** Fixed that some secret combination of arrows pressing was causing infinite focus call and temporary freeze of browser.
- **Fixed** Fixed Screen readers support.
- **Added** Added `hasLabels` utility.
- **Fixed** Removed `@types/react`, `@types/react-dom` and `@types/node` from package direct dependencies.

## [13.0.2] - 2022-10-20

### @semcore/base-trigger

- **Fixed** Fixed the problem of not showing the placeholder when the body of the `FilterTrigger` is empty.
- **Fixed** Fixed calculation children index.
- **Changed** Reverting changes from version `3.3.12` as these changes are implemented in the `utils/lib/addonTextChildren`.
- **Fixed** Fixed wrong setting of `type=button` attribute for every `DropdownMenu.Trigger` based component.
- **Fixed** Fixed unexpected verbose console warnings.
- **Fixed** Fixed support of Safari.
- **Fixed** Removed `@types/react`, `@types/react-dom` and `@types/node` from package direct dependencies.

## [13.0.1] - 2022-10-14

### Global

- **Fixed** Fixed reexports of `@semcore/ui` package.

## [13.0.0] - 2022-10-12

- **Added** Added support for React 18 🔥
- **Fixed** Fixed problems in working with react strict mode.
- **Fixed** Fixed elements id uniqueness.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **BREAK** The component has been removed from the release system. Use `@semcore/d3-chart`.
- **Fixed** Added missing `aria-checked` A11Y attribute.
- **Fixed** Fixed paddings of addons in input.
- **Changed** Changed approach to children index calculation with React parallel rendering.
- **Fixed** Ensured A11Y module do not break mouse interactions.
- **Fixed** Fixed issue with uninitialized styles in some charts.
- **Added** Added support `ref` for `DataTable.Column` and `DataTable.Cell`.
- **Changed** Changed the way to check the contents of the trigger for `ButtonTrigger`
- **Changed** Changed utils function for `ButtonTrigger`
- **Fixed** Fixed unexpected margin of calendar grid cells in Safari browser.
- **Changed** Moved svg illustrations to `@semcore/illustration` component.
- **Changed** Renamed `AppBlock` icon to `AppsBlock`.
- **Added** Added icon Stoller.
- **Added** Added `Charge`, `CardUpdate`, `ChargebackWin`, `ChargebackLoss` icons.
- **Changed** When `interactive` prop is provided, `aria-label` or `aria-labelledby` props from now are required. If required props are not provided a warning is logged to developer console.
- **Changed** Remove masks from all svg illustrations for WidgetEmpty component.
- **Added** Added and changed fields `main`, `module` and `typings` in `package.json`.
- **Added** Added missed illustrations and added missed id attribute for some illustrations.
- **Added** Added available for export function `getIllustrationPath` to get URL of illustrations.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Changed** Remove useless styles for Addons.
- **Fixed** Fixed displaying of addons placed on the end (right in ltr languages) of input.
- **Fixed** Fixed mask underlay position desynchronization with HTML input content;
- **Fixed** Hidden placeholders and mask from real DOM to exclude it from copied content.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Fixed** Fixed addon placed before input value may be overlayed by input value.
- **Fixed** Fixed previously broken in previous version backward compatibility of piping API.
- **BREAK** The approach to determining neighbors has been changed.
- **Changed** Color for Close icon with theme `info` was changed from `--blue-400` to `--gray-400`.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Fixed** Added essential accessibility attributes.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Fixed** Removed aria attributes that were breaking components A11Y.
- **Fixed** Fixed arrangement of internal and external circles in `checked` state.
- **Added** Screen readers support.
- **Changed** All skeletons are `aria-busy` from now.
- **Changed** Stable release
- **Added** Added box-sizing
- **Changed** This component has been deprecated. Added a message about it.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Changed** Improved accessibility with labeling switch by currently picked option.
- **Changed** Updated major dependency `@semcore/neighbor-location` [2.3.15 ~> 3.0.0]
- **Added** Added styles for panel consisting only of an icon.
- **BREAK** The component has been removed from the release system. Use `@semcore/data-table`.
- **Fixed** Added a check for empty children for `addonTextChildren` function.
- **Changed** Moved svg illustrations to `@semcore/illustration` component.

## [12.6.0] - 2022-09-22

### @semcore/chart

- **Changed** Mark exported functions as deprecated with recommendation to use `@semcore/d3-chart`.
- **Added** Added access to flags that don't have ISO code.
- **Fixed** Fixed flag name return type.
- **Fixed** Fixed icon Toxic.
- **Fixed** Added essential accessibility attributes.
- **Fixed** Fixed arrangement of internal and external circles in `checked` state.
- **Changed** All skeletons are `aria-busy` from now.
- **Added** Out of the box support for multiple choice options.
- **Fixed** Added essential accessibility attributes.
- **Fixed** Added essential accessibility attributes.
- **Changed** Mark exported functions as deprecated with recommendation to use `@semcore/data-table`.
- **Added** Added Turkish language support.
- **Added** Added new components.

## [12.5.1] - 2022-09-15

### @semcore/animation

- **Fixed** Fixed playing entering animation if init animation state is already reached.
- **Fixed** Change line-height to correctly display uppercase letters.
- **Fixed** Fixed aria warning detection.
- **Changed** Changed the logic of entering color format. From this version it is possible to enter hex code in both formats: with `#` sign - `#123123` and without `#` sign - `123123`.
- **Fixed** Changed paths in CSS files to relative.
- **Changed** Improved component accessibility in cases of virtual scroll and columns sorting.
- **Added** Added aria attributes for better A11Y.
- **Changed** Removed unused `hidden` property from types.
- **Added** Added screen reader support
- **Fixed** Fixed aria warning detection.
- **Fixed** Enforced inner text font line height to prevent possible bottom cut.
- **Fixed** Fixed typos in styles: `lihe-height` -> `line-height`.
- **Fixed** Fixed font height so that the letter "g" would not be cut off.
- **Fixed** Enforced inner text font line height to prevent possible bottom cut.
- **Fixed** Enforced inner text font line height to prevent possible bottom cut.
- **Added** Added screen reader support
- **Added** Added `aria-live` attribute for better A11Y.
- **Fixed** Added dependency `@types/react-dom` and fix type for `getNodeByRef` function.

## [12.5.0] - 2022-08-29

### @semcore/accordion

- **Fixed** Fixed disabled items handling to improve component accessibility.
- **Fixed** Fixed playing entering animation if init animation state is already reached.
- **Added** Added aria-hidden because component "badge" is not the main functionality and will only confuse the blind user.
- **Changed** Added essential `aria-\*` attributes.
- **Fixed** Update version `@semcore/utils` to use additional functions.
- **Added** Added empty button aria-label check.
- **Added** Introduced charts accessibility module.
- **Fix** Fixed `ResponsiveContainer` memory leak on unmount.
- **Fix** `Venn` chart was not mentioned in exported types.
- **Added** Added Turkish language support.
- **Changed** Removed spaces around dash in formatted date.
- **Changed** Updated translations.
- **Added** Added Turkish language support.
- **Added** Added `role="alert"` attributes to increase support for A11Y.
- **Fixed** Fixed broken display of Cote d'Ivoire's flag.
- **Fixed** Fixed broken display of United States Minor Outlying Islands' flag.
- **Added** Added call `onClick` when pressing enter if the icon is `interactive`.
- **Added** Added missing type `defaultValue` in `index.d.ts`.
- **Added** Added screen reader notification of input value and aria attributes for better A11Y.
- **Fixed** Change tag for `Link.Addon` from `div` to `span`
- **Fixed** Update version `@semcore/utils` to use additional functions.
- **Added** Added screen reader support and empty link aria-label check
- **Added** Added aria-live attribute for better accessibility.
- **Changed** Animation styles moved to CSS file and now available for theming.
- **Added** Added role and aria-live attribute for better accessibility.
- **Added** Added aria-live attribute for better accessibility.
- **Added** Added Turkish language support.
- **Added** Added the necessary labels for improved accessibility work.
- **Fixed** Remove `overflow='auto'` because the component should not scroll, its content should adapt to the desired size.
- **Added** Added missing type `defaultValue` in `index.d.ts`.
- **Fixed** Update version `@semcore/utils` to use additional color changing functions.
- **Added** Added missing types `value` and `defaultValue` in `index.d.ts`.
- **Added** Added missing type `defaultValue` in `index.d.ts`.
- **Changed** Added essential `aria-\*` attributes for Typography lists.
- **Added** Added util function `reactToText` to convert react component to text.
- **Added** Added support of `elementtiming` attribute passing on all components.

## [12.4.2] - 2022-08-02

### @semcore/d3-chart

- **Fix** `Venn` chart was not mentioned in exported types.
- **Fixed** Fixed package `.mjs` artifacts cross-imports to support modern js bundlers.

## [12.4.1] - 2022-08-01

### @semcore/date-picker

- **Added** Added new button components `Apply` and `Reset` for `DateRangePicker` and `MonthRangePicker`.
- **Fixed** Renamed icon from `AppBlock` to `AppsBlock`. Old name is deprecated.
- **Fixed** Fixed package `.mjs` artifacts cross-imports to support modern js bundlers.

## [12.4.0] - 2022-07-25

### @semcore/d3-chart

- **Fixed** Fixed ability to change `tag` in render(prop) functions.
- **Fixed** Fixed `RadialTree` typings.
- **Fixed** Fixed `RadialTree` rendering in Safari.
- **Fixed** Fixed `RadialTree` radian labels rendering.
- **Changed** Add `onScroll` callback for `<Body/>`.
- **Fixed** Remove deprecated size (`xl`).
- **Fixed** Fixed font family in Title
- **Fixed** Renamed icon from `AppBlock` to `AppsBlock`. Old name is deprecated.
- **Added** Added icon `ClusteredList` .
- **Added** Added icon `AppsBlock`.
- **Changed** Fixed `Input.Addon` CSS classes were missing during server-side rendering.
- **Fixed** Fixed the reaction when interacting with the keyboard for the correct work of other components with keyboard support.
- **Fixed** Fixed applying `border-radius` for outline.
- **Fixed** Fixed rounding of float numbers.
- **Fixed** Tuned up childildren elements counting (ignoring empty string).
- **Fixed** Fixed possibility to insert render function into `Popper.Trigger`.
- **Fixed** Fixed color of Addon icons in `InputSearch`.
- **Fixed** Fixed pcakage compatibility with ES modules.

## [12.3.0] - 2022-07-07

- **Added** Added index to Bubble chart
- **Added** Added property minimal height `hMin` for Bar (`<Bar hMin={...}/>`)
- **Added** Added property `active` for `Donut.Pie`
- **Fixed** Exclude props from HTML for `Tooltip.Dot`
- **Fixed** Recalculate position for `Dot` after update scale
- **Fixed** Optimization render `Dot`
- **Fixed** Fixed scrolling of table when enable virtual scrolling.
- **Fixed** Fixed feedback image.
- **Added** Added icon `AppsBlock`.
- **Changed** Added react component `MailSent` put on path `@semcore/illustration/MailSent`
- **Changed** Illustration `MailSent` put on path `@semcore/illustration/svg/MailSent`
- **Fixed** Change inherited TS type for Radio (IFlexProps -> IBoxProps)
- **Changed** Updated svg images for all charts, nothing found and congratulations states.

## [12.2.0] - 2022-06-24

### @semcore/breadcrumbs

- **Fixed** Fixed separator's margin.
- **Changed** Changed type names from 'IPieProps' to 'IRechartsPieProps' so that there are no intersections with other components.
- **Fixed** Fixed problem show `Checkbox` in `Modal` (Checkbox added scroll on page).
- **Changed** Changed type names from 'ITooltipProps' to 'ITooltipChartProps' so that there are no intersections with other components.
- **Changed** Changed type names from 'ITooltipContext' to 'ITooltipChartContext' so that there are no intersections with other components.
- **Changed** Changed type names from 'iconNames' to 'iconNamesErrors' so that there are no intersections with other components.
- **Changed** Updated `react-final-form` to `6.5.2` to support React 17.
- **Changed** Added files with the extension .mjs
- **Fixed** Remove 4px vertical paddings.
- **Changed** Changed type names from 'NoticeTheme' to 'NoticeGlobalTheme' so that there are no intersections with other components.
- **Changed** Changed type names from 'IPopperHandlers' to 'IPillsHandlers' so that there are no intersections with other components.
- **Fixed** Theme prop doesn't work when styles has been post-processed
- **Changed** Updated `react-final-form` to `6.5.2` to support React 17.
- **Fixed** Fixed non default colors resolving.
- **Fixed** Fixed textarea scroll to bottom on every resize.
- **Changed** Changed type names from 'ChildrenType' to 'IfChildrenType' so that there are no intersections with other components.
- **Changed** Update version dependency `@babel/runtime`.
- **Changed** Changed type names from 'iconNames' to 'iconNamesWidgetEmpty' so that there are no intersections with other components.

## [12.1.0] - 2022-05-31

### @semcore/button

- **Fixed** Fixed `width, height` for size Button.
- **Fixed** Fixed background-color active state for `<Button use='primary' theme='warning'/>`.
- **Fixed** Fixed Item tag property setting
- **Fixed** Fixed version `@babel/runtime` for dependency `react-final-form`.
- **Changed** Changed animation duration from 200ms to 250ms.
- **Changed** Set prop `use` in deprecated. Added fallback on `NoticeGlobal`.
- **Changed** Add styles for Close icon hover.
- **Added** Initial release
- **Fixed** Fixed non-closing popper after clicking on an Option
- **Fixed** Fixed show `<Timepicker size='l' is12Hour/>` (added margin right to -4px for `Timepicker.Format`).
- **Changed** Update version dependency `@babel/runtime`.

## [12.0.0] - 2022-05-19

### Global

- **BREAK** Updated styles according to the library redesign policy.
- **BREAK** Removed value "xl" and "s" for "size".
- **BREAK** Removed value "xl" and "s" for "size".
- **BREAK** Removed CSS media rules.
- **BREAK** Removed value "xl" for "size".
- **Fixed** Fixed collapsing of header grouped cells.
- **Fixed** Fixed columns width was usually not controlled by `w`, `wMin` and `wMax` props
- **Fixed** Fixed package lost typings.
- **BREAK** Removed value "xl" for "size".
- **BREAK** Removed deprecated prop `popperStretch`.
- **BREAK** Removed deprecated props `onSelect, optionCount, triggerType`.
- **BREAK** Removed value "xl" for "size".
- **BREAK** Changed size flags from 14x11 to 16x16.
- **BREAK** Changed sizes from m/l/xl to s/m/l
- **BREAK** Removed support property `hidden` for `FullscreenModal`.
- **BREAK** `Footer` now use inside component `Flex`
- **BREAK** Removed icons `UserGroupNo, UserShared`.
- **Added** Added icon `GoogleCloud`.
- **Added** Added icon `UserShared`.
- **Changed** Update pay icons `Visa, JCB`.
- **Added** Added icons `IndentedResult, UserSharedFirst`.
- **Changed** Changed icon `UserGroup`.
- **Changed** Moved all color definitions to themable styles.
- **BREAK** Removed value "xl"/"s"" for "size".
- **BREAK** Removed deprecated props "onPageChange"/"totalPagesFormatter"/"label"
- **BREAK** Removed value "xl"/"s"" for "size".
- **BREAK** Removed named import "Progress" and "Bar".
- **BREAK** Removed "animation" props, use "value=0".
- **BREAK** Removed value "xl" for "size".
- **BREAK** Removed named imports.
- **BREAK** Removed support to used `Select.InputSearch`
- **BREAK** Removed support properties `selectedOptions, defaultSelectedOptions` for `Select`
- **BREAK** Removed support `Select.OptionCheckbox`
- **BREAK** `Select.Option.Checkbox` used only two sizes `l, m`
- **Added** Added children components `Header, Footer, Body, Back, Title` for `SidePanel`.
- **Added** Added skeleton for Radial Tree chart.
- **BREAK** Removed size `xxs`.
- **BREAK** Removed value "xl" for "size".
- **BREAK** Set `primary` as default component theme.
- **Added** Added `additional` theme.
- **BREAK** Removed value "xl" for "size".
- **BREAK** Removed ability to pass custom color to "theme" property.
- **BREAK** Removed named import "Tooltip".
- **Fixed** Synced dependencies versions to remove duplicates in the single export package.
- **Added** Added `light` function for increasing `l` axes in hsl color space of `rgb(a)` and hex colors
- **Fixed** Removed react warning when accessing "ref" property
- **Added** Added `coffee`/`heat-map-chart`/`kagi-chart`/`radial-tree-chart`/`suggestion`/`under-construction` illustrations.

## [11.2.0] - 2022-04-26

### @semcore/animation

- **Added** Added `preserveNode` property.
- **Fixed** Fixed lost typings of `@semcore/chart/utils/colors` utility.
- **Added** Added `<RadialTree />` chart.
- **Fixed** Fixed left and right `<Axis.Title />` unexpected horizontal transition based on title characters count.
- **Fixed** Fixed package lost typings.
- **Changed** Fixed grouped rows hover highlight.
- **Added** Virtual scroll support.
- **Changed** Internal enhances, rewritten from js to ts, render algorithmic performance increased.
- **Fixed** Fixed uninitialized columns width from fixed size to equal flex-boxes.
- **Added** Introduced `<InlineEdit />` component.
- **Changed** Changed `<InlineInput />` API to make it more consistent with other components.
- **Changed** Deprecated `onAdd` callback property in favor of new `onAppend` one.
- **Changed** Provided SyntheticEvents to second callbacks argument.
- **Fixed** Fixed displaying of 2, 3 and 4 digit page number in focused pagination input.
- **Fixed** Made `onScroll` property optional.
- **Added** Added `onScroll` property.
- **Fixed** Fixed types for `Slider.Knob` and `Slider.Bar`
- **Fixed** Fixed scollable spin-container (for example in `data-table`).
- **Added** Added `radial-tree-chart` illustration.

## [11.1.1] - 2022-04-03

- **Added** Added `preserveNode` property.
- **Fixed** Fixed lost typings of `@semcore/chart/utils/colors` utility.
- **Fixed** Component may fire `onRemove` event even when new tag text field is filled with space symbols.
- **Fixed** Fixed wrong resize of controlled textarea when value is significantly changes in parent controller.

## [11.1.0] - 2022-03-30

### @semcore/babel-plugin-react-semcore

- **Added** Added export function `getColorVars`.
- **Fixed** Fixed old node versions support.
- **Fixed** Fixed old node versions support.
- **Added** Added export function `postcss` from main js file `@semcore/babel-plugin-styles` .
- **Added** Added `PLACEHOLDER_REPLACER` property for function `postcss` .
- **Fixed** Improved keyboard focus styles.
- **Fixed** Rewrite file colors from tsx to js, for normal parsing in `babel-plugin-react-semcore`.
- **Fixed** Left and bottom plot titles now do not overlap axis ticks.
- **Fixed** Fixed figure cut on right or bottom edges when left or top margin is positive.
- **Fixed** Fixed enter space in input trigger for `DropdownMenu.Trigger`.
- **Added** Added repository field to package.json file.
- **Added** Added icons `Formal, Casual, QuestionSerp, MathMinusAlt`.
- **Fixed** Fixed jumping content, when modal inside modal and body don't have `box-sizing`.
- **Fixed** Fixed jumping content, when body don't have `box-sizing`.
- **Fixed** Fixed `viewBox` for `BarChartSkeleton`.
- **Changed** Rewrite the component to svg.
- **Added** Rounded corners.
- **Fixed** Fixed previously lost overflowed text ellipsis.
- **Fixed** Fixed set property in body (when window inside window and body don't have `box-sizing`) in `usePreventScroll`.

## [11.0.0] - 2022-02-25

### Global

- **Added** Added repository field to package.json file.
- **Fixed** Fixed LinkTrigger hovered text color.
- **BREAK** Card was divided into Header and Body
- **Added** Background was added
- **Fixed** Fixed animation display when resizing.
- **Fixed** Fixed explicit default theme
- **Fixed** Fixed Static files were missing in release 10.2.0
- **Added** Added gap, rowGap and columnGap CSS properties support for Flex component.
- **Fixed** Fixed sizes for a few icons.
- **Fixed** Fixed color setting for LightningFilled, MailOpenFilled.
- **Added** Added `Hubspot` icon.
- **Changed** Changed image `SortAsc` and `SortDesc` icons.
- **Fixed** Added export type for Bubble, ScatterPlot, Venn charts
- **BREAK** Remove props background/color/interaction, use theme instead.
- **BREAK** Refactored component to handle extreme values.
- **BREAK** Add new children components `SpinContainer.Content` when using advanced mode along with `SpinContainer.Overlay`.
- **Fixed** Removed react warning about uncontrolled timer.
- **Fixed** Add missed ts type defaultValue.
- **Fixed** Add missed ts type defaultValue.
- **Fixed** Fixed colors for primary-warning.
- **Fixed** Auto change rows now works in controlled mode.
- **Fixed** Removed CSS specificity of props lineHeight/fontSize in `Text` component
- **Changed** Removed unused dependencies `@semcore/link`, `@semcore/button`.

## [10.2.1] - 2022-02-10

### @semcore/errors

- **Fixed** Static files were missing in release 10.2.0

## [10.2.0] - 2022-02-08

### @semcore/card

- **Changed** Changed styles.
- **Fixed** Rename deprecate color `white-01` to `white`.
- **Fixed** Fixed list colors to get from a function getColor.
- **Fixed** Add line-height for label text to not depend on external line-height.
- **Added** Added Bubble and Scatter plot charts.
- **Changed** Tooltip font size changed.
- **Changed** Revert function findComponent for check children in Tooltip, because it's valid for children () => ({}).
- **Changed** Replaced function findComponent to isAdvanceMode for check children in Tooltip.
- **Changed** Changed background-color from transparent to #fff for use="secondary" `DataTable.Column` and `DataTable.Cell`.
- **Added** Added ability to use custom theme color.
- **Added** Added support Tooltip props for `FeedbackForm.Item`.
- **Fixed** fixed styles for secondary Notice.
- **Added** Add icons 'LightningFilled' in new icons.
- **Fixed** Fixed view icon MailOpenFilled size m.
- **Changed** Replaced function findComponent to isAdvanceMode for check children in Modal.
- **Changed** Replaced function findComponent to isAdvanceMode for check children in ScrollArea.
- **Changed** Replaced function findComponent to isAdvanceMode for check children in SidePanel.
- **Fixed** Fixed show active tab when TableLine have padding.
- **Changed** Changed background-color from `undefined` to `#fff` for ``.
- **Changed** Replaced function findComponent to isAdvanceMode for check children in Tooltip.
- **Added** Added function isAdvanceMode in findComponent.

## [10.1.0] - 2022-01-24

### @semcore/accordion

- **Changed** Up version icons and use new icon.
- **Changed** correct line-height value to 1.2.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Up version icons and use new icon.
- **Fixed** Fixed filtering colors without index.
- **Fixed** Revert color gray in object colors.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Removed unused dependencies @semcore/icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Added** Add icons 'Hotel' in new icons.
- **Added** Added import icons from root folder (exm: @semcore/icon/ArrowDown/m)
- **Changed** Added import new icons
- **Changed** Old icons you can get from @semcore/icon/lib/Name/Size
- **Changed** New icons you can get from @semcore/icon/Name/Size
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Changed** Up version icons and use new icon.
- **Added** Added Bubble and ScatterPlot chart
- **Changed** Up version icons and use new icon.
- **Fixed** [ts] Added type custom in property use.
- **Changed** Up version icons and use new icon.
- **Changed** Removed unused dependencies @semcore/icon.
- **Changed** Up version icons and use new icon.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Removed unused dependencies @semcore/icon.

## [10.0.1] - 2021-12-24

### @semcore/badge

- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height Axis from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height Tag from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** remove functionality for stop propagation of events onMouseEnter, onMouseLeave from the ``.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Added** Added primary-muted theme
- **Fixed** Fixed hover for non-interactive tag
- **Changed** Changed line-height from 1.2 to 1.1 for correct display in all browsers.
- **Fixed** Fixed opacity calculation regardless of case.
- **Fixed** Fixed logic to function defaultFindNeighbor for a11yEnhance.

## [10.0.0] - 2021-12-10

### @semcore/breadcrumbs

- **Changed** Rewrite code from TS to JS
- **Fixed** Remove 'sideEffect=false' because bug in recahrts lib.
- **Changed** Moved chart colors vars to style
- **Changed** Changed package from venn.js to @upsetjs/venn.js.
- **Changed** Moved checkbox size vars to style
- **Added** Added warning and danger themes
- **Fixed** Calculate correct border radius for Bar.
- **Fixed** Fixed set scale for Area, Line.
- **Changed** Moved chart colors vars to style
- **Fixed** Fixed global color .dnd
- **Changed** Up version
- **Changed** Moved SLabel colors to style
- **Fixed** Property root for Popper set to OutsideClick.
- **Added** [TS] Added type for Select. Option. Checkbox.
- **Added** Added class name to InputSearch.
- **Fixed** Fixed import styles in InputSearch.
- **Added** Added property for Tag color
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
- **Fixed** Fixed clear highlighted data after close popup in DataRangePicker.
- **Fixed** [TS] Fixed type direction for Flex.
- **Fixed** [TS] Fixed type position for Box.
- **Added** Add new icons 'MailOpen' and 'MailOutlineOpen'
- **Changed** Up version package focus-lock.
- **Fixed** [TS] Fixed types.
- **Changed** Rewrite code from ts to js.
- **Changed** Changed interception event of mouse for cursor in ScrollBar.
- **Changed** Call calculate position scroll when change size container
- **BREAK** change default height for Skeleton from 100px to 100%.
- **BREAK** remove support props visible, speed for Skeleton.
- **Fixed** Fixed typo in ts.
- **Changed** Rewrite code from ts to js.
- **Fixed** Fixed default color
- **Fixed** Fixed animation checked when opening in Popper.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** The style processing system has been changed.
- **Changed** Rewrite from TS to JS code.

## [8.0.0] - 2021-10-04

### @semcore/badge

- **Changed** Changed line-height value
- **Fixed** Fixed padding
- **Added** Added to release.
- **Changed** Fixed position table for fixed columns.
- **Changed** Added support property onResize for DataTable. Body.
- **Fixed** Fixed change displayedPeriod after change value for family pickers.
- **Changed** Changed WeekDay styles from uppercase to capital case
- **BREAK** removed deprecated property invisible.
- **BREAK** Changed animation Dot to @semcore/animation.
- **Changed** Added support keydown for draggable block in droppable zone.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Added** Added to release.
- **Changed** Updated the title, text and btnHome fields for the en locale in the PageNoData component.
- **Changed** Updated the title and btnHome fields for the en locale in the Maintenance component.
- **Changed** Updated the btnHome field for the en locale in the AccessDenied component.
- **Fixed** [ts] correct types.
- **Added** Add new icon 'BriefcaseAlt'
- **Changed** Changed overlay opacity from 80% to 60%
- **Changed** Changed overlay opacity for the second modal window from 20% to 40%
- **Fixed** Call calculate position scroll when change size container
- **Added** Added component Select. Option. Checkbox.
- **Fixed** Fixed the check for the presence of Select. Option.
- **Changed** Revert 'sideEffect=false' for more optimal build via webpack
- **Fixed** Fixed content alignment in cells

## [7.2.1] - 2021-08-26

### @semcore/select

- **Fixed** Fixed problem with 'sideEffect=false'

### Global

- **Changed** Add 'sideEffect=false' for more optimal build via webpack
- **Fixed** Fixed style separator when a custom font-size.
- **Fixed** [TS] added types for default values.
- **Fixed** Fixed set displayedPeriod for family pickers.
- **Fixed** Fixed typo in class names.
- **Fixed** Fixed placement warning tooltip for small screens.
- **Fixed** Changed height of the inner real input to fix horizontal display with adjacent elements.
- **Fixed** [TS] Fixed type onChange for ITextareaProps.
- **Changed** Changed height dropdown from 240px to 180px.

## [7.1.1] - 2021-08-09

### @semcore/badge

- **Changed** Changed line-height value
- **Fixed** [ts] correct types.
- **Fixed** [ts] correct types.
- **Fixed** [TS] fixed types.
- **Fixed** [ts] correct types.
- **Fixed** [ts] correct types.
- **Fixed** [ts] corrected types for Value, Addon in Pagination. PageInput.
- **Fixed** [ts] correct types.
- **Fixed** [ts] correct types.
- **Fixed** [ts] correct types.
- **Fixed** [ts] correct types.
- **Added** Added line-height value
- **Fixed** [ts] correct types.

## [7.1.0] - 2021-07-30

### @semcore/date-picker

- **Fixed** [TS] fixed types.
- **Fixed** Added styles for element today in Calendar.
- **Fixed** Fixed show title for MonthRangePicker.
- **Changed** Replace animation from package react-transition-group to @semcore/animation.
- **Fixed** Fixed set style which render useBox.
- **Changed** Remove from HTML for svg don't used attributes.
- **Changed** Added propsForElement for set props to svg.
- **Added** visible property can run in uncontrolled mode
- **Changed** Number of simultaneous notifications can be more than one
- **Changed** Updated version @semcore/spin-container.
- **Fixed** Fixed set value for Select. InputSearch.
- **Changed** [TS] Added type null for value prop in Select.
- **Changed** Fixed warning in console for InputSearch.

## [7.0.0] - 2021-07-12

### @semcore/accordion

- **Fixed** Add default type for generic value
- **Fixed** [TS] fixed export components.
- **Added** [A11Y] Added support to work Carousel. Next, Carousel. Prev with keyboard.
- **Added** [A11Y] Added support keyboard for sortable column.
- **Fixed** Сorrect access to properties from getters function
- **Fixed** Fixed animation Dot.
- **Changed** Changed tabIndex to 0 and styles for DropdowmMenu. Popper.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Replace animation from package `react-transition-group` to `@semcore/animation`.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] Rewrite code from TS to JS.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Rewrite code from TS to JS.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from ts to js.
- **Changed** [A11Y] added role for Window and aria-label for Close and Window.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [A11Y] added role for Alert and aria-label for Close.
- **BREAK** Replace animation package from react-transition-group to @semcore/animation
- **BREAK** Remove property offset and added Box inside NoticeBubbleContainer
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS.
- **Changed** [A11Y] added role for Alert and aria-label for Close.
- **Fixed** Add default type for generic value
- **Fixed** Fixed cjs build package.
- **Changed** Improved render performance
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS
- **Changed** Updated version `@semcore/spin-container`.
- **Fixed** Fixed set theme for Select. OptionCheckbox.
- **Fixed** Add default type for generic value
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **BREAK** Replace animation from package react-transition-group to @semcore/animation.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** [TS] rewrite code from TS to JS.
- **Fixed** Add default type for generic value
- **Fixed** Add default type for generic value
- **Added** [A11Y] Added support keyboard for sortable column.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Rewrite from TS to JS code.
- **Fixed** [TS] fixed types.

## [6.0.0] - 2021-06-21

- **Changed** Fix TS type
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Added** Added Venn chart.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Added support keydown arrows for choose date to calendar.
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Added** Support keydown Enter and Space for open Popper.
- **Added** Logic checked interactive trigger from DropdownMenu.
- **Fixed** Fix TS type
- **Fixed** Fix TS type
- **Changed** Moved logic for checking interactive trigger to Dropdown.
- **BREAK** Replaced internal representation with native input(type=number).
- **BREAK** Changed type for value to string.
- **Fixed** Fixed the js problem with the remainder of division.
- **Added** [A11Y] added aria-label for buttons in `InputNumber.Controls`
- **Changed** Fixed ts type for Pagination.
- **Changed** Added aria-label for child components FirstPage, PageInput
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Fixed** Fixed forwarding properties to the Box in Popper. Popper.
- **Fixed** Fixed set prop returnFocus for Focus-Lock
- **Fixed** Fix TS type
- **Fixed** [A11] Fixed set aria-pressed for Popper. Trigger.
- **Fixed** Fix TS type
- **Fixed** Fixed ts type for Select.
- **Fixed** Fixed paddings in InputSearch.
- **Changed** [A11Y] added `role="switch"` and support the Enter or Space key for used to toggle between a checked or unchecked
- **Changed** [TS] Rewrite code from TS to JS.
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** [TS] Rewrite code from TS to JS.
- **Added** [A11] Added aria-label for Timepicker. Hours, Timepicker. Minutes.
- **Added** Added tag-cloud illustration
- **Changed** Rewrite code from TS to JS 🧑‍💻

## [5.1.0] - 2021-05-25

- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Changed** Extended type for Root
- **Fixed** Fix TS type
- **Fixed** Fixed short display date for identity months for Trigger.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Added** Added the ability to add a root tag
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Fixed** Add type for handlers for render function
- **Fixed** Fix TS type
- **Fixed** Fix position arrow after change version popperjs.
- **Changed** Rewrite code from TS to JS 🧑‍💻
- **Fixed** Add import type for ResizeObserver
- **Changed** Version of dependence @semcore/core has been changed to 1.11.
- **Changed** Improved performance. Removed one component wrapper.
- **Changed** The style processing system has been changed.
- **Changed** Removed the ability to apply media styles via a plugin babel-plugin-react-semcore.
- **Fixed** Fixed animation
- **Changed** Rewrite code from TS to JS 👩‍💻
- **Changed** Rewrite code from TS to JS 🧑‍💻
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
- **Changed** Changed line-height value
- **Changed** Changed line-height value
- **Changed** Changed line-height value
- **Added** Added Root type for babel-plugin-root.
- **Added** Added a new system for processing styles.
- **Changed** Up version @semcore/notice in dependence for package.
- **Changed** Resized bullet points in li
- **Added** Added control with keyboard for all icons including prop interactive.
- **Added** Added new icon SharedToUser.
- **Changed** Changed line-height value
- **Added** Added line-height value
- **Changed** Changed media value to match breakpoints.
- **Changed** Changed media value to match breakpoints.
- **Changed** Changed line-height value
- **Added** Added functions setTrigger, setPopper in context for Popper.
- **Fixed** Fixed the setting of attributes in HTML.
- **Changed** Changed media value to match breakpoints.
- **Added** Added support accessibility.
- **Fixed** Fixed calculate size for Tabline. Item when value don't change.
- **Changed** Changed line-height value
- **Added** Added support accessibility.
- **Changed** Changed line-height value
- **Added** Added type="button" for controls TimePicker. Format.
- **Added** Added role tooltip
- **Added** Added function enhance a11yEnhance.
- **Changed** Changed breakpoints value.
- **Changed** Added processing forwardRef for assignProps.
- **Changed** Removed the ability to apply media variables.

## [4.0.0] - 2021-04-05

### @semcore/breadcrumbs

- **Fixed** Added aria-label for Breadcrumbs.
- **Fixed** Changed default tag li to div for wrap separator in Breadcrumbs. Item.
- **Changed** Optimized the code for venn chart.
- **Fixed** Fixed automatic set property flexBasis for DataTable. Column.
- **Added** Added support two languages Korean, Vietnamese.
- **Added** Added supported react@17.
- **Fixed** Fixed set weekStart for component Calendar. Now you can change weekStart for global object Ls.
- **Fixed** Fixed display if one day is selected and if the same month of a different year is selected.
- **Added** Added support two languages Korean, Vietnamese.
- **Fixed** [TS] Fixed type boxSize, value content-box set browser by default.
- **Fixed** [Box] Added change CSS styles after change value by props top, left, right, bottom.
- **Changed** Update icons Semrush, TwitterSemrush, FacebookSemrush, LinkedInSemrush.
- **BREAK** Removed global styles
- **BREAK** Removed styles for media queries.
- **BREAK** Replace animation package from react-transition-group to @semcore/animation
- **BREAK** Update property theme, now this property can get any themes
- **BREAK** Added property use
- **BREAK** Update icon for Notice. IconClose
- **Added** Added supported react-dom@17.
- **Added** Added support two languages Korean, Vietnamese.
- **Added** Added supported react-dom@17.
- **Added** Added support two languages Korean, Vietnamese.
- **Added** Added supported react-dom@17.
- **Fixed** Fixed color Cell for hover in Cell and Row with theme="default"
- **Changed** Changed view TimePicker. Format, now view don't have icons TimeNight, TimeDay.
- **Fixed** Update function opacity, now this function can set opacity for rgb color.
- **Changed** [TS] Update types interface IWithI18nEnhanceProps.
- **Added** Added support two languages Korean, Vietnamese.

## [3.0.0] - 2021-02-16

### @semcore/accordion

- **Changed** Update version package animation.
- **Fixed** Fixed bubbling call handlers onAnimationStart, onAnimationEnd from inside components.
- **Fixed** Fixed color spinner for ButtonTrigger.
- **Added** Initial release
- **Added** Added support touch event for change to slide.
- **Added** Added support control mod for change property index ``.
- **Added** Added style folder with CSS in build folder lib.
- **Fixed** [ts] fixed all types of components inside package.
- **Added** Added supported react@17.
- **Fixed** [ts] fixed types for function timeFormat.
- **Added** Added support custom enhancement.
- **Added** Added style folder with CSS in build folder lib.
- **Fixed** Removed calculation min width head and body because this is caused bugs.
- **Added** Added supported react@17.
- **Added** Added supported react@17.
- **BREAK** Change the responsive breakpoint from 992px to 1184px.
- **Added** Added alternative API for span and offset.
- **Added** Added breakpoint xs.
- **Added** Added new icon VideoStop.
- **Added** Added new color icon GitHub.
- **Added** Added new icon GoogleAnalytics4 for 4 version.
- **Fixed** Fixed type of second argument(event) for onChange prop
- **Changed** Changed mouse event from click to mouseup for stable performance.
- **Added** Added supported react-dom@17.
- **Added** Added supported react-dom@17.
- **Added** Added supported react-dom@17.
- **Fixed** Fixed to show components for tag in Select. Trigger, example <Select. Trigger tag={FilterTrigger}
- **Fixed** Updated padding to be better ☺️
- **Added** Added vars for media query.

## [1.2.1] - 2020-9-8

### Global

- **Fixed** Fixed possible styles collisions between components with different versions, but same styles
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Added** Added Divider auto size height for vertical orientation, this fixed show <Divider orientation="vertical"/> in flex
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Disabled focus trap, for support normal work interactive components when popper show.
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Fixed update value in input page, when update currentPage property
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json
- **Fixed** Flag sideEffects now contain list of files with side effects
- **Fixed** Added flag sideEffects: false to package.json

## [1.2.0] - 2020-9-2

### @semcore/core

- **Added** Добавлена возможность создавать generic-компоненты с помощью createComponent
- **Fixed** Исправлена типизация второго аргумента (handlers) render-функций компонентов
- **Fixed** Исправлено объединение prop-getter'ов потомка и родителя в рендер-функциях компонентов
- **Added** Добавили тип InputTagsSize для размеров компонента
- **Fixed** Поправили отображение для динамически меняющегося placeholder для InputTags. Value
- **Fixed** Поправили расположение по вертикали для InputTags. Value
- **Added** Добавлен generic, задающий тип value и аргументу ф-ции onChange
- **Fixed** Исправлен тип SelectValue
- **Fixed** Исправлена типизация второго аргумента (handlers) render-функции
- **Changed** Поднята версия @semcore/core до ^1.7
- **Fixed** Исправили баг в поведении uncontrolled режима при передаче checked в Switch. Value
- **Fixed** убрали возможность отображения ScrollArea. Bar по вертикали для Table. StickyHead. Это поведение считается недопустимым для шапки таблицы.
- **Added** Добавлено новое изображение deleted-page
- **Changed** Изменены изображения other-data, congrats

## [2.3.0] - 2020-12-4

### @semcore/carousel

- **Added** Release library

### @semcore/animation

- **Fixed** Fixed a bug in determining the height in Collapse.
- **Fixed** My little fix build 😬
- **Added** Added active invalid state.
- **Added** Add shared types.
- **Fixed** Replace special characters in column names because they apply as CSS variables.
- **Changed** Added warning for deprecated prop 'sticky'.
- **Changed** Replaced title prop with children parse for group column.
- **Added** Added new property: zIndex.
- **Changed** Moved flex property from Flex to Box.
- **Fixed** Fixed cursor position during tag editing
- **Fixed** Fixed set autofocus/focus for elements inside Modal.
- **Fixed** Fixed top margin of Notice. Actions
- **Fixed** Fixed disabled pills styles
- **Added** Added the ability to use one `with multiple`
- **Fixed** Fixed import paths from @popperjs.
- **Fixed** Refactor modifier arrowOffset that calculates arrow position.
- **Changed** Removed the display of the popper by focus when navigating from the keyboard, it caused many bugs 🤷‍♂️
- **Fixed** Fixed problem used ScrollArea for SSR.
- **Added** Added hidden input for correct work of forms
- **Fixed** Fixed export SelectOption
- **Fixed** Scroll to the first selected option in multiselect instead of the last
- **Changed** InputSearch moved out of Select
- **Fixed** Fixed move props position in component Box.

## [2.4.0] - 2020-12-18

### Global

- **Added** Added supported react@17.
- **Fixed** Fixed a bug in determining the height in Collapse.
- **Added** Release library
- **Fixed** Disabled flip behavior on container overflow
- **Fixed** Сomponent has become friendlier to SSR. Replace random generate number to get uid from function useUID.
- **Fixed** Сomponent has become friendlier to SSR. Replace random generate number to get uid from function useUID.
- **Fixed** Сomponent has become friendlier to SSR. Replace random generate number to get uid from function useUID.
- **Added** Added ResizeObserver for update style tab when used dynamic data.
- **Fixed** Uptimize animation change position active tab.
- **Fixed** Fixed show secondary theme for Table.
- **Added** Added enhance for set uid and useUID to set random numbers.

## [2.1.0] - 2020-11-9

- **Fixed** Added the placeholder for ID style tag to improve collision protection.
- **Fixed** Added null ts type for value.
- **Fixed** Added keyboard interaction for Toggle.
- **Added** Initial release
- **Added** Set min-width for Head and Body, which calculate from width Cell
- **Fixed** Set size width column in CSS variable Table
- **Fixed** Getting options from dayjs for current localization.
- **Added** Added new property: postion, top, left, right, bottom.
- **Added** Added new icon GlobeAlt.
- **Fixed** [TS] fixed types for ScrollArea. Bar. Slider
- **Changed** Update package flex-box.
- **Fixed** Fixed set indicator for Tabline. Item wrapped Tooltip.
- **Added** Added new warning theme

## [2.0.0] - 2020-10-16

- **Fixed** fixed wrong path for ES6 build
- **BREAK** Remove wrapper node for Accordion.
- **BREAK** Remove style for Trigger and rename in Toggle.
- **BREAK** Rename Content to Collapse.
- **BREAK** Remove margin for Chevron.
- **BREAK** Remove export AccordionItem.
- **BREAK** Remove prop selectedValues.
- **BREAK** Change animation way.
- **Added** Added generic for better value and onChange typings
- **Fixed** Bubbling event from interaction components inside Accordion. Item. Content for listener onChange in Accordion
- **Changed** Update @semcore/core version to ^1.8
- **Added** Add Collapse animation.
- **Fixed** Remove set CSS property max-width for Breadcrumbs. Item
- **Added** Added alternative API for inserting Addon.
- **Fixed** Fixed "any" types for some charts.
- **Fixed** Render label in Tooltip for first dot in chart.
- **Added** Added generic type PropGetterFn to describe prop-getters
- **Fixed** Fixed transfer of many arguments to handlers
- **Added** Add prop active for Row.
- **Changed** Changed type for prop sort.
- **Fixed** Add margin bottom for the block with periods
- **Fixed** TS property noDrop became not requered for IDraggableProps.
- **Fixed** Add missing TS type properties in context
- **Fixed** Fixed possible styles collisions between components with different versions, but same styles
- **Changed** Update @semcore/core version to ^1.8
- **Fixed** Fixed possible styles collisions between components with different versions, but same styles
- **Changed** Update @semcore/core version to ^1.8
- **Fixed** Fixed show two close icon in preview FullscreenModal
- **Fixed** Fixed offset right for FullscreenModal. Close
- **Added** Added new icon color/WhatsApp.
- **BREAK** Property placeholderChar, it is everything have to use `\_`, because mask show in value to input
- **Added** Manage cursor position for InputMask. Value with show mask
- **Added** Export function getAfterPositionValue. It use when need to know where last symbol of value.
- **Fixed** Show mask for InputMask. Value when size input less than size mask
- **Added** Added alternative API for inserting Addon.
- **Fixed** generate CSS without collapsing property margin
- **Added** Added alternative API for inserting Addon.
- **Added** Added generic for better value and onChange typings
- **Changed** Update @semcore/core version to ^1.8
- **Added** Added generic for better value and onChange typings
- **Changed** Update @semcore/core version to ^1.8
- **Changed** Update dependency package @popperjs/core version from 2.4.0 to 2.5.3
- **Fixed** Fixed getting the last argument(event) in the handler(onChange)
- **Fixed** Fixed call onClose when used for click on page with SidePanel. Panel in inside ``.
- **Added** Added alternative API for inserting Addon.
- **Added** Added generic for better value and onChange typings
- **Added** Animation for change position active Tab.
- **Changed** Update @semcore/core version to ^1.8
- **Added** Added alternative API for inserting Addon.
- **Added** Added generic for better value and onChange typings
- **Changed** Update @semcore/core version to ^1.8
- **Added** Added alternative API for inserting Addon.
- **Changed** Removed neighbor-location package dependency
- **Fixed** Fixed possible styles collisions between components with different versions, but same styles
- **Fixed** Set props fontSize, lineHeight for componentText. Now it independent from prop size.
- **Fixed** Problem use prop noWrap for List. Item. Now text reduce in ellipsis for ``
- **Fixed** Revert move .d.ts files because TypeScript does not see types on import.
- **Fixed** Change "any" type for createHoc function
- **Changed** Build changed from rollup to babel
- **Changed** Move .d.ts files from /lib to /lib/types directory

## [1.1.0] - 2020-08-18

### @semcore/base-trigger

- **Added** Добавили новый триггер LinkTrigger
- **Added** Добавили состояние loading для ButtonTrigger
- **Fixed** Исправлен warning компонента Legend о не валидных атрибутах, попадающих на DOM-элемент
- **Added** Счетчик – это элемент, который показывает количество.
- **Fixed** Поправили установку курсора в поле ввода
- **Changed** Логика по отключению скролла страницы перенесена в хук usePreventScroll
- **Changed** Поднята версия @semcore/utils
- **Fixed** Поправили рендер NoticeBubbleWarning при инициализации через NoticeBubbleManager
- **Changed** Добавлен line-height для Addon для корректного выравнивания при использовании текста(например счетчика).
- **Added** Зависимость от neighbor-location для обнуления расположения соседних элементов внутри Popper. Popper.
- **Fixed** Исправлены ts типы для offset
- **Changed** Убрали overflow: hidden с ScrollArea, это свойство не использовалось.
- **Added** SidePanel — компонент для отображения выезжающей панели (справа, снизу или слева). Иногда зовем его " шторкой"
- **Added** Добавили box-sizing: border-box для таблицы, это решило проблему отображения скролла, когда контента не много
- **Fixed** Исправили отображение активной ячейки th
- **Fixed** Исправили выравнивание контента в ячейках через свойство textAlign
- **Changed** Переписали стили со встраиваемого CSS in JS на новый синтаксис, такой же как у всех компонентов
- **Fixed** Исправлены не работающие props fontSize и lineHeight у компонента Text
- **Added** Добавлена функция brightness в color для вычисления контраста
- **Added** Добавлен hook usePreventScroll, блокирующий скролл страницы
- **Added** Добавилась возможность передавать ref в element для useEventListener.

## [0.0.1] - 2020-07-27

### Global

- **Added** Initial release
