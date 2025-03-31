import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <>
      <DataTable data={data} aria-label={'Fixed header'} wMax={200}>

        <DataTable.Head sticky={true}  >
          <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth='100px' />
          <DataTable.Head.Column name='kd' children='KD,%' gtcWidth='100px' />
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body />
      </DataTable>
      <h3>with Scroll.Bar in Header</h3>
      <DataTable data={data} aria-label={'Fixed header with scroll'} w={200}>
        <DataTable.Head sticky={true} withScrollBar>
          <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth='200px' />
          <DataTable.Head.Column name='kd' children='KD,%' gtcWidth='100px' />
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body />
      </DataTable>

      <h3>Multi level Header</h3>
      <DataTable data={data} aria-label={'Fixed header with scroll'} w={200}>
        <DataTable.Head withScrollBar>
          <DataTable.Head.Group borders={'left'} title={'Borders left'}>
            <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth='200px' />
            <DataTable.Head.Column name='kd' children='KD,%' gtcWidth='100px' />
          </DataTable.Head.Group>
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
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

];



export default Demo;
