import React from 'react';
import { DataTable, ACCORDION, DataTableSort, UNIQ_ROW_KEY } from '@semcore/data-table';

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
      }).map((row) => {
        return {
          ...row,
          [ACCORDION]: row[ACCORDION]?.sort((aRow, bRow) => {
            const [prop, sortDirection] = sort;
            const a = aRow[prop as SortableColumn];
            const b = bRow[prop as SortableColumn];
            if (a === b) return 0;
            if (sortDirection === 'asc') return a > b ? 1 : -1;
            else return a > b ? -1 : 1;
          }),
        }
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
      <DataTable aria-label={'Parent'} h={'100%'} data={sortedData} sort={sort} onSortChange={handleSortChange}
                 columns={[
                   {name: 'keyword', children: 'Keyword', gtcWidth: '200px',  fixed: 'left', sortable: true},
                    {name: 'kd', children: 'KD,%', gtcWidth: '200px', sortable: true},
                    {name: 'cpc', children: 'CPC', gtcWidth: '200px', sortable: true},
                    {name: 'vol', children: 'Vol.', gtcWidth: '200px', sortable: true},
                 ]}
      />
  );
};

const data = [
  {
    [UNIQ_ROW_KEY]: '1',
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
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
    ]
  },
  {
    [UNIQ_ROW_KEY]: '2',
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
    toString: () => '45,457,920',
    [ACCORDION]: [
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
    ]}
  },
  {
    [UNIQ_ROW_KEY]: '3',
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    [UNIQ_ROW_KEY]: '4',
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    [UNIQ_ROW_KEY]: '5',
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: [
      {
        keyword: 'www.ebay.com',
        kd: '10',
        cpc: '$3.4',
        vol: '65,457,920',
      },
      {
        keyword: 'www.ebay.com',
        kd: '11',
        cpc: '$0.65',
        vol: '47,354,640',
      },
      {
        keyword: 'ebay buy',
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
      },
    ]
  },
];

export default Demo;
