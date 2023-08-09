import React, { useState } from 'react';
import DataTable, { DataTableSort } from '@semcore/ui/data-table';

export default () => {
  const [sort, setSort] = useState<DataTableSort<keyof typeof data[0]>>(['cpc', 'desc']);

  return (
    <DataTable data={data} sort={sort} onSortChange={setSort}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' sortable />
        <DataTable.Column vBorders>
          Organic Sessions
          <DataTable.Column name='kd' children='KD' sortable />
          <DataTable.Column name='cpc' children='CPC' sortable />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Column>
        <DataTable.Column name='other' children='Other' />
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
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'ebay buy',
  },
];
