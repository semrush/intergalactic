import AmazonM from '@semcore/icon/color/Amazon/m';
import { ButtonLink } from '@semcore/ui/button';
import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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

  return (
    <DataTable
      virtualScroll
      aria-label='Borders'
      defaultGridTemplateColumnWidth='1fr'
      sort={sort}
      onSortChange={setSort}
      h='100%'
      data={sortedData}
      columns={[
        {
          name: 'organicSessions',
          children: 'Organic Sessions',
          borders: 'left',
          columns: [
            {
              name: 'kd',
              sortable: true,
              gtcWidth: '100px',
              children: (
                <Text>
                  Kd Organic Sessions Organic Sessions
                  <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                </Text>
              ),
            },
            { name: 'cpc', children: 'CPC', sortable: true },
            { name: 'vol', children: 'Vol.' },
          ],
        },
        { name: 'keyword', children: 'Keyword', sortable: true },
        {
          name: 'organicSessions2',
          children: 'Organic Sessions Organic Sessions Organic SessionsOrganic Sessions Organic Sessions Organic Sessions',
          borders: 'both',
          columns: [
            {
              name: 'kd2',
              sortable: true,
              gtcWidth: '100px',
              children: (
                <>
                  <Text ellipsis={true}>Kd Organic Sessions</Text>
                  <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                </>
              ),
            },
            { name: 'cpc2', children: 'CPC', sortable: true },
            { name: 'vol', children: 'Vol.' },
          ],
        },
        { name: 'other', children: 'Other' },
        {
          name: 'organicSessions3',
          children: 'Organic Sessions',
          borders: 'right',
          columns: [
            {
              name: 'kd',
              children: (
                <>
                  <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                  <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                </>
              ),
            },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
        { name: 'other2', children: 'Other' },
      ]}

    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd2: '77.8',
    cpc: '1.25',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd2: '77.8',
    cpc: '3.4',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd2: '77.8',
    cpc: '0.65',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd2: '77.8',
    cpc: '0',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    kd2: '77.8',
    vol: '21,644,290',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '1.25',
    kd2: '77.8',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '3.4',
    kd2: '77.8',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '0.65',
    kd2: '77.8',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '0',
    kd2: '77.8',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    kd2: '77.8',
    vol: '21,644,290',
    other: 'ebay buy',
  },
];

export default Demo;
