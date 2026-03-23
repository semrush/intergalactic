import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import React from 'react';

const columns = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
  { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
  { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
  { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
  { name: 'extra', children: 'Extra', gtcWidth: '200px' },
];

const shortData: DataTableData = [
  { keyword: 'short', kd: '1', cpc: '$0', vol: '100', extra: 'A' },
  { keyword: 'tiny', kd: '2', cpc: '$0', vol: '200', extra: 'B' },
  { keyword: 'sm', kd: '3', cpc: '$1', vol: '300', extra: 'C' },
];

const wideData: DataTableData = [
  { keyword: 'very long keyword text here', kd: '77.8', cpc: '$1,250.00', vol: '32,500,000,000', extra: 'Wide content A' },
  { keyword: 'another extremely long keyword', kd: '11.2', cpc: '$3,400.00', vol: '65,457,920,000', extra: 'Wide content B' },
  { keyword: 'www.ebay.com/very/long/path', kd: '10', cpc: '$0.65', vol: '47,354,640,000', extra: 'Wide content C' },
  { keyword: 'short', kd: '-', cpc: '$0', vol: 'n/a', extra: 'D' },
  { keyword: 'medium keyword', kd: '75.89', cpc: '$0', vol: '21,644,290', extra: 'E' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'F' },
];

const Demo = () => {
  const [data, setData] = React.useState<DataTableData>(shortData);

  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0' }}>Spacer above</div>
      <div style={{ display: 'flex', gap: '8px', padding: '8px 0' }}>
        <button data-testid='set-short' onClick={() => setData(shortData)}>
          Short data
        </button>
        <button data-testid='set-wide' onClick={() => setData(wideData)}>
          Wide data
        </button>
      </div>
      <DataTable
        data={data}
        aria-label='Sticky header data change'
        wMax='400px'
        headerProps={{
          sticky: true,
          withScrollBar: true,
        }}
        columns={columns}
      />
      <div style={{ height: '400px', background: '#f0f0f0' }}>Spacer below</div>
    </>
  );
};

export default Demo;
