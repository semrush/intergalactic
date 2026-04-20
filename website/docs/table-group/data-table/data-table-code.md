---
title: DataTable
fileSource: data-table
tabs: Design('data-table'), A11y('data-table-a11y'), API('data-table-api'), Example('data-table-code'), Changelog('data-table-changelog')
---

The `DataTable` component simplifies rendering of tabular data. It uses CSS grid for layout and doesn't rely on native tables.

## Primary table

To render a table, provide the list of columns with their titles using `columns={columns}`, and the list of rows using `data={data}`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/base.tsx';
</script>

:::

## Secondary table

Use the secondary table to display small amounts of data in a compact layout.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/secondary-table.tsx';
</script>

:::

## Performance tips

To ensure optimal performance, follow these best practices:

- **Use virtual scrolling or pagination for large datasets.** Enable `virtualScroll` when rendering tables with hundreds or thousands of rows. Specify `rowHeight` for constant-height rows to maximize performance.

- **Keep column definitions stable.** Define your columns array outside the component or use `React.useMemo()` to maintain the same reference between renders.

- **Keep data arrays stable.** Avoid recreating the data array on every render. Define it outside the component, use `React.useMemo()`, or ensure the reference only changes when the data actually changes.

- **Avoid inline functions in `renderCell`.** Define render functions outside the component or wrap them with `React.useMemo()` to maintain stable references across renders.

- **Keep all object properties stable.** Ensure property objects maintain consistent references between renders. Avoid creating new objects on every render.

- **Provide `uniqueRowKey` prop.** Specify a unique key for each row and describe it by using the `uniqueRowKey` prop to prevent the `DataTable` from calculating row keys.

- **Optimize custom cell components.** If using custom components in cells, ensure they're properly memoized with `React.memo()` and don't cause unnecessary re-renders.

```typescript jsx
function CellRenderer({ dataKey, row, defaultRender }: CellRenderProps) { // [!code ++]
    const value = row[dataKey].toString(); // [!code ++]
    return ['-', '$0', 'n/a'].includes(value) ? <Spin /> : defaultRender(); // [!code ++]
} // [!code ++]

const headerProps = { sticky: true }; // [!code ++]

const columns = [ // [!code ++]
    { name: 'id', children: 'ID' }, // [!code ++]
    { name: 'keyword', children: 'Keyword', gtcWidth: '300px' }, // [!code ++]
    { // [!code ++]
        name: 'group', // [!code ++]
        children: 'Organic Sessions', // [!code ++]
        columns: [ // [!code ++]
            { name: 'kd', children: 'KD %' }, // [!code ++]
            { name: 'cpc', children: 'CPC' }, // [!code ++]
            { name: 'vol', children: 'Vol.' }, // [!code ++]
        ], // [!code ++]
    }, // [!code ++]
]; // [!code ++]

function Demo({ data }) {
  return (
    <DataTable
      data={data}
      uniqRowKey='id' // [!code ++]
      aria-label='Virtual scroll' // [!code ++]
      renderCell={({ dataKey, row, defaultRender }) => { // [!code --]
        const value = row[dataKey].toString(); // [!code --]
        return ['-', '$0', 'n/a'].includes(value) ? <Spin/> : defaultRender(); // [!code --]
      }} // [!code --]
      renderCell={CellRenderer} // [!code ++]
      virtualScroll // [!code ++]
      totalRows={10000} // [!code ++]
      headerProps={{ sticky: true }} // [!code --]
      headerProps={headerProps} // [!code ++]
      columns={[ // [!code --]
        { name: 'id', children: 'ID' }, // [!code --]
        { name: 'keyword', children: 'Keyword', gtcWidth: '300px' }, // [!code --]
        { // [!code --]
          name: 'group', // [!code --]
          children: 'Organic Sessions', // [!code --]
          columns: [ // [!code --]
            { name: 'kd', children: 'KD %' }, // [!code --]
            { name: 'cpc', children: 'CPC' }, // [!code --]
            { name: 'vol', children: 'Vol.' }, // [!code --]
          ], // [!code --]
        }, // [!code --]
      ]} // [!code --]
      columns={columns} // [!code ++]
    />
  );
}
```

## Styles

### Compact

Cell paddings can be reduced by adding the `compact` property.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/compact.tsx';
</script>

:::

### Table in card

Use `variant="card"` when displaying a table in a card. Refer to the [Card layout for tables example](../../components/card/card-code#card-layout-for-tables).

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

You can use `justifyContent`, `alignItems`, `alignContent`, and `textAlign` props to align content in columns.

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

It receives props described in [`CellRenderProps`](/table-group/data-table/data-table-api#rendercell).

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

::: tip
When using virtual scroll, you must define the DataTable’s height by setting `h` or `hMin`, or by defining the parent's height and `height='100%'` for the DataTable.
Without a defined height, virtual scroll can't calculate its layout correctly.
:::

Enable scroll virtualization using the `virtualScroll` property. Passing `rowHeight` as its subproperty will ensure the best performance.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
</script>

:::

### Virtual scroll with variable row height

::: tip
When using virtual scroll, you must define the DataTable’s height by setting `h` or `hMin`, or by defining the parent's height and `height='100%'` for the DataTable.
Without a defined height, virtual scroll can't calculate its layout correctly.
:::

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

### Limited data

You can hide the limited data with a blurred overlay by using the `limit` prop, and add your own message for this table state.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/data-table/docs/examples/limited-mode.tsx';
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
