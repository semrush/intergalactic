---
title: DataTable
fileSource: data-table
tabName: Example
---

The DataTable component simplifies the creation of tabular data. It uses CSS flex for layout and does not rely on native tables.

@## Simple usage example

To create a table, provide columns with titles using `<DataTable.Column name={name}/>` and data with `data={data}`.

> `<DataTable.Column/>` must be a child component of `<DataTable.Head/>`

@example base

@## Scroll in table

`<DataTable/>`, `<DataTable.Head/>`, and `<DataTable.Body/>` are inherited from the Box component and accept all its parameters. `<DataTable/>` serves as a container for `<DataTable.Head/>` and `<DataTable.Body/>` where scrolling is implemented.

> If horizontal scrolling is not visible, try reducing the window size.

By default, scrolling is displayed at the bottom of the table, but it can also be added to the table header. Scroll in the table header is useful for very long tables with fixed columns, allowing users to scroll more conveniently without reaching the end. For examples, refer to the [Fixed header section](/table-group/data-table/#fixed_header).

@example table-scroll

@## Customizing header

You can insert tooltips, selectors, and other components into the table header using the `children` property.

@example custom-header

@## Column sizes

Columns are inherited from the `Flex` component and accept its parameters, such as `flex`, `wMin`, and `wMax`, to adjust the column width.

@example width-header

@## Column alignment

Columns and cells inherit properties from the `Flex` component, so you can use `justifyContent` and `alignItems` to align columns and cells. Table cells automatically inherit the same properties as the column.

@example align-header

@## Sorting

To enable column sorting:

1. Set the `sortable` property on the column.
2. Subscribe to the `onSortChange` event.
3. Pass the `sort` property to the table.
4. Sort the data provided in the `data` property.

@example sort

@## Fixed header

Use the `<Box position="sticky" top={top} />` to fix the table header.

> Set `zIndex=2` for correct display.

Scroll in the table header is useful for very long tables with fixed columns, allowing users to scroll more conveniently without reaching the end. In such cases, scroll can be added to the header and the bottom of the table.

@example sticky

@## Fixed columns

To fix table columns, use the `fixed` property with `<DataTable.Column/>`.

> If fixed columns are not visible in the example below, try reducing the window size.

@example fixed

@## Multi-level header

Create a multi-level header by nesting columns within each other.

> `name` property is not applicable for group columns.

@example multi-header

@## Additional elements in header

Components added to `<DataTable.Head/>` will be inserted at the end of the header.

@example add-head

@## Header separation

Move the table header outside of the table using a portal. All functionality will work, and the table body will adjust to the header's size.

@example portal-head

@## Access to rows

To apply properties to a table row, use `<DataTable.Row/>`. You can use multiple `<DataTable.Row/>` to separate the business logic.

> `<DataTable.Row/>` must be a direct child component of `<DataTable.Body/>`. Do not wrap it in higher-order components, and using styled components (for example, `` styled(DataTable.Row)`...` ``) is not allowed.

You can provide `data` property for `<DataTable.Row/>`. It is not used in the component runtime but improves strict typings.

@example row

@## Access to cells

Define `<DataTable.Cell/>` with the appropriate `name={name}` to apply properties to a table cell. You can use multiple `<DataTable.Cell/>` for different business logic.

`<DataTable.Cell/>` must be a direct child component of `<DataTable.Body/>`. Do not wrap it in higher-order components, and using styled components ((for example, `` styled(DataTable.Cell)`...` ``)) is not allowed.

You can provide `data` property for `<DataTable.Cell/>`. It is not used in the component runtime but improves strict typings.

@example cell

@## Access to set of cells

To apply properties to multiple table cells, define `<DataTable.Cell />` with their names listed using `/`.

@example multi-cell

@## Adding additional elements to table body

Components added to `<DataTable.Body/>` will be inserted at the end of the table body. Use `z-index=1` to block fixed columns or `z-index=2` to block scrolling if needed.

@example add-body

@## Custom footer cells

To reuse column sizes, use CSS variables like `var(--<%column-name%>_width)`.

@example summary

@## Accordion inside table

Extend table functionality using the `@semcore/ui/accordion` component. This allows you to add accordions to table rows.

1. Wrap the table in the `Accordion` component.
2. Replace the tag in `DataTable.Row` with our extended tag using `Accordion.Item`.
3. Define a value for `Accordion.Item`.
4. Calculate the active line to highlight.
5. Render the children as accordion content.
6. Add the arrow (`ChevronRight` icon) if needed.

@example accordion

@## Table in table

We use the [example with the accordion above](/table-group/data-table/#accordion_in_table).

1. Hide the table header.
2. Set "inherit" to use the size from the top table for each column.

@example table-in-table

@## Table in table with fixed column

We use the [example with the table above](/table-group/data-table/#table_in_table).

1. Set the desired `z-index`.
2. Set the variable to block the scroll.
3. Set the variable to remove overflow.

@example table-in-table-with-fixed

@## Virtual scroll in table

Enable scroll virtualization using the `virtualScroll` property.

@example virtual-scroll

@## Download status

Replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with a [Spin](/components/spin).

@example loading

@## Skeleton in table

Add a skeleton to the table by directly substituting it in the `data` or replacing `rows` with `<DataTable.Body/>`.

@example skeleton

@## Merging columns

Merge two or more columns by changing the table data and using `/` to combine column keys.

@example col-group

@## Row merging

Merge two or more rows by adding a special grouping key to the table data.

@example row-group

@## Secondary table

Use the secondary table for compactly displaying a small amount of data.

@example secondary

@## Export in image

Export the table to an image.

@example export-to-pdf

@## Compact

Reduce table cel  paddings by adding the `compact` property.

@example compact

@## Borders

Add borders to columns by passing the `vBorders` property to specific columns.

@example borders

@## Сolumn expand

The active column will expand if there isn't enough space. Fixed-width columns will not change size. 

> Be cautious with columns with a `wMax` property, as the sort icon may overlap the header text on hover, hiding part of the text.

@example expanding-column
