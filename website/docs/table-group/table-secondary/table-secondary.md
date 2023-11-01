---
title: Secondary table
fileSource: data-table
tabName: Design
---

@## Description

**Secondary table** is a table type designed for compactly displaying a small amount of data within widgets and [cards](/components/card/). These tables usually have limited functionality, often just simple features like sorting.

@## Appearance

### Paddings

In a secondary table, whether it's a header or a row, cells use `--spacing-2x` token for padding.

![](static/secondary-paddings.png)

### Styles

> If there's a sorting icon in the column, the icon should be in the active state with a `--icon-secondary-neutral-hover-active` color.

| Description | Appearance                                  | Styles                                                                      |
| ----------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| Heading     | ![](static/th-secondary.png) | `background-color: var(--table-td-cell); border-bottom: 1px solid var(--border-table-accent)` |
| Default row | ![](static/td-secondary.png) | `background-color: var(--table-td-cell); border-bottom: 1px solid var(--border-secondary)` |

@## Row states

For more information, refer to the general [Table principles](/table-group/data-table/#a1c3dd) guide.

@page table-secondary-code
