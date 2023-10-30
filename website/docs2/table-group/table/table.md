---
title: Table principles
fileSource: table
tabs: Design('table'), A11y('table-a11y'), Example('table-code')
---

## Description

**Table** is a complex component for providing a complex data list.

## Appearance

### Types

There are two types of tables in our design system – [primary](/table-group/table-primary/table-primary) and [secondary](/table-group/table-secondary/table-secondary). Colors of both are based on the `gray` palette.

### Common styles for the table content

Table: Common styles for the table content

| Content                                | Styles                                     |
| -------------------------------------- | ------------------------------------------ |
| Text in the header                     | `font-size: var(--fs-100)`, `color: var(--text-primary)` |
| The text in the row                    | `font-size: var(--fs-200)`, `color: var(--text-primary)` |
| Secondary text                         | `color: var(--text-secondary)`                  |
| Stand alone icon                       | icon with M size, `color: var(--icon-secondary-neutral)`    |
| The icon next to the text              | icon with M size, `color: var(--icon-secondary-neutral)`    |
| Checkbox in the header and in the cell | [Checkbox](/components/checkbox/checkbox) with M size  |

## Sorting

::: tip
For detailed information about sorting columns in the table, see [Table controls](/table-group/table-controls/table-controls).
:::

## Tooltip

The column header shouldn't contain the `Info` icon. Show additional information about the column in the tooltip by hovering over the column title.

### Conditions for the tooltip appearance

Table: Conditions for the tooltip appearance

|                                                          | Appearance example                       |
| -------------------------------------------------------- | ---------------------------------------- |
| If the text is too long, and collapsed into an ellipsis. | ![](static/tooltip-1.png)         |
| If the column has additional (explanatory) information.  | ![](static/tooltip-2.png) |

## Table row states

::: tip
**Hover on a row is required for all types of tables.**
:::

Hover is needed to "highlight" information in vast volumes of data, with which you would like to perform some action (read, delete, open, etc.).

- The row changes its state to `hover` when you hover over any area of the row.
- Thus, if the pointer is positioned over an item, hover remains on the row, and also the hover of the element on which the cursor is pointed is applied.

![](static/tr-hover-all.png)

### Hover styles for different cells

The table colors are based on `gray` palette.

If the entire row is in the `disabled` state, it shouldn't have the `hover` state.

::: tip
Consider using the darker icon colors to increase contrast when using colored cell backgrounds. For instance, switch it from `--icon-secondary-neutral` to `--icon-primary-neutral`.
:::

Table: Hover styles for different cells

| State                    | Appearance                                   | Styles                                                                                                                                                                          |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default, hover           | ![](static/default-hover.png)   | `background-color: var(--table-td-cell); border-bottom: 1px solid var(--border-secondary)`. When you `hover` on, background color changes to `background: var(--table-td-cell-hover)`. |
| Unread, unread hover     | ![](static/unread-hover.png)     | `background-color: var(--table-td-cell-unread)`. The `hover` state is the same as default cell has.                                                                                                |
| Selected, selected hover | ![](static/selected-hover.png) | `background-color: var(--table-td-cell-selected)`. When you `hover` on, the background color changes to `background-color: var(--table-td-cell-selected-hover)`.                                                              |
| New, new hover           | ![](static/new-hover.png)           | `background-color: var(--table-td-cell-new)`. When you `hover` on, the background color changes to `background-color: background-color: var(--table-td-cell-new-hover)`.                                          |
| Error, error hover       | ![](static/danger-hover.png)     | `background-color: var(--table-td-cell-critical)`. When you `hover` on, the background color changes to `background-color: var(--table-td-cell-critical-hover)`.                                                                |
| Warning, warning hover   | ![](static/warning-hover.png)   | `background-color: var(--table-td-cell-warning)`. When you `hover` on, the background color changes to `background-color: var(--table-td-cell-warning-hover)`.                                                          |
| Current, current hover   | ![](static/current-hover.png)   | The row is tagged with tag `You`. The `hover` state is the same as the `default` state.                                                                                         |
| Loading                  | ![](static/loading-hover.png)   | Change opacity of the elements inside a row to `--disabled-opacity`. Spin has size XS.                                                                                                                           |
| Limit, limit hover       | ![](static/limit.png)                   | For limiting rows use `--overlay-limitation-secondary` token. The `hover` state is the same as the default state has.                                                |

### Hover for the row-span and col-span

- When you `hover` over the parent column, all child rows are highlighted.
- When you `hover` over the child row, the parent column is highlighted.

### Cells coloring

If the cell was colored, it remains colored when you hover over it. The user shouldn't lose information about the color of the cell when hovering over a row.

![](static/td-style-hover.png)

## Content alignment inside a cell

The text inside the cells in the rows and in the header is aligned according to the following rules.

### Left-aligned

![](static/table-left.png)

- Text
- The link (URL)
- Keyword
- Code/Number/Hash (text consisting of numbers, symbols, and letters)
- Abbreviation
- Date
- Control element
- Button
- Select
- Tag/Badge
- Icons (if several, SERP features)

### Center-aligned

![](static/table-center.png)

- Number (if needed to compare horizontally)
- Icon (if single)
- Particular character
- Image

### Right-aligned

![](static/table-right.png)

- Number (if needed to compare vertically)
- Fractional number
- Tag/badge (in cases where the entire row is marked)

## Horizontal scroll

Horizontal scroll in our tables is needed in order to indicate the presence of hidden data behind the viewport in a large-width table.

In this case, it appears when:

- all table columns don’t fit the viewport;
- when you add a new column to a table from the settings manager, the table data will no longer fit in the viewport;
- the screen, on which the user views the report is smaller than 992px.

::: tip
It isn’t a bad practice, when a large table has a horizontal scroll – this is a familiar experience for most users (refer to Excel). It is wrong, when adding columns to a table makes them incredibly narrow, but without the need for scrolling.
:::

![](static/scroll-horizontal.png)

## Pagination

See the detailed recommendations in the [Table controls](/table-group/table-controls/table-controls#acbb81) guide.

## Table states

About table states read in a particular notable document [Table states](/table-group/table-states/table-states).

