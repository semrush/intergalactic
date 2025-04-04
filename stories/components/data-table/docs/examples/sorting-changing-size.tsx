import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';

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
    <DataTable<typeof data>
      data={sortedData}
      sort={sort}
      onSortChange={setSort}
      aria-label={'Sorting with change sortable column size'}
    >
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Keyword' justifyContent='left' sortable />
        <DataTable.Head.Column name='kd' children='KD,%' justifyContent='right' gtcWidth={'minmax(0, 68px)'} sortable />
        <DataTable.Head.Column name='cpc' children='CPC' gtcWidth={'minmax(0, 60px)'} sortable changeSortSize />
        <DataTable.Head.Column name='vol' children='Vol.' gtcWidth={'minmax(0, 120px)'} justifyContent='left' sortable />
      </DataTable.Head>
      <DataTable.Body
          renderCell={(props) => {
            if (props.name === 'keyword') {
              return props.defaultRender();
            }

            const value = props.defaultRender();

            return typeof value === 'number' && value !== -1
                ? (
                    props.name === 'cpc' ? currencyFormat.format(value) : numberFormat.format(value)
                )
                : 'n/a';
          }}
      />
    </DataTable>
  );
};

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
