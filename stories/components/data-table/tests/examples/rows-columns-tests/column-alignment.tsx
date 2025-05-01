import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Column alignment'}
    columns={[
      {name: 'keyword', children: 'Key word Keyw ord Keyw ord', gtcWidth: '80px'},
      {name: 'kd', children: 'KD,%', justifyContent: 'center'},
      {name: 'cpc', children: 'CPC', justifyContent: 'flex-start'},
      {name: 'vol', children: 'Vol.', justifyContent: 'flex-end'},
      {name: 'kd', children: 'KD,% KD,% ', alignItems: 'center', gtcWidth: '80px' },
      {name: 'cpc',  children: 'CPC CPC CPC', alignItems: 'flex-end', gtcWidth: '80px'},
      {name: 'vol', children: 'Vol. Vol. Vol.', alignItems: 'flex-start', gtcWidth: '80px'},
      {name: 'kd', children: 'KD,% KD,% ',  gtcWidth: '80px',  alignContent: 'center', flexWrap: true },
      {name: 'cpc',  children: 'CPC CPC CPC',  gtcWidth: '80px',  alignContent: 'flex-start', flexWrap: true},
      {name: 'vol', children: 'Vol. Vol. Vol.',  gtcWidth: '80px',  alignContent: 'flex-end', flexWrap: true},
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
