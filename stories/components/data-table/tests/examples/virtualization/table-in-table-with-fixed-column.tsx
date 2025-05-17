import React from 'react';
import { DataTable, ACCORDION } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Parent with fixed column'} h={'100%'} virtualScroll
    columns={[
      {name: 'keyword', children: 'Keyword', gtcWidth: '400px', fixed: 'left'},
      {name: 'kd', children: 'KD,%', gtcWidth: '300px'},
      {name: 'cpc', children: 'CPC', gtcWidth: '300px'},
      {name: 'vol', children: 'Vol.', gtcWidth: '300px'},
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
    [ACCORDION]: [
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
    ]
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
