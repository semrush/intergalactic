import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Ellipsis from '@semcore/ellipsis';
import AmazonM from '@semcore/icon/color/Amazon/m';

type RowData = typeof data[0];
type SortableColumn = Exclude<keyof RowData, 'keyword' | 'other'>;

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof RowData>>(['kd', 'desc']);

  const sortedData = React.useMemo(() => {
    const [prop, direction] = sort;
    return [...data].sort((a, b) => {
      const aValue = a[prop as SortableColumn];
      const bValue = b[prop as SortableColumn];

      if (aValue === bValue) return 0;
      if (direction === 'asc') return aValue > bValue ? 1 : -1;
      return aValue > bValue ? -1 : 1;
    });
  }, [sort]);
    

  return (
    <DataTable
    aria-label='Borders'
    defaultGridTemplateColumnWidth='1fr'
    sort={sort}
    onSortChange={setSort}
    h='100%'
      data={sortedData}
      columns={[
        {
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
                  <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                </Text>
              ),
            },
            { name: 'cpc', children: 'CPC', sortable: true },
            { name: 'vol', children: 'Vol.' },
          ],
        },
        { name: 'keyword', children: 'Keyword', sortable: true },
        {
          children:  'Organic Sessions Organic Sessions Organic SessionsOrganic Sessions Organic Sessions Organic Sessions'   
          ,
          borders: 'both',
          columns: [
            {
              name: 'kd2',
              sortable: true,
              gtcWidth: '100px',
              children: (
                <>
                  <Ellipsis>Kd Organic Sessions</Ellipsis>
                  <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                </>
              ),
            },
            { name: 'cpc2', children: 'CPC', sortable: true },
            { name: 'vol', children: 'Vol.' },
          ],
        },
        { name: 'other', children: 'Other' },
        {
          children: 'Organic Sessions',
          borders: 'right',
          columns: [
            {
              name: 'kd',
              children: (
                <>
                  <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                  <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
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
    cpc2: '1.25',
    vol: '32,500,000',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd2: '11.2',
    cpc: '3.4',
    cpc2: '3.4',
    vol: '65,457,920',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd2: '10',
    cpc: '0.65',
    cpc2: '0.65',
    vol: '47,354,640',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd2: '-',
    cpc: '0',
    cpc2: '0',
    vol: '2,456,789',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd2: '75.89',
    cpc: '0',
    cpc2: '0',
    vol: '21,644,290',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
];

export default Demo;
