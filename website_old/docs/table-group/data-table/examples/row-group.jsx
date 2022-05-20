import React from 'react';
import DataTable, { ROW_GROUP } from '@semcore/data-table';

const data = [
  {
    keyword: 'ebay buy',
    [ROW_GROUP]: [
      {
        kd: '77.8',
        cpc: '$1.25',
        vol: '32,500,000',
      },
      {
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
      },
      {
        kd: '75.89',
        cpc: '$0',
        vol: '21,644,290',
      },
    ],
  },
  {
    keyword: 'www.ebay.com',
    [ROW_GROUP]: [
      {
        kd: '11.2',
        cpc: '$3.4',
        vol: '65,457,920',
      },
      {
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640',
      },
    ],
  },
];

export default () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" />
        <DataTable.Column name="cpc" children="CPC" />
        <DataTable.Column name="vol" children="Vol." />
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};
