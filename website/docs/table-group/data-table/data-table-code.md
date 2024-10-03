---
title: DataTable
fileSource: data-table
tabs: Design('data-table'), A11y('data-table-a11y'), API('data-table-api'), Example('data-table-code'), Changelog('data-table-changelog')
---

The DataTable component simplifies the creation of tabular data. It uses CSS flex for layout and doesn't rely on native tables.

## Basic primary table

To create a table, provide columns with titles using `<DataTable.Column name={name}/>` and data with `data={data}`.

::: tip
`<DataTable.Column/>` must be a child component of `<DataTable.Head/>`.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/base.tsx';
</script>

:::

## Basic secondary table

Use the secondary table to compactly display a small amount of data.

::: sandbox

<script lang="tsx">
  export Demo from './examples/secondary-table.tsx';
</script>

:::

## Table styles

### Compact

Reduce table cel paddings by adding the `compact` property.

::: sandbox

<script lang="tsx">
  export Demo from './examples/compact.tsx';
</script>

:::

### Borders

Add borders to columns by passing the `vBorders` property to specific columns.

::: sandbox

<script lang="tsx">
  export Demo from './examples/borders.tsx';
</script>

:::

## Table header

### Fixed header

Use the `<Box position="sticky" top={top} />` to fix the table header.

::: tip
Set `zIndex=2` for correct display.
:::

Scroll in the table header is useful for very long tables with fixed columns, allowing users to scroll more conveniently without reaching the end. In such cases, scroll can be added to the header and the bottom of the table.

::: sandbox

<script lang="tsx">
  export Demo from './examples/fixed-header.tsx';
</script>

:::

### Fixed header with loading state in table

For correct components overlapping, use the `SpinContainer` component with `SpinContainer.Overlay` but without `SpinContainer.Content` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/fixed-header-with-spin-overlay.tsx';
</script>

:::

### Header customization

You can insert tooltips, selects, and other components into the table header using the `children` property.

::: sandbox

<script lang="tsx">
  export Demo from './examples/customizing-header.tsx';
</script>

:::

### Multi-level header

Create a multi-level header by nesting columns within each other.

::: tip
`name` property isn't applicable for group columns.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/multi-level-header.tsx';
</script>

:::

### Additional elements in header

Components added to `<DataTable.Head/>` will be inserted at the end of the header.

::: sandbox

<script lang="tsx">
  export Demo from './examples/additional-elements-in-header.tsx';
</script>

:::

## Table columns

### Column sizes

Columns are inherited from the `Flex` component and accept its parameters, such as `flex` , `wMin` , and `wMax` , to adjust the column width.

::: sandbox

<script lang="tsx">
  export Demo from './examples/column-sizes.tsx';
</script>

:::

### Column alignment

Columns and cells inherit properties from the `Flex` component, so you can use `justifyContent` and `alignItems` to align columns and cells. Table cells automatically inherit the same properties as the column.

::: sandbox

<script lang="tsx">
  export Demo from './examples/column-alignment.tsx';
</script>

:::

### Fixed column

To fix table columns, use the `fixed` property with `<DataTable.Column/>` .

::: tip
If fixed columns aren't visible in the following example, try reducing the window size.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/fixed-columns.tsx';
</script>

:::

### Columns merging

Merge columns by changing the table data and using `/` to combine column keys. You can merge columns for a specific row, as shown in the example below, or for all rows.

::: sandbox

<script lang="tsx">
  export Demo from './examples/columns-merging.tsx';
</script>

:::

### Column expansion

The active column will expand if there isn't enough space. Fixed-width columns won't change size.

::: tip
Be cautious with columns with a `wMax` property, as the sort icon may overlap the header text on hover, hiding part of the text.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/column-expand.tsx';
</script>

:::

## Table rows

### Access to rows

To apply properties to a table row, use `<DataTable.Row/>` . You can use multiple `<DataTable.Row/>` to separate the business logic.

::: tip
`<DataTable.Row/>` must be a direct child component of `<DataTable.Body/>` . Don't wrap it in higher-order components, and using styled components (for example, `` styled(DataTable. Row) `...` `` ) isn't allowed.
:::

You can provide `data` property for `<DataTable.Row/>` . It isn't used in the component runtime but improves strict typings.

::: sandbox

<script lang="tsx">
  export Demo from './examples/access-to-rows.tsx';
</script>

:::

### Rows grouping

Group cells from different rows by adding a special grouping key to the table data.

::: sandbox

<script lang="tsx">
  export Demo from './examples/rows-merging.tsx';
</script>

:::

### Custom rows rendering

If built-in virtualization doesn't meet your requirements, you can implement your own virtualization using `renderRows` prop.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom-rows-rendering.tsx';
</script>

:::

### Custom footer row

To reuse column sizes, use CSS variables like `var(--<%column-name%>_width)` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom-footer-cells.tsx';
</script>

:::

## Table cells

### Access to cells

Define `<DataTable.Cell/>` with the appropriate `name={name}` to apply properties to a table cell. You can use multiple `<DataTable.Cell/>` for different business logic.

::: tip
`<DataTable.Cell/>` must be a direct child component of `<DataTable.Body/>` . Don't wrap it in higher-order components, and using styled components (for example, `` styled(DataTable. Cell) `...` `` ) isn't allowed.
:::

You can provide `data` property for `<DataTable.Cell/>` . It isn't used in the component runtime but improves strict typings.

::: sandbox

<script lang="tsx">
  export Demo from './examples/access-to-cells.tsx';
</script>

:::

### Access to set of cells

To apply properties to multiple table cells, define `<DataTable.Cell />` with their names listed using `/` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/access-to-set-of-cells.tsx';
</script>

:::

## Sorting

To enable column sorting:

1. Set the `sortable` property on the column.
2. Subscribe to the `onSortChange` event.
3. Pass the `sort` property to the table.
4. Sort the data provided in the `data` property.

::: sandbox

<script lang="tsx">
  export Demo from './examples/sorting.tsx';
</script>

:::

### Changing width for sorting column

If some column has `changeSortSize={true}`, by default, it will be increased by the largest column if the computed width less than `content width` + `sorting icon width`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/sorting-changing-size.tsx';
</script>

:::

### Changing width of column by reducing width of another column

You could set `sortSizeRecalculation={true}` for using this column as column to recalculation width (after increase to sorting column). The needed width will be divided equally between all such columns.

::: sandbox

<script lang="tsx">
  export Demo from './examples/sorting-changing-size-by-columns.tsx';
</script>

:::

## Table scroll

### Basic scroll

`<DataTable/>` , `<DataTable.Head/>` , and `<DataTable.Body/>` are inherited from the Box component and accept all its parameters. `<DataTable/>` serves as a container for `<DataTable.Head/>` and `<DataTable.Body/>` where scrolling is implemented.

::: tip
If horizontal scrolling isn't visible, try reducing the window size
:::

By default, scrolling is displayed at the bottom of the table, but it can also be added to the table header. Scroll in the table header is useful for very long tables with fixed columns, allowing users to scroll more conveniently without reaching the end. For examples, refer to the [Fixed header section](/table-group/data-table/data-table#fixed_header).

::: sandbox

<script lang="tsx">
  export Demo from './examples/scroll-in-table.tsx';
</script>

:::

### Virtual scroll

Enable scroll virtualization using the `virtualScroll` property.
Note that built-in virtualization support tables with fixed-height rows only.

::: sandbox

<script lang="tsx">
  export Demo from './examples/virtual-scroll-in-table.tsx';
</script>

:::

## Pagination

Avoid placing [Pagination](/components/pagination/pagination) inside the table, as the pagination component has a `nav` landmark assigned to it.

::: sandbox

<script lang="tsx">
  export Demo from './examples/pagination.tsx';
</script>

:::

## Table states

### Loading data

Replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with a [Spin](/components/spin/spin).

::: sandbox

<script lang="tsx">
  export Demo from './examples/download-status.tsx';
</script>

:::

### Skeleton

Add a skeleton to the table by directly substituting it in the `data` or replacing `rows` with `<DataTable.Body/>` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/skeleton-in-table.tsx';
</script>

:::

## Accordion inside table

Extend table functionality using the `intergalactic/accordion` component. This allows you to add accordions to table rows.

1. Wrap the table in the `Accordion` component.
2. Replace the tag in `DataTable.Row` with our extended tag using `Accordion.Item`.
3. Define a value for `Accordion.Item`.
4. Calculate the active line to highlight.
5. Render the children as accordion content.
6. Add the arrow (`ChevronRight` icon) if needed.

::: sandbox

<script lang="tsx">
  export Demo from './examples/accordion-inside-table.tsx';
</script>

:::

## Specific cases

### Table in table

Refer to the [example with the accordion](/table-group/data-table/data-table#accordion_in_table).

1. Hide the table header.
2. Set "inherit" to use the size from the top table for each column.

::: sandbox

<script lang="tsx">
  export Demo from './examples/table-in-table.tsx';
</script>

:::

### Table in table with fixed column

Refer to the [example with the table inside the table](/table-group/data-table/data-table#table_in_table).

1. Set the desired `z-index`.
2. Set the variable to block the scroll.
3. Set the variable to remove overflow.

::: sandbox

<script lang="tsx">
  export Demo from './examples/table-in-table-with-fixed-column.tsx';
</script>

:::

### Adding additional elements to table body

Components added to `<DataTable.Body/>` will be inserted at the end of the table body. Use `z-index=1` to block fixed columns or `z-index=2` to block scrolling if needed.

::: sandbox

<script lang="tsx">
  export Demo from './examples/adding-additional-elements-to-table-body.tsx';
</script>

:::

### Export to image

::: sandbox

<script lang="tsx">
  export Demo from './examples/export-in-image.tsx';
</script>

:::
