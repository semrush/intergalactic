import React from 'react';
import DataTable from '@semcore/ui/data-table';

export default () => {
  const [sortBy, setSortBy] = React.useState(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sortBy;
        const a = aRow[prop];
        const b = bRow[prop];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a - b;
        else return b - a;
      }),
    [sortBy],
  );
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
  const currencyFormat = React.useMemo(
    () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );

  return (
    <DataTable data={sortedData} sort={sortBy} onSortChange={setSortBy}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" sortable />
        <DataTable.Column name="cpc" children="CPC" sortable />
        <DataTable.Column name="vol" children="Vol." sortable />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell name="kd">
          {(_, row) => ({ children: row.kd === -1 ? 'n/a' : numberFormat.format(row.kd) })}
        </DataTable.Cell>
        <DataTable.Cell name="cpc">
          {(_, row) => ({
            children: row.cpc === -1 ? 'n/a' : currencyFormat.format(row.cpc),
          })}
        </DataTable.Cell>
        <DataTable.Cell name="vol">
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
