---
title: DataTable
fileSource: data-table
tabs: Design('data-table'), Example('data-table-code'), API('data-table-api'), A11y('data-table-a11y'), Changelog('data-table-changelog')
---

The DataTable component simplifies the creation of tabular data. It uses CSS flex for layout and does not rely on native tables.

## Simple usage example

To create a table, provide columns with titles using `<DataTable.Column name={name}/>` and data with `data={data}` .

::: tip
`<DataTable.Column/>` must be a child component of `<DataTable.Head/>`

:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/base.tsx'; 
</script>

:::

## Scroll in table

`<DataTable/>` , `<DataTable.Head/>` , and `<DataTable.Body/>` are inherited from the Box component and accept all its parameters. `<DataTable/>` serves as a container for `<DataTable.Head/>` and `<DataTable.Body/>` where scrolling is implemented.

::: tip
If horizontal scrolling is not visible, try reducing the window size
:::

By default, scrolling is displayed at the bottom of the table, but it can also be added to the table header. Scroll in the table header is useful for very long tables with fixed columns, allowing users to scroll more conveniently without reaching the end. For examples, refer to the [Fixed header section](/table-group/data-table/data-table#fixed_header).

::: sandbox

<script lang="tsx">
  export Demo from './examples/scroll-in-table.tsx'; 
</script>

:::

## Customizing header

You can insert tooltips, selectors, and other components into the table header using the `children` property.

::: sandbox

<script lang="tsx">
  export Demo from './examples/customizing-header.tsx'; 
</script>

:::

## Column sizes

Columns are inherited from the `Flex` component and accept its parameters, such as `flex` , `wMin` , and `wMax` , to adjust the column width.

::: sandbox

<script lang="tsx">
  export Demo from './examples/column-sizes.tsx'; 
</script>

:::

## Column alignment

Columns and cells inherit properties from the `Flex` component, so you can use `justifyContent` and `alignItems` to align columns and cells. Table cells automatically inherit the same properties as the column.

::: sandbox

<script lang="tsx">
  export Demo from './examples/column-alignment.tsx'; 
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
import React from "react"; 
import DataTable, { DataTableSort } from "intergalactic/data-table"; 

type SortableColumn = Exclude<keyof typeof data[0], "keyword">; 

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>([

    "kd",
    "desc"

  ]); 
  const sortedData = React.useMemo(

    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === "asc") return a - b;
        else return b - a;
      }),
    [sort]

  ); 
  const numberFormat = React.useMemo(() => new Intl. NumberFormat("en-US"), []); 
  const currencyFormat = React.useMemo(

    () =>
      new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }),
    []

  ); 

  return (

    <DataTable data={sortedData} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" justifyContent="left" sortable />
        <DataTable.Column name="kd" children="KD,%" justifyContent="right" wMax={68} sortable />
        <DataTable.Column name="cpc" children="CPC" wMax={60} sortable />
        <DataTable.Column name="vol" children="Vol." justifyContent="left" sortable />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name="kd">
          {(_, row) => ({
            children: row.kd === -1 ? "n/a" : numberFormat.format(row.kd)
          })}
        </DataTable.Cell>
        <DataTable.Cell data={data} name="cpc">
          {(_, row) => ({
            children: row.cpc === -1 ? "n/a" : currencyFormat.format(row.cpc)
          })}
        </DataTable.Cell>
        <DataTable.Cell data={data} name="vol">
          {(_, row) => ({
            children: row.vol === -1 ? "n/a" : numberFormat.format(row.vol)
          })}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>

  ); 
}; 

const data = [
  {

    keyword: "ebay buy",
    kd: 77.8,
    cpc: 1.25,
    vol: 32500000

  }, 
  {

    keyword: "www.ebay.com",
    kd: 11.2,
    cpc: 3.4,
    vol: 65457920

  }, 
  {

    keyword: "www.ebay.com",
    kd: 10,
    cpc: 0.65,
    vol: 47354640

  }, 
  {

    keyword: "ebay buy",
    kd: -1,
    cpc: 0,
    vol: -1

  }, 
  {

    keyword: "ebay buy",
    kd: 75.89,
    cpc: 0,
    vol: 21644290

  }
]; 

</script>

:::

## Fixed header

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

## Fixed header with table loading state

For correct components overlapping, use the `SpinContainer` component with `SpinContainer.Overlay` but without `SpinContainer.Content`.
 
::: sandbox

<script lang="tsx">
  export Demo from './examples/fixed-header-with-spin-overlay.tsx'; 
</script>

:::

## Fixed columns

To fix table columns, use the `fixed` property with `<DataTable.Column/>` .

::: tip
If fixed columns are not visible in the example below, try reducing the window size.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/fixed-columns.tsx'; 
</script>

:::

## Multi-level header

Create a multi-level header by nesting columns within each other.

::: tip
`name` property is not applicable for group columns.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/multi-level-header.tsx'; 
</script>

:::

## Additional elements in header

Components added to `<DataTable.Head/>` will be inserted at the end of the header.

::: sandbox

<script lang="tsx">
  export Demo from './examples/additional-elements-in-header.tsx'; 
</script>

:::

## Header separation

Move the table header outside of the table using a portal. All functionality will work, and the table body will adjust to the header's size.

::: sandbox

<script lang="tsx">
  export Demo from './examples/header-separation.tsx'; 
</script>

:::

## Access to rows

To apply properties to a table row, use `<DataTable.Row/>` . You can use multiple `<DataTable.Row/>` to separate the business logic.

::: tip
`<DataTable.Row/>` must be a direct child component of `<DataTable.Body/>` . Do not wrap it in higher-order components, and using styled components (for example, ` ` styled(DataTable.Row)` ... ` ` `) is not allowed.
:::

You can provide `data` property for `<DataTable.Row/>` . It is not used in the component runtime but improves strict typings.

::: sandbox

<script lang="tsx">
  export Demo from './examples/access-to-rows.tsx'; 
</script>

:::

## Access to cells

Define `<DataTable.Cell/>` with the appropriate `name={name}` to apply properties to a table cell. You can use multiple `<DataTable.Cell/>` for different business logic.

`<DataTable.Cell/>` must be a direct child component of `<DataTable.Body/>` . Do not wrap it in higher-order components, and using styled components ((for example, ` ` styled(DataTable.Cell)` ... ` ` `)) is not allowed.

You can provide `data` property for `<DataTable.Cell/>` . It is not used in the component runtime but improves strict typings.

::: sandbox

<script lang="tsx">
  export Demo from './examples/access-to-cells.tsx'; 
</script>

:::

## Access to set of cells

To apply properties to multiple table cells, define `<DataTable.Cell />` with their names listed using `/` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/access-to-set-of-cells.tsx'; 
</script>

:::

## Adding additional elements to table body

Components added to `<DataTable.Body/>` will be inserted at the end of the table body. Use `z-index=1` to block fixed columns or `z-index=2` to block scrolling if needed.

::: sandbox

<script lang="tsx">
  export Demo from './examples/adding-additional-elements-to-table-body.tsx'; 
</script>

:::

## Custom footer cells

To reuse column sizes, use CSS variables like `var(--<%column-name%>_width)` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom-footer-cells.tsx'; 
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

## Table in table

We use the [example with the accordion above](/table-group/data-table/data-table#accordion_in_table).

1. Hide the table header.
2. Set "inherit" to use the size from the top table for each column.

::: sandbox

<script lang="tsx">
  export Demo from './examples/table-in-table.tsx'; 
</script>

:::

## Table in table with fixed column

We use the [example with the table above](/table-group/data-table/data-table#table_in_table).

1. Set the desired `z-index`.
2. Set the variable to block the scroll.
3. Set the variable to remove overflow.

::: sandbox

<script lang="tsx">
  export Demo from './examples/table-in-table-with-fixed-column.tsx'; 
</script>

:::

## Virtual scroll in table

Enable scroll virtualization using the `virtualScroll` property.
Note that built-in virtualization support tables with fixed-height rows only.

::: sandbox

<script lang="tsx">
  export Demo from './examples/virtual-scroll-in-table.tsx'; 
</script>

:::

## Custom rows rendering

If built-in virtualization does not meet your requirements, you can implement your own virtualization using `renderRows` prop.

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom-rows-rendering.tsx'; 
</script>

:::

## Download status

Replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with a [Spin](/components/spin/spin).

::: sandbox

<script lang="tsx">
  export Demo from './examples/download-status.tsx'; 
</script>

:::

## Skeleton in table

Add a skeleton to the table by directly substituting it in the `data` or replacing `rows` with `<DataTable.Body/>` .

::: sandbox

<script lang="tsx">
  export Demo from './examples/skeleton-in-table.tsx'; 
</script>

:::

## Columns merging

Merge two or more columns by changing the table data and using `/` to combine column keys.

::: sandbox

<script lang="tsx">
  export Demo from './examples/columns-merging.tsx'; 
</script>

:::

## Rows merging

Merge two or more rows by adding a special grouping key to the table data.

::: sandbox

<script lang="tsx">
  export Demo from './examples/rows-merging.tsx'; 
</script>

:::

## Secondary table

Use the secondary table for compactly displaying a small amount of data.

::: sandbox

<script lang="tsx">
  export Demo from './examples/secondary-table.tsx'; 
</script>

:::

## Export in image

Export the table to an image.

::: sandbox

<script lang="tsx">
  export Demo from './examples/export-in-image.tsx'; 
</script>

:::

## Compact

Reduce table cel  paddings by adding the `compact` property.

::: sandbox

<script lang="tsx">
  export Demo from './examples/compact.tsx'; 
</script>

:::

## Borders

Add borders to columns by passing the `vBorders` property to specific columns.

::: sandbox

<script lang="tsx">
  export Demo from './examples/borders.tsx'; 
</script>

:::

## Сolumn expand

The active column will expand if there isn't enough space. Fixed-width columns will not change size. 

::: tip
Be cautious with columns with a `wMax` property, as the sort icon may overlap the header text on hover, hiding part of the text.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/сolumn-expand.tsx'; 
</script>

:::
