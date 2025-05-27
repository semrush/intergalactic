import React from 'react';
import { DataTable, ACCORDION, DataTableData, DataTableSort } from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn]!;
        const b = bRow[prop as SortableColumn]!;
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
  const handleSortChange: (sort: DataTableSort<keyof typeof sortedData[0]>, e?: React.SyntheticEvent) => void = (newSort) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  return (
    <DataTable aria-label={'Accordion inside table'} h={'100%'} w={400} data={sortedData} sort={sort} onSortChange={handleSortChange}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', sortable: true },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px', sortable: true },
        { name: 'cpc', children: 'CPC', gtcWidth: '150px', sortable: true },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', sortable: true },
      ]}

    />
  );
};

const ChartExample = () => {
  return (

    <NoData type='nothing-found' my={7} mx='auto'>

    </NoData>

  );
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample />),
    },
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample />),
  },
];

export default Demo;
