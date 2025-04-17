import React from 'react';
import { NoData } from '@semcore/widget-empty';
import Button from '@semcore/button';
import { DataTable, DataTableSort } from '@semcore/data-table';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;
const data = [
    {
      'keyword/kd/cpc/vol': 'One merged ',
    },
  ];

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort],
  );
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
  const currencyFormat = React.useMemo(
    () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );
  const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (newSort) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };
  return (
    <DataTable data={sortedData} sort={sort} onSortChange={handleSortChange} aria-label={'Sorting'}>
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Keyword' sortable/>
        <DataTable.Head.Column name='kd' children='KD,%' sortable/>
        <DataTable.Head.Column name='cpc' children='CPC' sortable/>
        <DataTable.Head.Column name='vol' children='Vol.' sortable/>
      </DataTable.Head>
      <DataTable.Body
      />
    </DataTable>
  );
};

export default Demo;
