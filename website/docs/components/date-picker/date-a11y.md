---
title: DatePicker
fileSource: date-picker
a11y: AA
tabs: Design('date-picker'), A11y('date-a11y'), API('date-api'), Example('date-code'), Changelog('date-changelog')
---

## What component has

- If the dropdown with the calendar grid opens, then a current date gets the focus.
- If a date is selected, the accessible name of the "Date field" input is updated to include the selected date.

### Keyboard support

Table: Keyboard support

| Key                         | Function                                                                                                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                       | Moves focus to next element in the dropdown `Tab` sequence. If focus is on the last button (specifically "OK"), moves focus to the first button (specifically Previous Year).             |
| `Shift + Tab`               | Moves focus to previous element in the dialog `Tab` sequence. If focus is on the first button (specifically Previous Year), moves focus to the last button (specifically "OK").           |
| `Enter` , `Space`           | Open the date picker dropdown. Move focus to selected date, specifically the date displayed in the date input text field. If no date has been selected, places focus on the current date. |
| `ESC`                       | Closes the dialog and returns focus to the trigger.                                                                                                                                       |
| `Up Arrow`, `Down Arrow`    | Moves focus to the same day of the previous or next week, respectively.                                                                                                                   |
| `Left Arrow`, `Right Arrow` | Moves focus to the previous or next day, respectively.                                                                                                                                    |

### Roles and attributes

The following list describes roles and attributes that component already has.

#### Trigger

Table: Trigger roles and attributes

| Component / element                         | Role / Attribute                                                               | Usage                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `DatePicker.Trigger`                        | `aria-label="Date field"`                                                      | Defines the accessible name.                                                                                   |
|                                             | `aria-controls="IDREF"`                                                        | Indicates which element this trigger opens.                                                                    |
| <nobr>`DatePicker.Trigger` > `input`</nobr> | `aria-haspopup="dialog"` and inherits `aria-controls="IDREF"` from its parent. | `aria-haspopup` indicates that the element triggers a dialog.                                                  |
|                                             | `aria-expanded="false/true"`                                                   | Indicates whether the dialog is open or not.                                                                   |
|                                             | `role="combobox"`                                                              | Identifies the element as a combobox—a text input combined with a list of options.                             |
|                                             | `aria-describedby="IDREF"`                                                     | Provides the input with an accessible description by linking to a hint that explains the required data format. |

#### Popper and its content

Table: Roles and attributes of Popper and its content.

| Component / element      | Role / Attribute               | Usage                                                                                                                       |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `DatePicker.Popper`      | `role="dialog"`                | Identifies the element as a dialog, indicating that its content is grouped and separated from the rest of the page content. |
| `DatePicker.Prev`        | `aria-label="Previous period"` | Defines the accessible name for the button.                                                                                 |
| `DatePicker.Next`        | `aria-label="Next period"`     | Defines the accessible name for the button.                                                                                 |
| `DatePicker.Title`       | `aria-live="polite"`           | Indicates that assistive technologies should automatically announce the displayed month and year when they change.          |
| `DateRangePicker.Period` | `role="listbox"`               | Identifies an element that creates a list from which a user may select one or more static items.                            |

#### Calendar and days units

Table: Calendar days units' roles and attributes

| Component / element                                                          | Role / Attribute                                                         | Usage                                                                                                                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DatePicker.Calendar`, `MonthPeaker.Calendar`, `DatePicker.Calendar` > `div` | `role="grid"`                                                            | Identifies the calendar as a grid widget.                                                                                                                             |
| `CalendarDays.Unit`                                                          | `role="gridcell"`                                                        | Identifies a cell in the grid. It's intended to mimic the functionality of the HTML `<td>` element.                                                                   |
|                                                                              | `aria-label` is created from `gridcell`'s content and `DatePicker.Title` | Defines the accessible name for the cell.                                                                                                                             |
|                                                                              | `aria-selected="true/false"`                                             | Indicates the cell or a number of cells is selected or not.                                                                                                           |
|                                                                              | `aria-disabled="false"`                                                  | **Applies to `gridcell` with `disabled` prop.** Indicates that the element is perceivable but disabled, so it's not operable.                                         |
|                                                                              | `aria-colindex="INDEX_VALUE"`                                            | **Applied when not all columns are present in the DOM**. Defines an element's column index or position with respect to the total number of columns within the `grid`. |
|                                                                              | `aria-rowindex="INDEX_VALUE"`                                            | **Applied when not all rows are present in the DOM**. Defines an element's position with respect to the total number of rows within the `grid`.                       |
| `CalendarWeekDays`                                                           | `role="row"`                                                             | Identifies a row of cells within a tabular structure. A `row` contains one or more grid cells or column headers, within a `grid`.                                     |
| `CalendarWeekDays.Unit`                                                      | `role="columnheader"`                                                    | Identifies an element as a column header cell, similar to the native `<th>` element with column scope.                                                                |

<!-- ## Considerations for developers

### Attributes

The following list will help you to keep in mind the necessary roles and attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Component                                   | Attribute                  | Usage |
| ------------------------------------------- | -------------------------- | ----- |
| <nobr>`DatePicker.Trigger` > `input`</nobr> | `aria-describedby="IDREF"` |       | -->

## Resources

- [W3 date picker example](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html) has detailed information about the accordion accessible behavior.
- Find live examples of accessible inputs with different types in [DigitalA11y project](https://www.digitala11y.com/demos/accessibility-of-html-input-types-examples/).

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).

<!--@include: ./date-a11y-report.md-->
