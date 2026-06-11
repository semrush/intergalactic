---
title: DataTable
tabs: Design('data-table'), A11y('data-table-a11y'), API('data-table-api'), Examples('data-table-code'), Changelog('data-table-changelog')
---

## What component has

### Keyboard support

Table: Keyboard support

| Key                                                   | Function                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`, `Shift + Tab`                                  | Moves focus to and out of the table. When focusing the table for the first time, the first body cell is focused. If user navigates within the table, the last focused cell is remembered, and is focused automatically when user returns to the table. <br><br>The table as a whole isn't focusable, using the [roving tabindex pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents). |
| `Left Arrow`, `Right Arrow`, `Up Arrow`, `Down Arrow` | Moves focus across the grid of table cells.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Enter`, `Space`                                      | Activates interactive elements inside the table grid.                                                                                                                                                                                                                                                                                                                                                                                       |

### Roles & attributes

The following list describes roles and attributes that the component already has.

#### DataTable

| Attribute             | Usage                                                                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `role="grid"`         | Identifies the element as a grid widget.                                                                                                                        |
| `aria-rowcount="NUM"` | Indicates the number of currently present rows in the `grid`. Recalculated on each accordion collapse/expand. Rows inside collapsed accordions aren't included. |
| `aria-colcount="NUM"` | Indicates the total number of columns in the `grid`.                                                                                                            |

#### DataTable.Head

| Attribute           | Usage                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------- |
| `role="row"`        | Identifies the element as a row within a grid.                                                |
| `aria-rowindex="1"` | Indicates the row's index within the table, starting with `1` and including `DataTable.Head`. |

#### DataTable.Head.Column

| Attribute                          | Usage                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `role="columnheader"`              | Identifies an element as a column header cell, similar to the native `<th>` element with column scope.                    |
| `aria-sort="ascending/descending"` | Indicates whether the column is sorted in ascending or descending order.                                                  |
| `aria-describedby="PARENT_ID"`     | **Only for grouped columns.** Provides an accessible description for the nested header by referring to the parent header. |
| `aria-describedby="SORTABLE_ID"`   | **Only for sortable columns.** Provides the `"sortable"` accessible description for the column header.                    |

#### DataTable.Body.Row

| Attribute             | Usage                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `role="row"`          | Identifies the element as a row within a grid. A `row` may contain body cells with an optional row header, or column headers.                                                              |
| `aria-rowindex="NUM"` | Indicates the index of the row within the table, starting with `1` and including `DataTable.Head`. Indexes are recalculated when accordions are expanded or collapsed, or page is changed. |
| `aria-level="NUM"`    | **Only inside an accordion containing grid data.** Indicates the row's nesting level within the grid, starting with `2`. This attribute is ommited for first-level rows.                   |
| `aria-posinset="NUM"` | **Only inside an accordion containing grid data.** Indicates the row's index within the accordion, starting with `1`.                                                                      |

#### DataTable.Body.Cell

| Attribute                                  | Usage                                                                                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `role="gridcell"`                          | Identifies a cell in a `grid`. It's intended to mimic the functionality of the HTML `<td>` element for table-style grouping of information.                                    |
| `aria-colindex="NUM"`                      | Indicates the cell's column index within the `grid`, starting with `1`.                                                                                                        |
| `aria-rowspan="NUM"`, `aria-colspan="NUM"` | **Only for merged cells.** Indicates how many rows or columns the cell spans across.                                                                                           |
| `aria-level="NUM"`                         | **Only inside an accordion containing non-grid data.** Indicates the cell's nesting level within the grid, starting with `2` (the attribute is ommited for first-level items). |
| `aria-posinset="1"`, `aria-setsize="1"`    | **Only inside an accordion containing non-grid data.** Indicates that the cell with the accordion content is the only cell in its row.                                         |

#### AccordionToggle

| Attribute                                | Usage                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `aria-label="Show details/Hide details"` | Provides an accessible name for the accordion toggle button.                                                                                                   |
| `aria-describedby="PARENT_ID"`           | Provides an accessible description for the accordion toggle button by referring to the cell containing the button.                                             |
| `aria-controls="ROWGROUP_ID"`            | **Only when accordion is expanded.** Indicates which element is controlled by the accordion toggle button by referring to the `rowgroup` inside the accordion. |
| `aria-expanded="true/false"`             | Indicates whether the accordion is expanded or collapsed.                                                                                                      |

#### Checkbox

| Attribute                        | Usage                                                                                                    |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `aria-label="All items"`         | Provides an accessible name for the checkbox in the table header.                                        |
| `aria-labelledby="NEXT_CELL_ID"` | Provides an accessible name for the checkbox in the table body by referring to the next cell in the row. |

### ARIA live messages

| Message                                          | Usage                                                        |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `"All items selected"`, `"All items deselected"` | Notifies the user that all rows were selected or deselected. |

## Considerations for developers

### Attributes

The following list will help you to keep in mind the necessary attributes to make our components fully accessible in the particular cases in your interfaces.

Table: Attributes

| Attribute                                              | Usage                                                                                                                                                                                                               |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>`aria-labelledby="IDREF"`</nobr> or `aria-label` | **Required.** Use to define the accessible name of the table.                                                                                                                                                       |
| `aria-busy="true/false"`                               | Indicates that some parts of the content haven't finished loading and assistive technology should wait before announcing updates. Use it if the table has several ARIA live regions that can update simultaneously. |

## Considerations for designers

If you need to show different states for table rows or cells, avoid relying only on color. Add a visual indicator, like text or an icon with alt text, inside the cells.

## Other recommendations

For more accessibility recommendations, refer to the common [Accessibility guide](/core-principles/a11y/a11y).
