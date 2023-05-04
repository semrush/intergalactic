import React from 'react';
import DataTable from '@semcore/ui/data-table';

export default () => {
  const [sortBy, setSortBy] = React.useState(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sortBy;
        const a = Number.parseFloat(aRow[prop].replaceAll('$', '').replaceAll(',', ''));
        const b = Number.parseFloat(bRow[prop].replaceAll('$', '').replaceAll(',', ''));
        if (a === b) return 0;
        if (sortDirection === 'asc') return a - b;
        else return b - a;
      }),
    [sortBy],
  );

  return (
    <DataTable data={sortedData} sort={sortBy} onSortChange={setSortBy}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" sortable />
        <DataTable.Column name="cpc" children="CPC" sortable />
        <DataTable.Column name="vol" children="Vol." sortable />
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
