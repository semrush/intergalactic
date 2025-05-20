import React from 'react';
import { DataTable } from '@semcore/data-table';
import Spin from '@semcore/spin';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label={'Access to set of cells'}
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD %' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.' },
      ]}
      renderCell={({ dataKey, row, defaultRender }) => {
        const value = row[dataKey].toString();
        return ['-', '$0', 'n/a'].includes(value) ? <Spin /> : defaultRender();
      }}
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
