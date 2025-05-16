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
          <>
  
  <DataTable
  virtualScroll
        data={data}
        aria-label={'Fixed columns'} wMax={700} h={300}
        columns={[     
          {name: 'keyword', children: 'Keyword',  fixed: 'left', gtcWidth:'150px' },
          {name: 'kd', children: 'KD,%',fixed: 'left', gtcWidth:'200px'},
          {name: 'kd', children: 'KD,%', gtcWidth:'200px'},
          {name: 'cpc', children: 'CPC', gtcWidth:'300px' },
          {name: 'cpc', children: 'CPC', gtcWidth:'100px' },
          {name: 'vol', children: 'Vol.', gtcWidth:'80px',fixed: 'right' },
  
        ]}
      />
  
          </>
      );
  };

export default Demo;

