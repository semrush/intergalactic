import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label={'Borders'}
      headerProps={{
        sticky: true,
      }}
      columns={[
        {
          name: 'keyword',
          children: 'Keyword',
        },
        {
          borders: 'both',
          children: 'Organic Sessions',
          columns: [
            {
              name: 'kd',
              children: 'KD %',
            },
            {
              name: 'cpc',
              children: 'CPC',
            },
            {
              name: 'vol',
              children: 'Vol.',
            },
          ],
        },
        {
          name: 'other',
          children: 'Other',
        },
      ]}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '1.25',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '3.4',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '0.65',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '0',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    vol: '21,644,290',
    other: 'ebay buy',
  },
];

export default Demo;
