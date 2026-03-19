import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

type SortableColumn = 'kd' | 'cpc' | 'vol';

type ColumnName = keyof (typeof data)[0];

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<ColumnName>>(['kd', 'desc']);

  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        return a > b ? -1 : 1;
      }),
    [sort],
  );

  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0' }}>Spacer above</div>
      <DataTable
        data={sortedData}
        sort={sort}
        onSortChange={setSort}
        aria-label='Sorting with sticky header'
        wMax='400px'
        headerProps={{
          sticky: true,
          withScrollBar: true,
        }}
        columns={[
          { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
          { name: 'kd', children: 'KD,%', gtcWidth: '200px', sortable: true },
          { name: 'cpc', children: 'CPC', gtcWidth: '200px', sortable: true },
          { name: 'vol', children: 'Vol.', gtcWidth: '200px', sortable: true },
        ]}
      />
      <div style={{ height: '400px', background: '#f0f0f0' }}>Spacer below</div>
    </>
  );
};

const data = [
  { keyword: 'ebay buy', kd: 77.8, cpc: 1.25, vol: 32500000 },
  { keyword: 'www.ebay.com', kd: 11.2, cpc: 3.4, vol: 65457920 },
  { keyword: 'www.ebay.com', kd: 10, cpc: 0.65, vol: 47354640 },
  { keyword: 'ebay buy', kd: 0, cpc: 0, vol: 0 },
  { keyword: 'ebay buy', kd: 75.89, cpc: 0, vol: 21644290 },
  { keyword: 'www.ebay.com', kd: 10, cpc: 0.65, vol: 47354640 },
];

export default Demo;
