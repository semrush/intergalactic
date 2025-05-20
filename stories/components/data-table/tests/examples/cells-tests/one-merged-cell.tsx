import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';

const data = [
    {
      'keyword/kd/cpc/vol': 'One merged ',
    },
  ];
  type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

  const Demo = () => {
    const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['keyword', 'desc']);
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

    return (
      <DataTable
        data={sortedData}
        sort={sort}
        onSortChange={setSort}
        aria-label="Sorting"
        columns={[
          { name: 'keyword', children: 'Keyword', sortable: true },
          { name: 'kd', children: 'KD,%', sortable: true },
          { name: 'cpc', children: 'CPC', sortable: true },
          { name: 'vol', children: 'Vol.', sortable: true },
        ]}
      />
    );
};

export default Demo;
