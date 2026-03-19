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

const fullData: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000', extra: 'A' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920', extra: 'B' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'C' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a', extra: 'D' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290', extra: 'E' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'F' },
];

const Demo = () => {
  const [data, setData] = React.useState<DataTableData>([]);

  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0' }}>Spacer above</div>
      <button data-testid='load-data' onClick={() => setData(fullData)}>
        Load data
      </button>
      <DataTable
        data={data}
        aria-label='Sticky header async data'
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
