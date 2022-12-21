---
title: Primary table
fileSource: data-table
tabName: Design
---

**Primary** is the basic type of tables for displaying large data volumes and complex functionality.

@## Paddings

The cell in the primary table, whether it is a header or a row, has 12px padding.

![primary scheme](static/primary-paddings.png)

Also header has a compact variant with 8px padding.

![compact scheme](static/primary-compact-paddings.png)

@## Styles

> Content inside header cells and rows is aligned to the top.

| Description                     | Appearance                                | Styles                                                                        |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| Heading                         | ![th styles](static/th-styles.png)        | `background-color: var(--gray-50;` `border-bottom: 1px solid var(--gray-100)` |
| Heading of the scrollable table | ![th styles](static/th-styles-scroll.png) | When scrolling a page with a table, the header should not have a shadow.      |
| Default row                     | ![td default](static/td-default.png)      | `border-bottom: 1px solid var(--gray-100);`                                   |
| The last line of the accordion  | ![table accordion](static/accordion.png)  | `border-bottom: 1px solid var(--gray-300);`                                   |

@## Multi-level header

In some cases, a header should comprise two or more rows. Following conditions are recommended to be met:

- the title of the merged column should be always center-aligned;
- you can't sort by the head cell.

![table head example](static/two-row-head.png)

In other cases, if there is insufficient space, two lines of text in one cell can be used.

![table head example](static/two-row-name-head.png)

@## Table header states

| State  | Appearance                         | Styles                                                |
| ------ | ---------------------------------- | ----------------------------------------------------- |
| hover  | ![th hover](static/th-hover.png)   | `background-color: var(--gray-100); cursor: pointer;` |
| sorted | ![th sorted](static/th-styles.png) | `background-color: var(--gray-100); cursor: pointer;` |

@## Row states

See more information in the common [Table principles](/table-group/table/#a1c3dd) guide.

@page table-primary-code
