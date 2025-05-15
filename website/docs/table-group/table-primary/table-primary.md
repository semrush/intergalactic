---
title: Primary table
fileSource: data-table
tabs: Design('table-primary'), Example('table-primary-code')
---

## Description

**Primary table** is the foundational table type for displaying large data volumes and complex functionality.

## Appearance

### Paddings

In the primary table, whether it's a header or a row, cells use `--spacing-3x` token for padding.

![](static/primary-paddings.png)

You can also make a cell more compact by using the `compact` property, which reduces the left and right paddings to `--spacing-2x`.

![](static/primary-compact-paddings.png)

### Styles

::: tip
Content inside header cells and rows is always aligned to the top.
:::

Table: Primary table styles

| Description                     | Appearance                                | Styles                                                                        |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| Header                         | ![](static/th-styles.png)        | `background-color: var(--table-th-primary-cell)`, `border-bottom: 1px solid var(--border-secondary)` |
| Header of the scrollable table | ![](static/th-styles-scroll.png) | When scrolling a page with a table, the header shouldn't have a shadow.      |
| Default row                     | ![](static/td-default.png)      | `border-bottom: 1px solid var(--border-secondary)`                                   |
| The last line of the accordion  | ![](static/accordion.png)  | `border-bottom: 1px solid var(--table-td-cell-accordion)`                                   |

## Multi-level header

In some cases, a header may comprise two or more rows. To maintain consistency:

- The title of the merged column should always be center-aligned.
- Sorting is not available for the parent header cells in multi-level headers.

![](static/two-row-head.png)

In other cases, when space is limited, wrap text to the next line within the cell.

![](static/two-row-name-head.png)

## Table header states

Table: Table header states

| State  | Appearance                | Tokens                                                    |
| ------ | ------------------------- | --------------------------------------------------------- |
| Hover  | ![](static/th-hover.png)  | Use `--table-th-primary-cell-hover` for background color. |
| Sorted | ![](static/th-styles.png) | Use `--table-th-primary-cell-active` for background color.|

## Row states

For more information, refer to the general [DataTable](/table-group/data-table/data-table#table-row-states) guide.
