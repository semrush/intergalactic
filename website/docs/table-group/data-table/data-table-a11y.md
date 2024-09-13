---
title: DataTable
tabs: Design('data-table'), Example('data-table-code'), API('data-table-api'), A11y('data-table-a11y'),  Changelog('data-table-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                                                   | Function                                                                                                                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`                                                 | Moves focus to the next focusable element.                                                                                                                 |
| `Shift + Tab`                                         | Moves focus to the previous focusable element.                                                                                                             |
| `Left Arrow`, `Right Arrow`, `Up Arrow`, `Down Arrow` | Move the focus across the grid of table cells.                                                                                                             |
| <nobr>`Up Arrow`</nobr>, <nobr>`Down Arrow`</nobr>    | Moves selection between the list options in the dropdown. If selection is on the last/first option, moves selection to the first/last option respectively. |
| `Enter`                                               | Activates interactive elements inside the table grid.                                                                                                      |

### Roles & attributes

The following list describes roles and attributes that component already has.

| Component / element               | Role / Attribute                        | Usage                                                                                                                                                                                                                                                                                                             |
| --------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DataTable`                       | `grid`                                  | Identifies the element that serves as the grid widget container. The `grid` element isn't focusable because it implements the practice described in the section on [Managing Focus Within Components Using a Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex). |
|                                   | `aria-label`                            | Defines the accessible name of a table without visible text.                                                                                                                                                                                                                                                      |
|                                   | `aria-labelledby="ID_REF"`              | Refers to the heading element that labels the `grid`.                                                                                                                                                                                                                                                             |
|                                   | `aria-rowcount`                         | Defines the total number of rows in the `grid`.                                                                                                                                                                                                                                                                   |
|                                   | `aria-colcount`                         | Defines the total number of columns in the `grid` when not all columns are present in the DOM.                                                                                                                                                                                                                    |
| `DataTable.Head`, `DataTable.Row` | `row`                                   |                                                                                                                                                                                                                                                                                                                   |
|                                   | `aria-rowindex="INDEX_VALUE"`           | Defines an element's position with respect to the total number of rows within the `grid`.                                                                                                                                                                                                                         |
| `DataTable.Head`                  | `aria-sort="ascending/descending/none"` | This attribute is set to a specific value when a column is sorted in ascending or descending order, or when it’s sortable but not yet sorted.                                                                                                                                                                     |
| `DataTable.Column`                | `columnheader`                          | Identifies an element as being a cell in a row contains header information for a column, similar to the native `<th>` element with column scope.                                                                                                                                                                  |
| `DataTable.Cell`                  | `gridcell`                              | Identifies a cell in a `grid` or `treegrid`. It's intended to mimic the functionality of the HTML `<td>` element for table-style grouping of information.                                                                                                                                                         |
|                                   | `aria-colindex="INDEX_VALUE"`           | Defines an element's column index or position with respect to the total number of columns within the `grid`.                                                                                                                                                                                                      |

## Considerations for designers

If you need to show different states of the table rows or cells, please don’t rely solely on color to convey information. Add some non-color visual indicator of the state, such as text or an icon with appropriate alternative text into the cells.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).

## Automated screen reader testing

<!--@include: ./data-table-a11y-report.md-->
