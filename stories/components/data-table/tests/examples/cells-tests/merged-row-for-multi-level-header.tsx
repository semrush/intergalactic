import { DataTable, ROW_GROUP } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Multi level header'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        {
          name: 'group',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD %', gtcWidth: 'max-content' },
            { name: 'cpc', children: 'CPC', gtcWidth: 'max-content' },
            { name: 'vol', children: 'Vol.', gtcWidth: 'max-content' },
          ],
        },
        {
          name: 'group1',
          children: 'Organic Sessions1',
          borders: 'both',
          columns: [
            { name: 'kd1', children: 'KD %', gtcWidth: 'max-content' },
            { name: 'cpc2', children: 'CPC', gtcWidth: 'max-content' },
            { name: 'vol3', children: 'Vol.', gtcWidth: 'max-content' },
          ],
        },
      ]}
    />
  );
};

const data = [
  {
    'kd/cpc/vol': '123',
    'kd1/cpc2/vol3': '456',
    [ROW_GROUP]: [
      {
        keyword: 'www.ebay.com',
      },
      {
        keyword: 'www.ebay.com',
      },
      {
        keyword: 'ebay buy',
      },
      {
        keyword: 'ebay buy',
      },
    ],
  },
  {
    'keyword': 'www.ebay.com',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
  },
  {
    'keyword': 'www.ebay.com',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
  },
  {
    'keyword': 'ebay buy',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
  },
  {
    'keyword': 'ebay buy',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
  },
];

export default Demo;
