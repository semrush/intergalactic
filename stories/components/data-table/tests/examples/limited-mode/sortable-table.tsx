import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import { DataTable } from '@semcore/data-table';
import type { DataTableSort, DataTableProps } from '@semcore/data-table';
import { Text } from '@semcore/typography';
import React from 'react';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

export type SortTableProps = {
  use: DataTableProps<typeof data, any, any>['use'];
  rowsLimit?: number;
  columnsLimit?: number;
  changeSortSize?: boolean;
};

const Demo = (props: SortTableProps) => {
  const { rowsLimit, columnsLimit } = props;

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
    <DataTable
      limit={{
        fromRow: rowsLimit,
        fromColumn: columnsLimit,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
              <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
              <Text size={200} textAlign='center'>
                To increase your daily report limit,upgrade to a Guru plan.
              </Text>
              <Button
                theme='success'
                use='primary'
              >
                Upgrade to Guru
              </Button>

            </Flex>
          );
        },
      }}
      data={sortedData}
      sort={sort}
      use={props.use}
      onSortChange={setSort}
      aria-label='Expanding sortable column'
      columns={[
        { name: 'keyword', children: 'Keyword', justifyContent: 'left', sortable: true },
        {
          name: 'kd',
          children: 'KD %',
          justifyContent: 'right',
          gtcWidth: 'minmax(0, 68px)',
          style: { whiteSpace: 'nowrap' },
          borders: 'both',
          sortable: true,
          changeSortSize: props.changeSortSize,
        },
        {
          name: 'cpc',
          children: 'CPC',
          gtcWidth: 'minmax(60px, 66px)',
          borders: 'right',
          sortable: true,
          changeSortSize: props.changeSortSize,
        },
        {
          name: 'vol',
          children: 'Vol.',
          gtcWidth: 'minmax(0, 120px)',
          justifyContent: 'left',
          sortable: true,
        },
      ]}
      renderCell={(props) => {
        if (props.columnName === 'keyword') {
          return props.defaultRender();
        }

        const rawValue = props.row[props.columnName as SortableColumn];

        return typeof rawValue === 'number' && rawValue !== -1
          ? props.columnName === 'cpc'
            ? currencyFormat.format(rawValue)
            : numberFormat.format(rawValue)
          : 'n/a';
      }}
    />
  );
};
export const sortTableProps: SortTableProps = {
  use: 'primary',
  columnsLimit: 0,
  rowsLimit: 1,
  changeSortSize: true,
};

Demo.defaultProps = sortTableProps;

export default Demo;

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
