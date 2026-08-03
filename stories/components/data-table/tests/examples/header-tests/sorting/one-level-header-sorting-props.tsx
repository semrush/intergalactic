import type { NSBox } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort, DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

type BaseExampleProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;
};

export type OneLevelHeaderSortingProps = BaseExampleProps & NSBox.Props;

const Demo = (props: OneLevelHeaderSortingProps) => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['cpc', 'desc']);
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
    <DataTable<typeof data, never, never>
      data={sortedData}
      sort={sort}
      onSortChange={setSort}
      aria-label='Sorting with change sortable column size'
      defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
      use={props.use}
      compact={props.compact}
      sideIndents={props.sideIndents}
      loading={props.loading}
      wMax={props.wMax}
      h={props.h}
      headerProps={{
        sticky: props.sticky,
        withScrollBar: props.withScrollBar,
      }}
      columns={[
        { name: 'keyword', children: 'Keyword', justifyContent: 'left', sortable: true },
        {
          name: 'kd',
          children: 'KD %',
          justifyContent: 'right',
          gtcWidth: 'minmax(0, 68px)',
          sortable: true,
        },
        {
          name: 'cpc',
          children: 'CPC',
          gtcWidth: 'minmax(0, 60px)',
          sortable: true,
          changeSortSize: true,
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

export const oneLevelHeaderSortingProps: OneLevelHeaderSortingProps = {
  sideIndents: undefined,
  use: undefined,
  compact: undefined,
  h: undefined,
  wMax: '600px',
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
};

Demo.defaultProps = oneLevelHeaderSortingProps;

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
