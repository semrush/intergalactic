import React from 'react';
import { DataTable } from '@semcore/data-table';


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

const Demo = () => {
  return (
    <DataTable data={data} totalRows={10000} aria-label={'Virtual scroll'} h={400} w={400} virtualScroll={{rowHeight: 45}}>
      <DataTable.Head sticky>
        <DataTable.Head.Column name='id' children='ID' fixed='left' />
  
                    <DataTable.Head.Column name='keyword' children='Keyword' gtcWidth={'150px'}  />
                    <DataTable.Head.Column name='kd' children='KD,%' gtcWidth={'200px'} />
                    <DataTable.Head.Column name='cpc' children='CPC' gtcWidth={'300px'} />
                    <DataTable.Head.Column name='cpc' children='CPC' gtcWidth={'100px'} />
                    <DataTable.Head.Column name='vol' children='Vol.' gtcWidth={'80px'} fixed='right' />
            
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

export default Demo;

