---
title: DataTable
fileSource: data-table
tabs: Design('data-table'), A11y('data-table-a11y'), API('data-table-api'), Example('data-table-code'), Changelog('data-table-changelog')
---

## Description

**DataTable** is a complex component designed for managing complex data grids.

## Appearance

### Types

Our design system has two table types:

1. **Primary table** is the foundational table type for displaying large data volumes and complex functionality.
![](static/table-left.png)
2. **Secondary table** is designed for displaying small amounts of data in a compact way in [cards](/components/card/card). Interactive features, such as accordions and checkboxes, should be avoided. Showing [non-interactive sorting indicators](../table-controls/table-controls#sorting-in-secondary-table) is preferred over fully functional sorting.
![](static/secondary-table.png)

### Variants

#### Compact

You can make a primary table more compact by using the `compact` property, which reduces left and right cell paddings to `--spacing-2x`.

![](static/primary-compact-paddings.png)

#### Table in Card

When displaying a primary and secondary table in a card, use the `variant="card"` property. It increases the left and right table paddings to `--spacing-5x` and remove the bottom border of the last row. Find more details in the [Card layout for table example](../../components/card/card-code#card-layout-for-tables).

![](static/table-in-card.png)

### Table content styles

Table: Common styles for table content

| Content                                     | Styles and tokens                                                                                                      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Primary text                                | Use `--fs-200` and `--lh-200` tokens for font-size and line-height respectively, and `--text-primary` token for color. |
| Secondary text                              | Use `--text-secondary` token for color.                                                                                |
| Icon, either next to the text or standalone | Use M size and `--icon-secondary-neutral` token for color.                                                             |

## Table header

### Tooltip

You can use [Tooltip](../../components/tooltip/tooltip.md) to display additional information about a column.

![](static/tooltip.png)

### Long titles

By default, long column titles wrap to the next line.

![](static/header-text-wrap.png)

Alternatively, if the space is limited, you can disable text wrap and truncate the title with [ellipsis](../../utils/ellipsis/ellipsis), showing the full text on hover.

![](static/hint.png)

### Sticky header

You can make the table header `sticky`, so that it stays visible when scrolling long tables.

::: tip
Sticky header shouldn't have a shadow during scrolling.
:::

![](static/th-styles-scroll.png)

### Multi-level header

Column headings can be grouped, resulting in a multi-level table header.

![](static/two-row-head.png)

## Sorting

For detailed information on sorting columns in the table, refer to [Table controls](/table-group/table-controls/table-controls#sorting).

## Row states

Hovering highlights information in large data volumes, making it easier to perform actions such as reading, deleting, or opening.

- The row changes to the `hover` state when you hover over any part of it.
- If the cursor is over an item, the row remains in the `hover` state, and the item under the cursor is also highlighted.

![](static/tr-hover-all.png)

### Hover styles for different cells

If an entire row is in the disabled state, it shouldn't have a hover state.

::: tip
Consider using darker icon colors to increase contrast when using colored cell backgrounds. For instance, switch from `--icon-secondary-neutral` to `--icon-primary-neutral`.
:::

Table: Hover styles for different cells

| State                    | Appearance                     | Styles                                                                                                                                                                                 |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default, hover           | ![](static/default-hover.png)  | `background-color: var(--table-td-cell); border-bottom: 1px solid var(--border-secondary)`. When you `hover` on, background color changes to `background: var(--table-td-cell-hover)`. |
| Unread, unread hover     | ![](static/unread-hover.png)   | `background-color: var(--table-td-cell-unread)`. The `hover` state is the same as default cell has.                                                                                    |
| Selected, selected hover | ![](static/selected-hover.png) | `background-color: var(--table-td-cell-selected)`. When you `hover` on, the background color changes to `background-color: var(--table-td-cell-selected-hover)`.                       |
| New, new hover           | ![](static/new-hover.png)      | `background-color: var(--table-td-cell-new)`. When you `hover` on, the background color changes to `background-color: background-color: var(--table-td-cell-new-hover)`.               |
| Error, error hover       | ![](static/danger-hover.png)   | `background-color: var(--table-td-cell-critical)`. When you `hover` on, the background color changes to `background-color: var(--table-td-cell-critical-hover)`.                       |
| Warning, warning hover   | ![](static/warning-hover.png)  | `background-color: var(--table-td-cell-warning)`. When you `hover` on, the background color changes to `background-color: var(--table-td-cell-warning-hover)`.                         |
| Current, current hover   | ![](static/current-hover.png)  | The row is tagged with tag `You`. The `hover` state is the same as the `default` state.                                                                                                |
| Loading                  | ![](static/loading-hover.png)  | Change opacity of the elements inside a row to `--disabled-opacity`. Spin has size XS.                                                                                                 |
| Limit, limit hover       | ![](static/limit.png)          | For limiting rows use `--overlay-limitation-secondary` token. The `hover` state is the same as the default state has.                                                                  |

### Hover and merged cells

- hovering over a child row highlights the parent cell
- hovering over the parent cell highlights all child rows

![](static/merged-hover.png)

### Cell coloring

If a cell is colored, it remains colored when you hover over it. Users shouldn't lose information about the cell's color when hovering over a row.

![](static/td-style-hover.png)

## Cell content alignment

**Vertical alignment:** both table header and body cell content is always aligned to the top.

**Horizontall alignment:** align cell content both in the header and the body according to the following rules.

### Left-aligned

![](static/table-left.png)

- Text
- Link (URL)
- Keyword
- Code/Numbers/Hashes (text consisting of numbers, symbols, and letters)
- Abbreviation
- Date
- Control element
- Button
- Select
- Tag/Badge
- Icons (if multiple, SERP features)

### Center-aligned

![](static/table-center.png)

- Numbers (if horizontal comparison is needed)
- Icon (if single)
- Particular character
- Image

### Right-aligned

![](static/table-right.png)

- Numbers (if vertical comparison is needed)
- Decimal numbers
- Tags/Badges (when marking the entire row)

## Horizontal scroll

The most common case is a scroll bar shown at the bottom of the table. Horizontal scrolling in our tables indicates hidden data beyond the viewport in wide tables. It's needed when:

- All table columns don't fit the viewport.
- Adding a new column from the settings manager makes the table data exceed the viewport.
- The screen where the user views the report is smaller than 992px.

::: tip
Having a horizontal scroll in a large table isn't a bad practice; it's a familiar experience for most users (similar to Excel). Avoid making columns too narrow trying to fit them all on the screen, as it can make data less readable.
:::

![](static/scroll-horizontal.png)

### Two scroll bars

You can add two scroll bars to a table if needed—one in the header and one at the bottom. This is useful when the table is very long and has fixed columns, so users can scroll the table without scrolling to its very end. In these cases, the scroll bars can be in both the header and bottom. Refer to the [examples in the Sticky header section](/table-group/data-table/data-table-code#sticky-header).

![](static/table-scroll.png)

## Pagination

Refer to the [Table controls](/table-group/table-controls/table-controls#pagination) guide for detailed recommendations on pagination.

## Table states

For information about table states, refer to the specific document on [Table states](/table-group/table-states/table-states).
