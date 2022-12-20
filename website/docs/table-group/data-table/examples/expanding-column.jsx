import React, { useState } from 'react';
import DataTable from '@semcore/ui/data-table';

export default () => {
  const [sort, setSort] = useState(['cpc', 'desc']);
  return (
    <DataTable data={data} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" wMax={'300px'} />
        <DataTable.Column name="kd" children="Difficulty Difficulty" sortable wMax={'85px'} />
        <DataTable.Column name="cpc" children="CPC" sortable />
        <DataTable.Column name="vol" children="Vol." sortable wMax={'300px'} />
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
