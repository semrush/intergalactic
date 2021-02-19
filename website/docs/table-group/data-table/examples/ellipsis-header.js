import React, { useState } from 'react';
import DataTable from '@semcore/data-table';
import { Text } from '@semcore/typography';
import styled from 'styled-components';

const TextHeader = styled(Text)`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

export default () => {
  const [sort, setSort] = useState(['kd', 'desc']);
  return (
    <DataTable data={data} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" sortable>
          <TextHeader>Very long title for your column</TextHeader>
        </DataTable.Column>
        <DataTable.Column name="cpc" children="CPC" sortable />
        <DataTable.Column name="vol" children="Vol." sortable />
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
