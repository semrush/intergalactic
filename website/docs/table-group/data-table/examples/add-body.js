import React from 'react';
import DataTable from '@semcore/data-table';

export default () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" />
        <DataTable.Column name="cpc" children="CPC" />
        <DataTable.Column name="vol" children="Vol." />
      </DataTable.Head>
      <DataTable.Body>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: 'calc(45px * 2)',
            left: 0,
            bottom: 0,
            background:
              'linear-gradient(45deg, rgba(255, 187, 51, 0.3) 25%, rgba(85, 136, 170, 0.3) 0px, rgba(85, 136,' +
              ' 170, 0.3)' +
              ' 50%,' +
              ' rgba(255, 187, 51, 0.3) 0px, rgba(255, 187, 51, 0.3) 75%, rgba(85, 136, 170, 0.3) 0px) 0% 0% / 42px 42px',
            zIndex: 2,
          }}
        />
      </DataTable.Body>
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
