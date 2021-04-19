---
title: DataTable
fileSource: data-table
tabName: Code
beta: true
---

The DataTable component is needed to simplify the construction of tabular data. The table is based on `CSS-flex` technology and does not use native tables.

> **The component is currently in beta**. In the future, we plan to make it the main component for tables.

@## A simple use example

To build a table, we must provide columns with titles `<DataTable.Column name={name}/>` and data `data={data}`.

> `<DataTable.Column/>` must be a child component of `<DataTable.Head/>`

@example base

@## Scroll in the table

`<DataTable/>`, `<DataTable.Head/>`, `<DataTable.Body/>` are inherited from the `Box` component and accept all its parameters. `<DataTable/>` is a wrapper for `<DataTable.Head/>`, `<DataTable.Body />`, where scrolls are implemented.

> If you don't see horizontal scrolling in the example, reduce the window size.

@example table-scroll

@## Customizing the header

You can use `children` to insert tooltips, selectors, and other components in the header.

@example custom-header

@## The size of the columns

Columns are inherited from the `Flex` component and accept all its parameters. With `flex`, `wMin`, `wMax`, you can flexibly adjust the column width.

@example width-header

@## The alignment of the columns

Since columns and cells are inherited from the `Flex` component, you can use `justifyContent` to align the column to the desired edge. This property is automatically applied to table cells.

@example align-header

@## Sorting

If you can sort by column, then:

1. Specify the `sortable` property on the column;
2. Subscribe to `onSortChange`;
3. Pass the so`rt property to the table itself.

> In the example below, when you click on the sort icon, only the visual part changes, and the data itself is not sorted.

@example sort

@## Fixed header

To fix the table header, use the `<Sticky/>` component.

> Set `zIndex=2` for correct display.

@example sticky

@## Fixed columns

To fix table columns, pass the `fixed` property to `<DataTable.Column/>`.

> If you don't see fixed columns in the example, reduce the window size.

@example fixed

@## Multi-level header

To create a multi-level header, insert columns into each other. However, the `name` is not applicable for the group column.

@example multi-header

@## Adding additional elements to the header

If you add custom components to `<DataTable.Head/>`, they will be inserted at the end of the header.

@example add-head

@## Header separation

Sometimes we need to move the table header outside of the table, this can be done using the portal. All functionality will work, the table body will adjust to the size of the header.

@example portal-head

@## Access to Row

To apply some properties to a table row, you need to define `<DataTable.Row/>`. You can use multiple `<DataTable.Row/>` to separate the business logic.

> `<DataTable.Row/>` must be a child component of `<DataTable.Body/>`.

@example row

@## Access to Cell

To apply some properties to a table cell, you need to define `<DataTable.Cell/>` with the appropriate `name={name}`. You can use multiple `<DataTable.Cell/>` for separating business logic.

> `<DataTable.Cell/>` must be a child component of `<DataTable.Body/>`.

@example cell

@## Access to a set of cells

To apply properties to multiple table cells, you need to define `<DataTable.Cell />` with their names listed via `/`.

@example multi-cell

@## Adding additional elements to the table body

When adding custom components to `<DataTable.Body/>` they will be inserted at the end of the table body.

> To block fixed columns , you need to specify `z-index=1` to block scrolling, you need to specify `z-index=2`.

@example add-body

@## Accordion in the table

We use the `@semcore/accordion` component to extend the functionality of the string.

1. Wrapping the table in the `Accordion` control component;
2. Replacing the tag in `DataTable.Row` with our extended tag with `Accordion.Item`;
3. Setting the value for `Accordion.Item`;
4. Calculating the active line to highlight it;
5. Set the arrow (Chevron icon), if necessary.

@example accordion

@## Table in table

We use the example with [the accordion above](/table-group/data-table/#ab2a56).

1. Render the table to accordion content;
2. Set the desired z-index;
3. Hide the table header;

@example table-in-table

@## Download status

You can replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with the spinner.

@example loading

@## Skeleton in the table

You can substitute the skeleton directly in `data`, but you can also replace `rows` with `<DataTable .Body/>`.

@example skeleton

@## Merging columns

To combine two or more columns, we can change the table data by combining the column keys via `/`.

@example col-group

@## Row merging

To merge two or more rows, we can change the table data by adding a special grouping key.

@example row-group

@## Secondary table

You can use secondary table for compact displaying small amount of data inside widgets.

@example secondary

@page data-table-api
@page data-table-changelog
