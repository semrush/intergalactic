---
title: Primary table
fileSource: data-table
tabName: Design
---

**Primary** is the basic type of tables in our interface for displaying large data volumes and complex functionality.

@## Paddings

The `primary` table cell paddings, whether it is a header or a cell in a row, are 12px.

![primary scheme](static/primary-scheme.png)

@## Styles

> 💡 Content inside header cells and rows is aligned to the top.

| Description                     | Appearance                                 | Styles                                                                                              |
| ------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Heading                         | ![th styles](static/th-styles.png)         | `background-color: #F2F3F4;` `border-bottom: 1px solid $mercury; border-right: 1px solid $mercury;` |
| Heading of the scrollable table | ![th styles](static/th-styles-scroll.png)  | When scrolling a page with a table, the header should not have a shadow.                            |
| Default row                     | ![td default](static/td-default.png)       | `border-bottom: 1px solid $mercury;`                                                                |
| The last line of the accordion  | ![table accordion](static/accordion-3.png) | `border-bottom: 1px solid $stone;`                                                                  |

@## Multi-level header

In some cases, a header should comprise two or more rows. Following conditions are recommended to be met:

- the title of the merged column should be always center-aligned;
- you can't sort by the head cell.

![table head example](static/two-row-head.png)

@## Table header states

| State  | Appearance                         | Styles                                        |
| ------ | ---------------------------------- | --------------------------------------------- |
| hover  | ![th hover](static/th-hover.png)   | `background-color: #E4E7E8; cursor: pointer;` |
| sorted | ![th sorted](static/th-sorted.png) | `background-color: #E4E7E8; cursor: pointer;` |

@## Row states

See more information in the common [Table principles](/table-group/table/#a1c3dd) guide.

@page table-primary-code
