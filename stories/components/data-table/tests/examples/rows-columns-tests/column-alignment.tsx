import { DataTable } from '@semcore/data-table';
import React from 'react';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Column alignment'
      columns={[
        { name: 'keyword', children: 'Key word Keyw ord Keyw ord', gtcWidth: '80px' },
        { name: 'kd', children: 'justify Content: center', justifyContent: 'center', gtcWidth: '80px' },
        { name: 'cpc', children: 'justify Content: flex-start', justifyContent: 'flex-start', gtcWidth: '80px' },
        { name: 'vol', children: 'justify Content: flex-end', justifyContent: 'flex-end', gtcWidth: '80px' },
        { name: 'kd', children: 'alignItems: center ', alignItems: 'center', gtcWidth: '80px' },
        { name: 'cpc', children: 'alignItems: flex-end', alignItems: 'flex-end', gtcWidth: '80px' },
        { name: 'vol', children: 'alignItems: flex-start', alignItems: 'flex-start', gtcWidth: '80px' },
        { name: 'kd', children: 'alignContent: center ', gtcWidth: '80px', alignContent: 'center', flexWrap: true },
        { name: 'cpc', children: 'alignContent: flex-start', gtcWidth: '80px', alignContent: 'flex-start', flexWrap: true },
        { name: 'cpc', children: 'alignContent: flex-end', gtcWidth: '80px', alignContent: 'flex-end', flexWrap: true },
        { name: 'vol', children: 'textAlign: end', gtcWidth: '80px', textAlign: 'end' },
        { name: 'vol', children: 'textAlign: start', gtcWidth: '80px', textAlign: 'start' },
        { name: 'vol', children: 'textAlign: center', gtcWidth: '80px', textAlign: 'center', flexWrap: true },

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
