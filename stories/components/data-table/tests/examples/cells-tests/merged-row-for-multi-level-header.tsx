import { DataTable, ROW_GROUP } from '@semcore/ui/data-table';
import React from 'react';

export type DemoProps = {
  showAdditionalColumn?: boolean;
};

export const mergedRowForMultiLevelHeaderProps: DemoProps = {
  showAdditionalColumn: false,
};

const Demo = ({ showAdditionalColumn = false }: DemoProps) => {
  const baseColumns = [
    { name: 'keyword', children: 'Keyword' },
    {
      name: 'group',
      children: 'Organic Sessions',
      borders: 'both' as const,
      columns: [
        { name: 'kd', children: 'KD %', gtcWidth: 'max-content' },
        { name: 'cpc', children: 'CPC', gtcWidth: 'max-content' },
        { name: 'vol', children: 'Vol.', gtcWidth: 'max-content' },
      ],
    },
    {
      name: 'group1',
      children: 'Organic Sessions1',
      borders: 'both' as const,
      columns: [
        { name: 'kd1', children: 'KD %', gtcWidth: 'max-content' },
        { name: 'cpc2', children: 'CPC', gtcWidth: 'max-content' },
        { name: 'vol3', children: 'Vol.', gtcWidth: 'max-content' },
      ],
    },
  ];

  const columns = showAdditionalColumn
    ? [...baseColumns, { name: 'extra', children: 'Extra Column', gtcWidth: 'max-content' }]
    : baseColumns;

  return (
    <DataTable
      data={data}
      aria-label='Multi level header'
      columns={columns}
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
        extra: 'A1',
      },
      {
        keyword: 'www.ebay.com',
        extra: 'A2',
      },
      {
        keyword: 'ebay buy',
        extra: 'A3',
      },
      {
        keyword: 'ebay buy',
        extra: 'A4',
      },
    ],
  },
  {
    'keyword': 'www.ebay.com',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
    'extra': 'B',
  },
  {
    'keyword': 'www.ebay.com',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
    'extra': 'C',
  },
  {
    'keyword': 'ebay buy',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
    'extra': 'D',
  },
  {
    'keyword': 'ebay buy',
    'kd/cpc/vol': 'test',
    'kd1/cpc2/vol3': '456',
    'extra': 'E',
  },
];

export default Demo;
