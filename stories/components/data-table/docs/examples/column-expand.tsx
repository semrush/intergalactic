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
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort],
  );
  const currencyFormat = React.useMemo(
    () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );
  const handleSortChange: (sort: DataTableSort<string>, e?: React.SyntheticEvent) => void = (
    newSort,
  ) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  return (
    <DataTable
      data={sortedData}
      sort={sort}
      onSortChange={handleSortChange}
      aria-label={'Expanding column'}
      columns={[
        { name: 'keyword', children: 'Keyword Keyword' },
        { name: 'kd', children: 'Difficulty Difficulty' },
        { name: 'cpc', children: 'CPC CPC CPC', sortable: true },
        { name: 'vol', children: 'Vol Vol' },
        { name: 'md', children: 'Marketing SEO' },
      ]}
      renderCell={(props) => {
        const rawValue = props.row[props.columnName as SortableColumn];

        if (props.columnName === 'cpc' && typeof rawValue === 'number') {
          return currencyFormat.format(rawValue);
        }

        return props.defaultRender();
      }}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: 1.25,
    vol: '32,500,000',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: 3.4,
    vol: '65,457,920',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: 0.65,
    vol: '47,354,640',
    md: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: 0,
    vol: 'n/a',
    md: '221',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: 0,
    vol: '21,644,290',
    md: '221',
  },
];

export default Demo;
