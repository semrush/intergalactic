import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <>
      <DataTable data={data} aria-label={'Fixed columns'} wMax={800} h={200} virtualScroll>
        <DataTable.Head sticky>
          <DataTable.Head.Group borders={'left'} title={'Borders left'} fixed='left' >
            <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth={'150px'} />
            <DataTable.Head.Column name='kd' children='KD,%' gtcWidth={'200px'} />
          </DataTable.Head.Group>

          <DataTable.Head.Column name='cpc' children='CPC' gtcWidth={'350px'} />
          <DataTable.Head.Column name='cpc' children='CPC' gtcWidth={'300px'} />

          <DataTable.Head.Group borders={'left'} title={'Borders left'} fixed='right' >
            <DataTable.Head.Column name='vol' children='Vol' gtcWidth={'200px'} />
            <DataTable.Head.Column name='vol1' children='Vol' gtcWidth={'150px'} />
          </DataTable.Head.Group>
          </DataTable.Head>
        <DataTable.Body />
      </DataTable>

    </>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    vol1: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    vol1: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    vol1: '32,500,000',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    vol1: '32,500,000',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    vol1: '32,500,000',
  },
];

export default Demo;
