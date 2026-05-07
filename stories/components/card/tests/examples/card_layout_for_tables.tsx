import Card from '@semcore/ui/card';
import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const tooltipContent =
  'When drawing comparisons between different classes of animals, an alternative unit is sometimes used for organisms: body length per second.';

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

  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
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
    <>
      <style>
        {`
          #card-with-table {
            padding: 0 0 var(--intergalactic-spacing-1x);
          }
          #card-with-table div[role="row"]:last-of-type div[role="gridcell"] {
            border-bottom: none;
          }
        `}
      </style>
      <Card>
        <Card.Header>
          <Card.Title
            innerHint={tooltipContent}
            innerHintAriaLabel='About fastest animals'
            tag='h3'
            id='card-title'
          >
            Fastest animals
          </Card.Title>
        </Card.Header>
        <Card.Body id='card-with-table'>
          <DataTable
            data={sortedData}
            sort={sort}
            onSortChange={handleSortChange}
            aria-label='Table in card'
            sideIndents='wide'
            columns={[
              { name: 'keyword', children: 'Keyword', sortable: true },
              { name: 'kd', children: 'KD,%', sortable: true },
              { name: 'cpc', children: 'CPC' },
              { name: 'vol', children: 'Vol.' },
            ]}
          />
        </Card.Body>
      </Card>
    </>
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

export default Demo;
