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
  export Demo from 'stories/components/data-table/docs/examples/base.tsx';
</script>

:::

## Basic secondary table

Use the secondary table to compactly display a small amount of data.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/secondary-table.tsx';
</script>

:::

## Table styles

### Compact

Reduce table cel paddings by adding the `compact` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/compact.tsx';
</script>

:::

### Borders

Add borders to columns by passing the `vBorders` property to specific columns.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/borders.tsx';
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
  export Demo from 'stories/components/data-table/docs/examples/fixed-header.tsx';
</script>

:::

### Header customization

You can insert tooltips, selects, and other components into the table header using the `children` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/customizing-header.tsx';
</script>

:::

### Multi-level header

Create a multi-level header by nesting columns within each other.

::: tip
`name` property isn't applicable for group columns.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/multi-level-header.tsx';
</script>

:::

## Table columns

### Column sizes

Columns are inherited from the `Flex` component and accept its parameters, such as `flex` , `wMin` , and `wMax` , to adjust the column width.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/column-sizes.tsx';
</script>

:::

### Column alignment

Columns and cells inherit properties from the `Flex` component, so you can use `justifyContent` and `alignItems` to align columns and cells. Table cells automatically inherit the same properties as the column.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/column-alignment.tsx';
</script>

:::

### Fixed column

To fix table columns, use the `fixed` property with `<DataTable.Column/>` .

::: tip
If fixed columns aren't visible in the following example, try reducing the window size.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/fixed-columns.tsx';
</script>

:::

### Columns grouping

Merge columns by changing the table data and using `/` to combine column keys. You can merge columns for a specific row, as shown in the following example, or for all rows.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/columns-merging.tsx';
</script>

:::

### Column expansion

The active column will expand if there isn't enough space. Fixed-width columns won't change size.

::: tip
Be cautious with columns with a `wMax` property, as the sort icon may overlap the header text on hover, hiding part of the text.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/column-expand.tsx';
</script>

:::

## Table rows

### Rows grouping

Group cells from different rows by adding a special grouping key to the table data.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/rows-merging.tsx';
</script>

:::

### Custom rows rendering

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/custom-rows-rendering.tsx';
</script>

:::

### Virtual scroll with known rows height

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
</script>

:::

### Virtual scroll with different heights

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/virtual-scroll-in-table-different-height.tsx';
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
  export Demo from 'stories/components/data-table/docs/examples/access-to-cells.tsx';
</script>

:::

### Access to set of cells

To apply properties to multiple table cells, define `<DataTable.Cell />` with their names listed using `/` .

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/access-to-set-of-cells.tsx';
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
  export Demo from 'stories/components/data-table/docs/examples/sorting.tsx';
</script>

:::

### Changing width for sorting column

If some column has `changeSortSize={true}`, by default, it will be increased by the largest column if the computed width less than `content width` + `sorting icon width`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
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
  export Demo from 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
</script>

:::

### Virtual scroll

Enable scroll virtualization using the `virtualScroll` property.
Note that built-in virtualization support tables with fixed-height rows only.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
</script>

:::

## Pagination

Avoid placing [Pagination](/components/pagination/pagination) inside the table, as the pagination component has a `nav` landmark assigned to it.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/pagination.tsx';
</script>

:::

## Table states

### Initial loading (Skeleton)

Add a skeleton to the table by directly substituting it in the `data` or replacing `rows` with `<DataTable.Body/>` .

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/skeleton-in-table.tsx';
</script>

:::

### Updating table (SpinContainer)

Replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with a [Spin](/components/spin/spin).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/spin-container-in-table.tsx';
</script>

:::

### Empty state

Render [WidgetEmpty](../../components/widget-empty/widget-empty) inside a single cell spanning across all columns.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/empty-table.tsx';
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
  export Demo from 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
</script>

:::

## Specific cases

### Table in table

Refer to the [example with the accordion](/table-group/data-table/data-table#accordion_in_table).

1. Hide the table header.
2. Set "inherit" to use the size from the top table for each column.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/table-in-table.tsx';
</script>

:::

### Table in table with fixed column

Refer to the [example with the table inside the table](/table-group/data-table/data-table#table_in_table).

1. Set the desired `z-index`.
2. Set the variable to block the scroll.
3. Set the variable to remove overflow.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/table-in-table-with-fixed-column.tsx';
</script>

:::

### Export to image

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/export-in-image.tsx';
</script>

:::

### Selectable rows

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
</script>

:::
