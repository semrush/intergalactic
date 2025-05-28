---
title: DataTable
fileSource: data-table
tabs: Design('data-table'), A11y('data-table-a11y'), API('data-table-api'), Example('data-table-code'), Changelog('data-table-changelog')
---

The `DataTable` component simplifies rendering of tabular data. It uses CSS grid for layout and doesn't rely on native tables.

## Basic primary table

To render a table, provide the list of columns with their titles using `columns={columns}`, and the list of rows using `data={data}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/base.tsx';
</script>

:::

## Basic secondary table

Use the secondary table to display small amounts of data in a compact layout.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/secondary-table.tsx';
</script>

:::

## Styles

### Compact

Cell paddings can be reduced by adding the `compact` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/compact.tsx';
</script>

:::

### Borders

Add borders to specific columns using the `borders` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/borders.tsx';
</script>

:::

### Themes

You can use different themes for cells and rows.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/row-themes.tsx';
</script>

:::

## Header

### Sticky header

Use the `sticky` and `top` props to make the table header sticky.

Scroll in the table header is useful for long tables, allowing users to scroll horizontally without having to scroll to the bottom of the table.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/fixed-header.tsx';
</script>

:::

### Header customization

You can insert tooltips, selects, and other components into the table header using `children` and `tag`.

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

## Columns

### Column width

Control the column width with the `gtcWidth` prop.

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

To fix table columns, use the `fixed` property.

::: tip
If fixed columns aren't visible in the following example, try reducing the window width.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/fixed-columns.tsx';
</script>

:::

### Column grouping

Merge cells by combining column keys in the data. You can merge cells in a specific row, as shown in the following example, or in all rows.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/columns-merging.tsx';
</script>

:::

## Rows

### Row grouping

Merge cells across rows using the `[ROW_GROUP]` key in the data.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/rows-merging.tsx';
</script>

:::

### Checkboxes and action bar

You can enable selecting rows with checkboxes with the `selectedRows` and `onSelectedRowsChange` props.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
</script>

:::

### Custom row rendering

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/custom-rows-rendering.tsx';
</script>

:::

## Cells

### Access to cells

To customize the content of a table cell, use the `renderCell` prop. 
It receives props described in [`CellRenderProps`](/table-group/data-table/data-table-api#datatable).

You can return either a custom React element to override the rendering entirely, or an object that will be applied as props to the cell.
If the returned object includes a children property, it will override the default cell content—otherwise, you can use it to apply custom attributes such as theming or data attributes.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/access-to-cells.tsx';
</script>

:::

### Access to set of cells

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

### Expanding column

`changeSortSize` allows the sorted column to grow in width to fit the sort icon.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
</script>

:::

## Scroll

### Basic scroll

`<DataTable/>` inherits all `Box` properties, such as `wMax` and `hMax`, which can be used to enable internal scroll.

By default, horizontal scrolling is displayed at the bottom of the table, but it can also be added to the table header. Scroll in the table header is useful for long tables, allowing users to scroll horizontally without having to scroll to the end of the table. For examples, refer to [Sticky header](/table-group/data-table/data-table-code#sticky-header).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
</script>

:::

### Virtual scroll with constant row height

Enable scroll virtualization using the `virtualScroll` property. Passing `rowHeight` as its subproperty will ensure the best performance.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
</script>

:::

### Virtual scroll with variable row height

Omit `rowHeight` for tables with variable row heights.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/virtual-scroll-in-table-different-height.tsx';
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

Add a skeleton to the table by directly substituting the cell content.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/skeleton-in-table.tsx';
</script>

:::

### Updating table (SpinContainer)

`SpinContainer` is the default loading state for the table and can be enabled by the `loading` prop.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/spin-container-in-table.tsx';
</script>

:::

### Empty state

`DataTable` has a default empty state based on [WidgetEmpty](../../components/widget-empty/widget-empty) which is rendered automatically if the data is empty. You can customize the empty state using the `renderEmptyData` prop.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/empty-table.tsx';
</script>

:::

## Accordion in table

Render expandable rows using the `[ACCORDION]` key in the data.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/table-in-table.tsx';
</script>

:::

### Custom accordion content

You can also set a single cell as the accordion trigger, and customize the accordion content.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
</script>

:::

### Accordion with fixed column

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/table-in-table-with-fixed-column.tsx';
</script>

:::

## Export to image

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/export-in-image.tsx';
</script>

:::
