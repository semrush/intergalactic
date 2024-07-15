import React from 'react';
// @ts-ignore
import DataTable from 'intergalactic/data-table';
// @ts-ignore
import Link from 'intergalactic/link';

const Demo = () => {
  return (
    <DataTable data={data}>
      <DataTable.Head wMin={1000} withScrollBar>
        <DataTable.Column name='keyword' wMin={180} children='Keyword' fixed='left' sortable />
        <DataTable.Column name='kd' wMin={180} children='KD,%' sortable />
        <DataTable.Column name='kd1' wMin={180} children='KD,%' sortable />
        <DataTable.Column name='kd2' wMin={180} children='KD,%' sortable />
        <DataTable.Column name='kd3' wMin={180} children='KD,%' sortable />
        <DataTable.Column name='cpc' wMin={180} children='CPC' sortable />
        <DataTable.Column name='vol' wMin={180} children='Vol.' sortable fixed={'right'} />
      </DataTable.Head>
      <DataTable.Body hMax={400}>
        <DataTable.Cell data={data} name='kd'>
          {(props: any, row: any) => {
            return {
              children: <Link>{row[props.name]}</Link>,
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd1: '71.8',
    kd2: '72.8',
    kd3: '73.8',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export default Demo;
