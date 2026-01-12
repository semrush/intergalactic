import { DataTable, ROW_GROUP } from '@semcore/ui/data-table';
import React from 'react';

const data = [
  {
    'kd/cpc/vol': 'ebay buy',
    [ROW_GROUP]: [
      {
        keyword: '77.8',
      },
      {
        keyword: '55.8',
      },
      {
        keyword: '22.8',
      },
      {
        keyword: '33.8',
      },
      {
        keyword: '77.8',
      },
    ],
  },
];

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Rows grouping in multiline header'
      // h={200}
      columns={[
        { name: 'keyword', children: 'Keyword' },
        {
          name: 'group',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD %' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
      ]}
    />
  );
};

export default Demo;
