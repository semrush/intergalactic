import React from 'react';
import { DataTable } from '@semcore/data-table';

const Demo = () => {
    return (
        <>

<DataTable
      data={data}
      aria-label={'Fixed columns'} wMax={700} h={400}
      headerProps={{
        sticky: true,
        withScrollBar: true
      }}
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
