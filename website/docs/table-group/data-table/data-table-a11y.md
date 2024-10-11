---
title: DataTable
tabs: Design('data-table'), A11y('data-table-a11y'), API('data-table-api'), Example('data-table-code'), Changelog('data-table-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                                                   | Function                                                        |
|-------------------------------------------------------| --------------------------------------------------------------- |
| `Tab`                                                 | Moves focus to the next focusable element outside of the table. |
| `Shift + Tab`                                         | Moves focus to the previous focusable element.                  |
| `Left Arrow`, `Right Arrow`, `Up Arrow`, `Down Arrow` | Moves focus across the grid of table cells.                     |
| `Enter`                                               | Activates interactive elements inside the table grid.           |

### Roles & attributes

The following list describes roles and attributes that component already has.

| Component / element               | Role / Attribute                   | Usage                                                                                                                                                                                                                                                                                                             |
| --------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DataTable`                       | `role="grid"`                      | Identifies the element that serves as the grid widget container. The `grid` element isn't focusable because it implements the practice described in the section on [Managing Focus Within Components Using a Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex). |
|                                   | `aria-rowcount="SOME_VALUE"`       | **Applied when not all rows are present in the DOM**. Defines the total number of rows in the `grid`.                                                                                                                                                                                                             |
|                                   | `aria-colcount="SOME_VALUE"`       | **Applied when not all columns are present in the DOM**. Defines the total number of columns in the `grid`.                                                                                                                                                                                                       |
| `DataTable.Head`, `DataTable.Row` | `role="row"`                       | Identifies a row of cells within a tabular structure. A `row` contains one or more grid cells or column headers, and possibly a row header, within a `grid`.                                                                                                                                                      |
|                                   | `aria-rowindex="INDEX_VALUE"`      | **Applied when not all rows are present in the DOM**. Defines an element's position with respect to the total number of rows within the `grid`.                                                                                                                                                                   |
| `DataTable.Head`                  | `aria-sort="ascending/descending"` | This attribute is set to a specific value when a column is sorted in ascending or descending order.                                                                                                                                                                                                               |
| `DataTable.Column`                | `role="columnheader"`              | Identifies an element as a column header cell, similar to the native `<th>` element with column scope.                                                                                                                                                                                                            |
| `DataTable.Cell`                  | `role="gridcell"`                  | Identifies a cell in a `grid` or `treegrid`. It's intended to mimic the functionality of the HTML `<td>` element for table-style grouping of information.                                                                                                                                                         |
|                                   | `aria-colindex="INDEX_VALUE"`      | **Applied when not all columns are present in the DOM**. Defines an element's column index or position with respect to the total number of columns within the `grid`.                                                                                                                                             |

## Considerations for developers

### Attributes

The following list will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Component / element | Attribute                  | Usage                                                           |
| ------------------- | -------------------------- | --------------------------------------------------------------- |
| `DataTable`         | `aria-label`               | Defines the accessible name of a table without a visible title. |
|                     | `aria-labelledby="ID_REF"` | Refers to the heading element that labels the `grid`.           |

## Considerations for designers

If you need to show different states for table rows or cells, avoid relying only on color. Add a visual indicator, like text or an icon with alt text, inside the cells.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).

## Automated screen reader testing

<!--@include: ./data-table-a11y-report.md-->
