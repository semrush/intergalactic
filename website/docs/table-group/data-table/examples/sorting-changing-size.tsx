import React from 'react';
import DataTable, { DataTableSort } from 'intergalactic/data-table';

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
        <DataTable.Column name='keyword' children='Keyword' justifyContent='left' sortable />
        <DataTable.Column name='kd' children='KD,%' justifyContent='right' wMax={68} sortable />
        <DataTable.Column name='cpc' children='CPC' wMax={60} sortable changeSortSize />
        <DataTable.Column name='vol' children='Vol.' wMax={120} justifyContent='left' sortable />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell data={data} name='kd'>
          {(_, row) => ({
            children: row.kd === -1 ? 'n/a' : numberFormat.format(row.kd),
          })}
        </DataTable.Cell>
        <DataTable.Cell data={data} name='cpc'>
          {(_, row) => ({
            children: row.cpc === -1 ? 'n/a' : currencyFormat.format(row.cpc),
          })}
        </DataTable.Cell>
        <DataTable.Cell data={data} name='vol'>
          {(_, row) => ({
            children: row.vol === -1 ? 'n/a' : numberFormat.format(row.vol),
          })}
        </DataTable.Cell>
      </DataTable.Body>
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
