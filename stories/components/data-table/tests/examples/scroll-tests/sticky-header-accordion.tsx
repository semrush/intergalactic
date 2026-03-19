import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0' }}>Spacer above</div>
      <DataTable
        data={data}
        aria-label='Accordion with sticky header'
        wMax='400px'
        headerProps={{
          sticky: true,
          withScrollBar: true,
        }}
        accordionMode='independent'
        columns={[
          { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
          { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
          { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
        ]}
      />
      <div style={{ height: '400px', background: '#f0f0f0' }}>Spacer below</div>
    </>
  );
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
      { keyword: 'nested 1', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'nested 2', kd: '10', cpc: '$0.65', vol: '47,354,640' },
    ],
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    [ACCORDION]: [
      { keyword: 'nested 3', kd: '5.5', cpc: '$1.00', vol: '10,000,000' },
    ],
  },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
];

export default Demo;
