import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const data = [
  {
    keyword: 'ebay buy',
    kd: null,
    cpc: 1.25,
    vol: 32500000,
  },
  {
    keyword: 'www.ebay.com',
    kd: 11.2,
    cpc: undefined,
    vol: 65457920,
  },
  {
    keyword: 'www.ebay.com',
    kd: 10,
    cpc: 0.65,
    vol: 47354640,
  },
  {
    keyword: 'ebay buy',
    kd: -1,
    cpc: 0,
    vol: -1,
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: 0,
    vol: 21644290,
  },
];

export function renderCell(cellProps: any) {
  const { column, rawData, defaultRender } = cellProps;
  const rawValue = rawData[column.name];

  if (rawValue === null || rawValue === undefined) {
    return '—';
  }

  return defaultRender();
}

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='custom render cell raw data'
      columns={[
        {
          name: 'keyword',
          children: 'Keyword',
        },
        {
          name: 'kd',
          children: 'KD %',
        },
        {
          name: 'cpc',
          children: 'CPC',
        },
        {
          name: 'vol',
          children: 'Vol.',
        },
      ]}
      renderCell={renderCell}
    />
  );
};

export default Demo;
