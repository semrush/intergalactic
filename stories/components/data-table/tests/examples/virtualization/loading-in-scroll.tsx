import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Scroll inside'} loading wMax={800} hMax={200} virtualScroll>
      <DataTable.Head sticky>
        <DataTable.Head.Column name='keyword' children='Keyword' />
        <DataTable.Head.Column name='kd' children='KD,%' />
        <DataTable.Head.Column name='cpc' children='CPC' />
        <DataTable.Head.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy']
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      // },
    // ],
  }));

export default Demo;
