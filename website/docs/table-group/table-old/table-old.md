---
title: Table code and API
fileSource: table
tabName: Example
deprecated: true
---

> 🚨 Library `@semcore/table` is deprecated. Use new library [@semcore/data-table](/table-group/data-table/). It is based on `CSS-flex` technology and does not use native tables.

@## Simple usage example

@example easy

@## Advanced use example

You can manually add borders to selected cells using props `borderRight` and `borderLeft`. And if you want the table to look smaller, use the prop `compact`. If a column width limit is set using `style` prop object with `maxWidth` inside, then the sort icon on hover will run over the text in the column header, and the non-fitting part of the text will not be visible.

@example advanced

@## Table with an accordion

Example of a table with an [accordion](/components/accordion) 😎

@example accordion

@## Table with dynamic column width

Example of a table where you can change the width of columns using the [react-resizable library](https://github.com/STRML/react-resizable).

@example resize

@## Example with scroll and shadow

@example scroll

@## Table with a fixed header

@example sticky-head

@## Secondary table

You can use secondary table for compact displaying small amount of data inside widgets.

@example secondary

@## Example of data being loaded for the first time

@example skeleton

@## Table with no data

These states for widgets are described in detail in [Widget enpty state](/components/widget-empty/widget-empty-code/).

@example no-data

@page table-old-api
@page table-old-changelog
