import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Column alignment'}>
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Key word Keyw ord Keyw ord' gtcWidth='80px' />
        <DataTable.Head.Column name='kd' children='KD,%' justifyContent='center' gtcWidth='80px'/>
        <DataTable.Head.Column name='cpc' children='CPC' justifyContent='flex-start' gtcWidth='80px'/>
        <DataTable.Head.Column name='vol' children='Vol.' justifyContent='flex-end' gtcWidth='80px'/>

        <DataTable.Head.Column name='kd' children='KD,% KD,% ' alignItems='center' gtcWidth='80px' />
        <DataTable.Head.Column name='cpc' children='CPC CPC CPC' alignItems='flex-end' gtcWidth='80px' />
        <DataTable.Head.Column name='vol' children='Vol. Vol. Vol.' alignItems='flex-start' gtcWidth='80px' />

        <DataTable.Head.Column name='kd' children='KD,% KD,% ' gtcWidth='80px' alignContent='center' flexWrap={true} />
        <DataTable.Head.Column name='cpc' children='CPC CPC CPC' alignContent='flex-start' gtcWidth='80px' flexWrap={true} />
        <DataTable.Head.Column name='vol' children='Vol. Vol. Vol.' alignContent='flex-end' gtcWidth='80px' flexWrap={true} />

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
