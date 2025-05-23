import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable
      data={data}
      compact
      aria-label={'Compact'}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: 'max-content' },
        { name: 'kd', children: 'KD %', gtcWidth: 'max-content' },
        { name: 'cpc', children: 'CPC', gtcWidth: 'max-content' },
        { name: 'vol', children: 'Vol.', gtcWidth: 'max-content' },
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
