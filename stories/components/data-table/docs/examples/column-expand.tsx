import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Column expanded'}>
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth={'minmax(0, 300px)'} />
        <DataTable.Head.Column name='kd' children='Difficulty Difficulty' gtcWidth={'85px'} />
        <DataTable.Head.Column name='cpc' children='CPC' gtcWidth={'max-content'} />
        <DataTable.Head.Column name='vol' children='Vol.' gtcWidth={'minmax(0, 300px)'} />
        <DataTable.Head.Column name='md' children='Marketing SEO' gtcWidth={'90px'} />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    md: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    md: '221',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    md: '221',
  },
];

export default Demo;
