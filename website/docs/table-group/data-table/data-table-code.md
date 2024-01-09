---
title: DataTable
fileSource: data-table
tabs: Design('data-table'), Example('data-table-code'), API('data-table-api'), A11y('data-table-a11y'),  Changelog('data-table-changelog')
---

The DataTable component simplifies the creation of tabular data. It uses CSS flex for layout and does not rely on native tables.

## Simple usage example

To create a table, provide columns with titles using `<DataTable.Column name={name}/>` and data with `data={data}`.

::: tip
`<DataTable.Column/>` must be a child component of `<DataTable.Head/>`
:::

::: sandbox

<script lang="tsx" src="examples/base.tsx"></script>

:::

## Scroll in table

`<DataTable/>`, `<DataTable.Head/>`, and `<DataTable.Body/>` are inherited from the Box component and accept all its parameters. `<DataTable/>` serves as a container for `<DataTable.Head/>` and `<DataTable.Body/>` where scrolling is implemented.

::: tip
If horizontal scrolling is not visible, try reducing the window size
:::

By default, scrolling is displayed at the bottom of the table, but it can also be added to the table header. Scroll in the table header is useful for very long tables with fixed columns, allowing users to scroll more conveniently without reaching the end. For examples, refer to the [Fixed header section](/table-group/data-table/data-table#fixed_header).

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head wMin={1000}>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body hMax={200} />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Customizing header

You can insert tooltips, selectors, and other components into the table header using the `children` property.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import { LinkTrigger } from '@semcore/ui/base-trigger';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword'>
          <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
            <Text noWrap>
              Keyword <Text color='text-secondary'>(1 - 100)</Text>
            </Text>
          </Tooltip>
        </DataTable.Column>
        <DataTable.Column name='kd'>
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <LinkTrigger color='text-primary' style={{ fontSize: '12px' }}>
                KD,%
              </LinkTrigger>
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>Options 1</DropdownMenu.Item>
              <DropdownMenu.Item>Options 2</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DataTable.Column>
        <DataTable.Column name='cpc'>
          <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
            CPC
          </Tooltip>
        </DataTable.Column>
        <DataTable.Column name='vol'>
          <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
            Vol.
          </Tooltip>
        </DataTable.Column>
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Column sizes

Columns are inherited from the `Flex` component and accept its parameters, such as `flex`, `wMin`, and `wMax`, to adjust the column width.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' wMin={100} flex='1 0 auto' />
        <DataTable.Column name='kd' children='KD,%' flex='0' wMin={100} />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Column alignment

Columns and cells inherit properties from the `Flex` component, so you can use `justifyContent` and `alignItems` to align columns and cells. Table cells automatically inherit the same properties as the column.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' justifyContent='flex-end' />
        <DataTable.Column name='cpc' children='CPC' justifyContent='flex-end' />
        <DataTable.Column name='vol' children='Vol.' justifyContent='flex-end' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
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
import DataTable, { DataTableSort } from "@semcore/ui/data-table";

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
  const numberFormat = React.useMemo(() => new Intl.NumberFormat("en-US"), []);
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
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import { Box } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

const Demo = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [container, setContainer] = React.useState(null);
  const top = 0; // Here should be height of Header in your application

  return (
    <>
      <DataTable data={data}>
        <Box position='sticky' top={top} zIndex={2}>
          <DataTable.Head wMin={1000}>
            <DataTable.Column name='keyword' children='Keyword' />
            <DataTable.Column name='kd' children='KD,%' />
            <DataTable.Column name='cpc' children='CPC' />
            <DataTable.Column name='vol' children='Vol.' />
          </DataTable.Head>
        </Box>
        <DataTable.Body />
      </DataTable>
      <h3>with Scroll.Bar in Header</h3>
      <DataTable data={data}>
        <Box position='sticky' top={top} zIndex={2}>
          <DataTable.Head wMin={1000} ref={containerRef}>
            <DataTable.Column name='keyword' children='Keyword' />
            <DataTable.Column name='kd' children='KD,%' />
            <DataTable.Column name='cpc' children='CPC' />
            <DataTable.Column name='vol' children='Vol.' />
          </DataTable.Head>
          {container && <ScrollArea.Bar container={container} />}
        </Box>
        <DataTable.Body />
      </DataTable>
    </>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Fixed columns

To fix table columns, use the `fixed` property with `<DataTable.Column/>`.

::: tip
If fixed columns are not visible in the example below, try reducing the window size.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head wMin={1000}>
        <DataTable.Column name='keyword' children='Keyword' fixed='left' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' fixed='right' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Multi-level header

Create a multi-level header by nesting columns within each other.

::: tip
`name` property is not applicable for group columns.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column vBorders wMax={'40%'}>
          Organic Sessions
          <DataTable.Column name='kd' children='KD,%' />
          <DataTable.Column name='cpc' children='CPC' />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Column>
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Additional elements in header

Components added to `<DataTable.Head/>` will be inserted at the end of the header.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import ProgressBar from '@semcore/ui/progress-bar';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
        <ProgressBar value={40} size='s' style={{ borderRadius: 0 }}>
          <ProgressBar.Value style={{ borderRadius: 0 }} />
        </ProgressBar>
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Header separation

Move the table header outside of the table using a portal. All functionality will work, and the table body will adjust to the header's size.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Divider from '@semcore/ui/divider';
import Portal, { PortalProvider } from '@semcore/ui/portal';

const Demo = () => {
  const portalRef = React.useRef(null);
  return (
    <>
      <div style={{ border: '1px solid' }} ref={portalRef} />
      <Divider my={5} />
      <DataTable style={{ border: '1px solid' }} data={data}>
        <PortalProvider value={portalRef}>
          <Portal>
            <DataTable.Head>
              <DataTable.Column name='keyword' children='Keyword' />
              <DataTable.Column name='kd' children='KD,%' />
              <DataTable.Column name='cpc' children='CPC' />
              <DataTable.Column name='vol' children='Vol.' />
            </DataTable.Head>
          </Portal>
        </PortalProvider>
        <DataTable.Body />
      </DataTable>
    </>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Access to rows

To apply properties to a table row, use `<DataTable.Row/>`. You can use multiple `<DataTable.Row/>` to separate the business logic.

::: tip
`<DataTable.Row/>` must be a direct child component of `<DataTable.Body/>`. Do not wrap it in higher-order components, and using styled components (for example, `` styled(DataTable.Row)`...` ``) is not allowed.
:::

You can provide `data` property for `<DataTable.Row/>`. It is not used in the component runtime but improves strict typings.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Row data={data}>
          {(props, row) => {
            return {
              theme: row['kd'] === '-' ? 'warning' : props.theme,
            };
          }}
        </DataTable.Row>
        <DataTable.Row data={data}>
          {(props, row, index) => {
            return {
              style: {
                cursor: 'pointer',
              },
              onClick: () => {
                alert(`Click row
                  props: ${JSON.stringify(Object.keys(props), null, '  ')};
                  row: ${JSON.stringify(row, null, '  ')};
                  index: ${index};`);
              },
              onKeyDown: (event) => {
                if (event.key === ' ' || event.key === 'Enter')
                  alert(`Click row
                    props: ${JSON.stringify(Object.keys(props), null, '  ')};
                    row: ${JSON.stringify(row, null, '  ')};
                    index: ${index};`);
              },
            };
          }}
        </DataTable.Row>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Access to cells

Define `<DataTable.Cell/>` with the appropriate `name={name}` to apply properties to a table cell. You can use multiple `<DataTable.Cell/>` for different business logic.

`<DataTable.Cell/>` must be a direct child component of `<DataTable.Body/>`. Do not wrap it in higher-order components, and using styled components ((for example, `` styled(DataTable.Cell)`...` ``)) is not allowed.

You can provide `data` property for `<DataTable.Cell/>`. It is not used in the component runtime but improves strict typings.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='keyword'>
          {(props, row) => {
            return {
              children: <Link>{row[props.name]}</Link>,
            };
          }}
        </DataTable.Cell>
        <DataTable.Cell data={data} name='keyword'>
          {(props, row, index) => {
            return {
              style: {
                cursor: 'pointer',
              },
              onClick: () => {
                alert(`Click row 
                  props: ${JSON.stringify(Object.keys(props), null, '  ')};
                  row: ${JSON.stringify(row, null, '  ')};
                  index: ${index};`);
              },
              onKeyDown: (event) => {
                if (event.key === ' ' || event.key === 'Enter')
                  alert(`Click row 
                    props: ${JSON.stringify(Object.keys(props), null, '  ')};
                    row: ${JSON.stringify(row, null, '  ')};
                    index: ${index};`);
              },
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Access to set of cells

To apply properties to multiple table cells, define `<DataTable.Cell />` with their names listed using `/`.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Spin from '@semcore/ui/spin';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='keyword/kd/cpc/vol'>
          {(props, row) => {
            return {
              children: ['-', '$0', 'n/a'].includes(row[props.name]) ? <Spin /> : props.children,
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Adding additional elements to table body

Components added to `<DataTable.Body/>` will be inserted at the end of the table body. Use `z-index=1` to block fixed columns or `z-index=2` to block scrolling if needed.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: 'calc(45px * 2)',
            left: 0,
            bottom: 0,
            background:
              'linear-gradient(45deg, rgba(255, 187, 51, 0.3) 25%, rgba(85, 136, 170, 0.3) 0px, rgba(85, 136,' +
              ' 170, 0.3)' +
              ' 50%,' +
              ' rgba(255, 187, 51, 0.3) 0px, rgba(255, 187, 51, 0.3) 75%, rgba(85, 136, 170, 0.3) 0px) 0% 0% / 42px 42px',
            zIndex: 2,
          }}
        />
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Custom footer cells

To reuse column sizes, use CSS variables like `var(--<%column-name%>_width)`.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import { Box, Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <Flex>
          <Box p={3} style={{ width: 'var(--keyword_width)' }}>
            Summary
          </Box>
          <Box p={3} style={{ width: 'var(--kd_width)' }} />
          <Box p={3} style={{ width: 'var(--cpc_width)' }}>
            {data.reduce((sum, row) => sum + row.cpc, 0)}
          </Box>
          <Box p={3} style={{ width: 'var(--vol_width)' }}>
            {data.reduce((sum, row) => sum + row.vol, 0)}
          </Box>
        </Flex>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: 77.8,
    cpc: 125,
    vol: 32500000,
  },
  {
    keyword: 'www.ebay.com',
    kd: 11.2,
    cpc: 3.4,
    vol: 65457920,
  },
  {
    keyword: 'www.ebay.com',
    kd: 10,
    cpc: 0.65,
    vol: 47354640,
  },
  {
    keyword: 'ebay buy',
    kd: 0,
    cpc: 0,
    vol: 0,
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: 0,
    vol: 21644290,
  },
];
</script>

:::

## Accordion inside table

Extend table functionality using the `@semcore/ui/accordion` component. This allows you to add accordions to table rows.

1. Wrap the table in the `Accordion` component.
2. Replace the tag in `DataTable.Row` with our extended tag using `Accordion.Item`.
3. Define a value for `Accordion.Item`.
4. Calculate the active line to highlight.
5. Render the children as accordion content.
6. Add the arrow (`ChevronRight` icon) if needed.

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear } from 'd3-scale';
import DataTable from '@semcore/ui/data-table';
import Accordion from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/flex-box';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/ui/d3-chart';

const RowAccordion = React.forwardRef(function (
  { value, collapse = {}, ...props }: any,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Accordion.Item value={value} ref={ref}>
      <Accordion.Item.Toggle {...props} />
      <Accordion.Item.Collapse {...collapse} />
    </Accordion.Item>
  );
});

const Demo = () => {
  const [exapnded, setExapnded] = React.useState<number[]>([]);

  return (
    /* [1] Wrapping the table in the Accordion control component; */
    <Accordion value={exapnded} onChange={setExapnded}>
      <DataTable data={data}>
        <DataTable.Head>
          <DataTable.Column name='keyword' children='Keyword' />
          <DataTable.Column name='kd' children='KD,%' />
          <DataTable.Column name='cpc' children='CPC' />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body>
          {/* [2] Replacing the tag in DataTable.Row with our extended tag with Accordion.Item */}
          <DataTable.Row tag={RowAccordion}>
            {(_props, _row, index) => {
              return {
                /* [3] Setting the value for Accordion.Item; */
                value: index,
                /* [4] Calculating the active line to highlight it */
                active: exapnded.includes(index),
                collapse: {
                  /* [5] Render the children to accordion content; */
                  children: <ChartExample />,
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell data={data} name='keyword'>
            {(props) => {
              return {
                children: (
                  <Flex alignItems='center'>
                    {/* [6] Set the arrow (Chevron icon), if necessary. */}
                    <Accordion.Item.Chevron color='icon-secondary-neutral' mr={2} />
                    {props.children}
                  </Flex>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </Accordion>
  );
};

const ChartExample = () => {
  const [[width, height], setSize] = React.useState([0, 0]);
  const MARGIN = 40;
  const dataChart = Array(20)
    .fill({})
    .map((d, i) => ({
      x: i,
      y: Math.random() * 10,
    }));
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(dataChart, 'x'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);
  return (
    <ResponsiveContainer h={300} onResize={setSize}>
      <Plot data={dataChart} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
    </ResponsiveContainer>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Table in table

We use the [example with the accordion above](/table-group/data-table/data-table#accordion_in_table).

1. Hide the table header.
2. Set "inherit" to use the size from the top table for each column.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Accordion from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/flex-box';

const RowAccordion = React.forwardRef(
  ({ value, collapse = {}, ...props }: any, ref: React.Ref<HTMLDivElement>) => {
    return (
      <Accordion.Item value={value} ref={ref}>
        <Accordion.Item.Toggle {...props} />
        <Accordion.Item.Collapse {...collapse} />
      </Accordion.Item>
    );
  },
);

const Demo = () => {
  const [value, setValue] = React.useState<number[]>([]);

  return (
    <Accordion value={value} onChange={setValue}>
      <DataTable data={data}>
        <DataTable.Head>
          <DataTable.Column name='keyword' children='Keyword' />
          <DataTable.Column name='kd' children='KD,%' />
          <DataTable.Column name='cpc' children='CPC' />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Row tag={RowAccordion}>
            {(_props, _row, index) => {
              return {
                value: index,
                active: value.includes(index),
                collapse: {
                  children: (
                    <DataTable data={data}>
                      {/* [1] Hide the table header */}
                      <DataTable.Head hidden>
                        {/* [2] Set "inherit" to use the size from the top table for each column. */}
                        <DataTable.Column name='keyword' flex='inherit' />
                        <DataTable.Column name='kd' flex='inherit' />
                        <DataTable.Column name='cpc' flex='inherit' />
                        <DataTable.Column name='vol' flex='inherit' />
                      </DataTable.Head>
                      <DataTable.Body />
                    </DataTable>
                  ),
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell data={data} name='keyword'>
            {(props) => {
              return {
                children: (
                  <Flex alignItems='center'>
                    <Accordion.Item.Chevron color='icon-secondary-neutral' mr={2} />
                    {props.children}
                  </Flex>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </Accordion>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Table in table with fixed column

We use the [example with the table above](/table-group/data-table/data-table#table_in_table).

1. Set the desired `z-index`.
2. Set the variable to block the scroll.
3. Set the variable to remove overflow.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Accordion from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/flex-box';

const RowAccordion = React.forwardRef(
  ({ value, collapse = {}, ...props }: any, ref: React.Ref<HTMLDivElement>) => {
    return (
      <Accordion.Item value={value} ref={ref}>
        <Accordion.Item.Toggle {...props} />
        <Accordion.Item.Collapse {...collapse} />
      </Accordion.Item>
    );
  },
);

const Demo = () => {
  const [value, setValue] = React.useState([]);
  return (
    <Accordion value={value} onChange={setValue}>
      <DataTable data={data}>
        <DataTable.Head wMin={1000}>
          <DataTable.Column name='keyword' children='Keyword' fixed='left' />
          <DataTable.Column name='kd' children='KD,%' />
          <DataTable.Column name='cpc' children='CPC' />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Row tag={RowAccordion}>
            {(_props, _row, index) => {
              return {
                value: index,
                active: value.includes(index),
                collapse: {
                  children: (
                    <DataTable data={data}>
                      {/* [1] Set the desired z-index */}
                      <DataTable.Head hidden z-index={1}>
                        <DataTable.Column name='keyword' flex='inherit' fixed='left' />
                        <DataTable.Column name='kd' flex='inherit' />
                        <DataTable.Column name='cpc' flex='inherit' />
                        <DataTable.Column name='vol' flex='inherit' />
                      </DataTable.Head>
                      {/* [2] Set a variable to block the scroll */}
                      <DataTable.Body disabledScroll />
                    </DataTable>
                  ),
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell data={data} name='keyword'>
            {(props) => {
              return {
                children: (
                  <Flex alignItems='center'>
                    <Accordion.Item.Chevron color='icon-secondary-neutral' mr={2} />
                    {props.children}
                  </Flex>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </Accordion>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Virtual scroll in table

Enable scroll virtualization using the `virtualScroll` property.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable, { ROW_GROUP } from '@semcore/ui/data-table';

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy'];
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    [ROW_GROUP]: [
      {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      },
    ],
  }));

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='id' children='ID' />
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column>
          Organic Sessions
          <DataTable.Column name='kd' children='KD,%' />
          <DataTable.Column name='cpc' children='CPC' />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Column>
      </DataTable.Head>
      <DataTable.Body h={400} virtualScroll />
    </DataTable>
  );
};
</script>

:::

## Download status

Replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with a [Spin](/components/spin/spin).

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import SpinContainer from '@semcore/ui/spin-container';

const Demo = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLoading(!loading);
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, [loading]);
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <SpinContainer loading={loading} style={{ overflow: 'initial' }}>
        <DataTable.Body />
      </SpinContainer>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Skeleton in table

Add a skeleton to the table by directly substituting it in the `data` or replacing `rows` with `<DataTable.Body/>`.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import Skeleton from '@semcore/ui/skeleton';

function getSkeleton() {
  return ['keyword', 'kd', 'cpc', 'vol'].map((c) => ({
    cssVar: `--${c}_width`,
    name: c,
    data: (
      <Skeleton height={17}>
        <Skeleton.Text y='5' width='60%' />
      </Skeleton>
    ),
  }));
}

const Demo = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setLoading(!loading);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [loading]);
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body
        {...(loading ? { rows: [getSkeleton(), getSkeleton(), getSkeleton()] } : {})}
      />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
];
</script>

:::

## Columns merging

Merge two or more columns by changing the table data and using `/` to combine column keys.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const data = [
  {
    keyword: 'ebay buy',
    'kd/cpc/vol': 'This is columns group. This is columns group. This is columns group.',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};
</script>

:::

## Rows merging

Merge two or more rows by adding a special grouping key to the table data.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable, { ROW_GROUP } from '@semcore/ui/data-table';

const data = [
  {
    keyword: 'ebay buy',
    [ROW_GROUP]: [
      {
        kd: '77.8',
        cpc: '$1.25',
        vol: '32,500,000',
      },
      {
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
      },
      {
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
      },
    ],
  },
  {
    keyword: 'www.ebay.com',
    [ROW_GROUP]: [
      {
        kd: '11.2',
        cpc: '$3.4',
        vol: '65,457,920',
      },
      {
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640',
      },
    ],
  },
];

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};
</script>

:::

## Secondary table

Use the secondary table for compactly displaying a small amount of data.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data} use='secondary' sort={['kd', 'desc']}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' sortable />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Export in image

Export the table to an image.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import Button from '@semcore/ui/button';
import FileExportM from '@semcore/ui/icon/FileExport/m';
import DataTable from '@semcore/ui/data-table';

const extensions = ['png', 'jpeg', 'webp'];

const Demo = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const width = 500;
  const height = 300;

  const downloadImage = React.useCallback(
    (extention: string) => async () => {
      const svgElement = svgRef.current;
      let svgText = svgElementToSvgText(svgElement);
      svgText = svgText.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgText = svgText.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      const downloadUrl = await svgText2DownloadUrl(svgText, 2 * width, 2 * height, extention);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `image.${extention}`;

      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );

      setTimeout(() => {
        link.remove();
      }, 100);
    },
    [],
  );

  return (
    <Flex>
      <svg ref={svgRef} xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
        <foreignObject width='100%' height='100%'>
          <DataTable data={data}>
            <DataTable.Head>
              <DataTable.Column name='keyword' children='Keyword' />
              <DataTable.Column name='kd' children='KD,%' />
              <DataTable.Column name='cpc' children='CPC' />
              <DataTable.Column name='vol' children='Vol.' />
            </DataTable.Head>
            <DataTable.Body />
          </DataTable>
        </foreignObject>
      </svg>
      <DropdownMenu>
        <DropdownMenu.Trigger tag={Button} ml={4}>
          <Button.Addon>
            <FileExportM />
          </Button.Addon>
          <Button.Text>Export</Button.Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Popper wMax='257px'>
          <DropdownMenu.List>
            {extensions.map((name) => (
              <DropdownMenu.Item key={name} onClick={downloadImage(name)}>
                {name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.List>
        </DropdownMenu.Popper>
      </DropdownMenu>
    </Flex>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

const getCSSStyles = (parentElement: Element) => {
  const selectorTextArr: string[] = [];

  for (let c = 0; c < parentElement.classList.length; c++) {
    if (!selectorTextArr.includes(`.${parentElement.classList[c]}`))
      selectorTextArr.push(`.${parentElement.classList[c]}`);
  }

  // Add Children element Ids and Classes to the list
  const nodes = parentElement.getElementsByTagName('*');
  for (let i = 0; i < nodes.length; i++) {
    const id = nodes[i].id;
    if (!selectorTextArr.includes(`#${id}`)) selectorTextArr.push(`#${id}`);

    const classes = nodes[i].classList;
    for (let c = 0; c < classes.length; c++)
      if (!selectorTextArr.includes(`.${classes[c]}`)) selectorTextArr.push(`.${classes[c]}`);
  }

  // Extract CSS Rules
  let extractedCSSText = '';
  for (let i = 0; i < document.styleSheets.length; i++) {
    const s = document.styleSheets[i];

    try {
      if (!s.cssRules) continue;
    } catch (e) {
      if (e.name !== 'SecurityError') throw e; // for Firefox
      continue;
    }

    const cssRules: any = s.cssRules;
    for (let r = 0; r < cssRules.length; r++) {
      if (
        cssRules[r].selectorText &&
        selectorTextArr.some((s) => cssRules[r].selectorText.includes(s))
      )
        extractedCSSText += cssRules[r].cssText;
    }
  }
  return extractedCSSText;
};

const appendCSS = (cssText: string, element: Element) => {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = cssText;
  const refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore(styleElement, refNode);
};

const svgElementToSvgText = (svgNode: Element) => {
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  const cssStyleText = getCSSStyles(svgNode);
  appendCSS(cssStyleText, svgNode);

  const serializer = new XMLSerializer();

  const svgString = serializer.serializeToString(svgNode);

  return svgString;
};

const svgText2DownloadUrl = async (svg: string, width: number, height: number, format: string) =>
  new Promise<string>((resolve, reject) => {
    const imgsrc = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      const img = canvas.toDataURL(`image/${format}`);
      resolve(img);
    };
    image.onerror = reject;

    image.src = imgsrc;
  });
</script>

:::

## Compact

Reduce table cel  paddings by adding the `compact` property.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';

const Demo = () => {
  return (
    <DataTable data={data} compact>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
</script>

:::

## Borders

Add borders to columns by passing the `vBorders` property to specific columns.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable, { DataTableSort } from '@semcore/ui/data-table';

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['cpc', 'desc']);

  return (
    <DataTable data={data} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' sortable />
        <DataTable.Column vBorders>
          Organic Sessions
          <DataTable.Column name='kd' children='KD' sortable />
          <DataTable.Column name='cpc' children='CPC' sortable />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Column>
        <DataTable.Column name='other' children='Other' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'ebay buy',
  },
];
</script>

:::

## Сolumn expand

The active column will expand if there isn't enough space. Fixed-width columns will not change size. 

::: tip
Be cautious with columns with a `wMax` property, as the sort icon may overlap the header text on hover, hiding part of the text.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable, { DataTableSort } from '@semcore/ui/data-table';

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['cpc', 'desc']);

  return (
    <DataTable data={data} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' wMax={'300px'} />
        <DataTable.Column name='kd' children='Difficulty Difficulty' sortable wMax={'85px'} />
        <DataTable.Column name='cpc' children='CPC' sortable />
        <DataTable.Column name='vol' children='Vol.' sortable wMax={'300px'} />
        <DataTable.Column name='md' children='Marketing SEO' sortable wMax={'90px'} />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    md: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    md: '221',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    md: '221',
  },
];
</script>

:::

