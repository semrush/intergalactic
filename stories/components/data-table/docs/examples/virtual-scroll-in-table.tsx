import React from 'react';
import { DataTable, ROW_GROUP } from '@semcore/data-table';

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy', 'some long long long long long long text for test multi rows in table with virtualizarion some long long long long long long text for test multi rows in table with virtualizarion some long long long long long long text for test multi rows in table with virtualizarion some long long long long long long text for test multi rows in table with virtualizarion some long long long long long long text for test multi rows in table with virtualizarion some long long long long long long text for test multi rows in table with virtualizarion some long long long long long long text for test multi rows in table with virtualizarion'];
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: index < 3 ? keyword[3] : keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
        kd: kd[Math.floor(kd.length * Math.random())],
        cpc: cpc[Math.floor(cpc.length * Math.random())],
        vol: vol[Math.floor(vol.length * Math.random())],
      // },
    // ],
  }));

const Demo = () => {
  return (
    <DataTable data={data} totalRows={10000} aria-label={'Virtual scroll'} h={400}>
      <DataTable.Head sticky>
        <DataTable.Head.Column name='id' children='ID' />
        <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth={'300px'} />
        <DataTable.Head.Group title={'Organic Sessions'}>
          <DataTable.Head.Column name='kd' children='KD,%' />
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
        </DataTable.Head.Group>
      </DataTable.Head>
      <DataTable.Body virtualScroll />
    </DataTable>
  );
};

export default Demo;
