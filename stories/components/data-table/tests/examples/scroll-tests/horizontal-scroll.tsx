import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Flex } from '@semcore/flex-box';


const Demo = () => {
  return (
    <Flex direction='row' gap={4}>

     <DataTable
      data={data}
      aria-label={'Horizontal scroll'} wMax={200}
      headerProps={{
        sticky: true,
      }}
      columns={[
        { name: 'keyword', children: 'Keyword' , gtcWidth:'100px' },
        { name: 'kd', children: 'KD,%',  gtcWidth:'100px' },
        { name: 'cpc', children: 'CPC' , gtcWidth:'100px' },
        { name: 'vol', children: 'Vol.', gtcWidth:'150px'  },
      ]}
    />

<DataTable
      data={data}
      aria-label={'2 Horizontal scrolls'} wMax={200}
      headerProps={{
        sticky: true,
        withScrollBar: true
      }}
      columns={[
        { name: 'keyword', children: 'Keyword' , gtcWidth:'200px' },
        { name: 'kd', children: 'KD,%',  gtcWidth:'100px' },
        { name: 'cpc', children: 'CPC' , gtcWidth:'200px' },
        { name: 'vol', children: 'Vol.', gtcWidth:'150px'  },
      ]}
    />

<DataTable
      data={data}
      aria-label={'Fixed multi level header with 2 scrolls'} wMax={200}
      headerProps={{
        sticky: true,
        withScrollBar: true
      }}

      columns={[
        {name: 'keyword', children: 'Keyword', gtcWidth:'200px'},
        {
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            {name: 'kd', children: 'KD,%', gtcWidth:'100px'},
            {name: 'cpc', children: 'CPC', gtcWidth:'80px'},
            {name: 'vol', children: 'Vol.', gtcWidth:'150px'},
          ]}
      ]}
    />
      <DataTable
      data={data}
      aria-label={'Fixed multi level header with 1 scroll'} wMax={200}

      columns={[
        {
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            {name: 'keyword', children: 'Keyword', gtcWidth:'200px'},
            {name: 'kd', children: 'KD,%', gtcWidth:'100px'},
            {name: 'cpc', children: 'CPC', gtcWidth:'80px'},
            {name: 'vol', children: 'Vol.', gtcWidth:'150px'},
          ]}
      ]}
    />

    </Flex>
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
