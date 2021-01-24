import React from 'react';
import DataTable from '@semcore/data-table';
import ProgressBar from '@semcore/progress-bar';

export default () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" />
        <DataTable.Column name="cpc" children="CPC" />
        <DataTable.Column name="vol" children="Vol." />
        <ProgressBar value={40} size="s" style={{ borderRadius: 0 }}>
          <ProgressBar.Value style={{ borderRadius: 0 }} />
        </ProgressBar>
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
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
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];
