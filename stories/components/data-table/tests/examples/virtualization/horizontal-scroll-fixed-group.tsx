import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Flex } from '@semcore/flex-box';


const Demo = () => {
  return (
    <Flex direction='column' gap={3}>

    <DataTable
          data={data}
          virtualScroll
          aria-label={'Fixed multi level header with 1 scroll'} wMax={800} h={200}
          columns={[
            {
              children: 'Borders right Fixed left',
              borders: 'right',
              fixed: 'left',
              columns: [
                {name: 'keyword', children: 'Keyword', gtcWidth:'150px' },
                {name: 'kd', children: 'KD,%', gtcWidth:'100px'},
              ]},
            {name: 'cpc', children: 'CPC', gtcWidth:'350px' },
            {name: 'cpc', children: 'CPC', gtcWidth:'350px' },
    
            {
              children: 'Borders left Fixed right',
              borders: 'left',
              fixed: 'right',
              columns: [
                {name: 'vol', children: 'Vol.', gtcWidth:'200px' },
                {name: 'vol1', children: 'Vol.', gtcWidth:'150px' },
    
              ]}
          ]}
        />
    
    <DataTable
    virtualScroll
          data={data}
          aria-label={'Fixed multi level header with 2 scroll'} wMax={800} h={200}
          headerProps={{
            sticky: true,
            withScrollBar: true
          }}
          columns={[
            {
              children: 'Borders right Fixed left',
              borders: 'right',
              fixed: 'left',
              columns: [
                {name: 'keyword', children: 'Keyword', gtcWidth:'150px' },
                {name: 'kd', children: 'KD,%', gtcWidth:'100px'},
              ]},
            {name: 'cpc', children: 'CPC', gtcWidth:'150px' },
            {name: 'cpc', children: 'CPC', gtcWidth:'250px' },
            {name: 'cpc', children: 'CPC', gtcWidth:'350px' },
    
            {
              children: 'Borders left Fixed right',
              borders: 'left',
              fixed: 'right',
              columns: [
                {name: 'vol', children: 'Vol.', gtcWidth:'200px' },
                {name: 'vol1', children: 'Vol.', gtcWidth:'150px' },
    
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
