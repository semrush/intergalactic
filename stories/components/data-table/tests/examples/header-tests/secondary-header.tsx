import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';
import Ellipsis from '@semcore/ellipsis';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import AmazonM from '@semcore/icon/color/Amazon/m';

type SortableColumn = Exclude<keyof typeof data[0], 'kd'>;

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

  return (
    <DataTable
      data={sortedData}
      use='secondary'
      aria-label={'Column expanded'}
      hMax={200}
      sort={sort}
      onSortChange={setSort}
      sideIndents={'wide'}
      columns={[
        {
          name: 'keyword',
          children: (
            <Text noWrap>
              Keyword <Text color='text-secondary'>(Keyword 1–100)</Text>
            </Text>
          ),
          gtcWidth: '65px',
        },
        {
          name: 'kd',
          children: (
            <>
              <Ellipsis>Difficulty</Ellipsis>
              <Hint tag={WhatsAppM} title='WhatsApp icon' color='icon-secondary-neutral' />
              <Hint tag={AmazonM} title='Amazon icon' color='icon-secondary-neutral' />
            </>
          ),
          sortable: true,
          gtcWidth: '85px',
        },
        {
          name: 'cpc',
          children: 'CPC CPC CPC CPC CPC',
          gtcWidth: '90px',
        },
        {
          name: 'vol',
          children: 'Vol.',
          gtcWidth: 'minmax(0, 300px)',
        },
        {
          name: 'md',
          children: (
            <Text>
              Marketing SEO <Text color='text-secondary'>(1–100)</Text>
            </Text>
          ),
          gtcWidth: '90px',
        },
      ]}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    md: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    md: '221',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    md: '221',
  },
];

export default Demo;
