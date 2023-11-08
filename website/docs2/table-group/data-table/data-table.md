---
title: DataTable code and API
fileSource: data-table
tabs: Example('data-table'), API('data-table-api'), Changelog('data-table-changelog')
---

The DataTable component is needed to simplify the construction of tabular data. The table is based on `CSS-flex` technology and doesn't use native tables.

## Simple usage example

To build a table, we must provide columns with titles `<DataTable.Column name={name}/>` and data `data={data}`.

::: tip
`<DataTable.Column/>` must be a child component of `<DataTable.Head/>`.
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

## Scroll in the table

`<DataTable/>`, `<DataTable.Head/>`, `<DataTable.Body/>` are inherited from the `Box` component and accept all its parameters. `<DataTable/>` is a wrapper for `<DataTable.Head/>`, `<DataTable.Body />`, where scrolls are implemented.

::: tip
If you don't see horizontal scrolling in the example, reduce the window size.
:::

As you can see the most common case is scroll showed at the bottom of the table. But you can add it to the table header either. Scroll in the table header is needed exclusively for cases when the table is very long (or potentially long) and it has fixed columns so that the user can scroll more conveniently without scrolling to the very end. In such cases, the scroll can be either in the header and at the bottom of the table. Refer to the examples in the [Fixed header section](/table-group/data-table/data-table#fixed_header).

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

## Customizing the header

You can use `children` to insert tooltips, selectors, and other components in the header.

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

## The size of the columns

Columns are inherited from the `Flex` component and accept all its parameters. With `flex`, `wMin`, `wMax`, you can flexibly adjust the column width.

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

## The alignment of the columns

Since columns and cells are inherited from the `Flex` component, you can use `justifyContent/alignItems` to align the column to the desired edge. This property is automatically applied to table cells.

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

If you can sort by column, then:

1. Specify the `sortable` property on the column;
2. Subscribe to `onSortChange`;
3. Pass the `sort` property to the table.
4. Sort data, provided to `data` property.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable, { DataTableSort } from '@semcore/ui/data-table';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a - b;
        else return b - a;
      }),
    [sort],
  );
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
  const currencyFormat = React.useMemo(
    () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );

  return (
    <DataTable data={sortedData} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' sortable />
        <DataTable.Column name='cpc' children='CPC' sortable />
        <DataTable.Column name='vol' children='Vol.' sortable />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='kd'>
          {(_, row) => ({ children: row.kd === -1 ? 'n/a' : numberFormat.format(row.kd) })}
        </DataTable.Cell>
        <DataTable.Cell data={data} name='cpc'>
          {(_, row) => ({
            children: row.cpc === -1 ? 'n/a' : currencyFormat.format(row.cpc),
          })}
        </DataTable.Cell>
        <DataTable.Cell data={data} name='vol'>
          {(_, row) => ({ children: row.vol === -1 ? 'n/a' : numberFormat.format(row.vol) })}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: 77.8,
    cpc: 1.25,
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
    kd: -1,
    cpc: 0,
    vol: -1,
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

## Fixed header

To fix the table header, use the `<Box position="sticky" top={top} />` component.

::: tip
Set `zIndex=2` for correct display.
:::

Note that scroll in the table header is needed exclusively for cases when the table is very long (or potentially long) and it has fixed columns so that the user can scroll more conveniently without scrolling to the very end. In such cases, the scroll can be either in the header and at the bottom of the table.

::: sandbox

<script lang="tsx">
import React from 'react';
import DataTable from '@semcore/ui/data-table';
import { Box } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

const Demo = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [container, setContainer] = React.useState(null);
  const [top, setTop] = React.useState(0);
  React.useEffect(() => {
    containerRef.current &&
      setContainer(containerRef.current.closest('[data-ui-name="ScrollArea.Container"]'));
    const header = document.getElementsByTagName('header')[0];
    header && setTop(header.offsetHeight);
  }, []);
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

To fix table columns, pass the `fixed` property to `<DataTable.Column/>`.

::: tip
If you don't see fixed columns in the example, reduce the window size.
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

To create a multi-level header, insert columns into each other. However, the `name` isn’t applicable for the group column.

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

## Adding additional elements to the header

If you add custom components to `<DataTable.Head/>`, they will be inserted at the end of the header.

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

Sometimes we need to move the table header outside of the table, this can be done using the portal. All functionality will work, the table body will adjust to the size of the header.

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
      <div ref={portalRef} />
      <Divider my={5} />
      <DataTable data={data}>
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

## Access to Row

To apply some properties to a table row, you need to define `<DataTable.Row/>`. You can use multiple `<DataTable.Row/>` to separate the business logic.

::: tip
`<DataTable.Row/>` must be a direct child component of `<DataTable.Body/>`.

It shouldn't be wrapped in any kind of HOC, using styled components (for example, `` styled(DataTable.Row)`...` ``) isn’t allowed.
:::

::: tip
You can provide `data` property for `<DataTable.Row/>`. It is not used in the component runtime but improves strict typings. 
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

## Access to Cell

To apply some properties to a table cell, you need to define `<DataTable.Cell/>` with the appropriate `name={name}`. You can use multiple `<DataTable.Cell/>` for separating business logic.

::: tip
`<DataTable.Cell/>` must be a direct  child component of `<DataTable.Body/>`.

It shouldn't be wrapped in any kind of HOC, using styled components (for example, `` styled(DataTable.Cell)`...` ``) isn’t allowed.
:::

::: tip
You can provide `data` property for `<DataTable.Cell/>`. It is not used in the component runtime but improves strict typings. 
:::

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

## Access to a set of cells

To apply properties to multiple table cells, you need to define `<DataTable.Cell />` with their names listed via `/`.

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

## Adding additional elements to the table body

When adding custom components to `<DataTable.Body/>` they will be inserted at the end of the table body.

::: tip
To block fixed columns , you need to specify `z-index=1` to block scrolling, you need to specify `z-index=2`.
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

To reuse size of columns, use css variables `var(--<%column-name%>_width)`.

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

## Accordion in the table

We use the `@semcore/ui/accordion` component to extend the functionality of the string.

1. Wrapping the table in the `Accordion` control component;
2. Replacing the tag in `DataTable.Row` with our extended tag with `Accordion.Item`;
3. Setting the value for `Accordion.Item`;
4. Calculating the active line to highlight it;
5. Render the children to accordion content;
6. Set the arrow (Chevron icon), if necessary.

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

We use the example with [the accordion above](/table-group/data-table/data-table#accordion_in_the_table).

1. Hide the table header;
2. Set "inherit" to use the size from the top table for each column;

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

We use the example with [the table above](/table-group/data-table/data-table#table_in_table).

1. Set the desired z-index;
2. Set the variable to block the scroll;
3. Set the variable to remove overflow

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

## Virtual scroll in the table

Use `virtualScroll` property to enable scroll virtualization.

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

You can replace the `tag` property with `<DataTable.Body/>` on the `SpinContainer` to cover the table with the spinner.

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

## Skeleton in the table

You can substitute the skeleton directly in `data`, but you can also replace `rows` with `<DataTable .Body/>`.

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

## Merging columns

To combine two or more columns, we can change the table data by combining the column keys via `/`.

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

## Row merging

To merge two or more rows, we can change the table data by adding a special grouping key.

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

You can use secondary table for compact displaying small amount of data inside widgets.

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

To make the table with smaller indents you need to add `compact` property.

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

To add a border to a column, you need to pass `vBorders` properties to that column.

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

The active column will expand if there isn’t enough space. Fixed width columns will not change size. If a column width limit is set using `wMax` prop, then the sort icon on hover will run over the text in the column header, and the non-fitting part of the text will not be visible.

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

