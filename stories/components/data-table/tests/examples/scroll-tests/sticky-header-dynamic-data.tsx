import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import React from 'react';

export type StickyHeaderDynamicDataProps = {
  sticky?: boolean;
  withScrollBar?: boolean;
  wMax?: string;
};

const columns = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
  { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
  { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
  { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
  { name: 'extra', children: 'Extra', gtcWidth: '200px' },
];

const emptyData: DataTableData = [];

const shortData: DataTableData = [
  { keyword: 'short', kd: '1', cpc: '$0', vol: '100', extra: 'A' },
  { keyword: 'tiny', kd: '2', cpc: '$0', vol: '200', extra: 'B' },
  { keyword: 'sm', kd: '3', cpc: '$1', vol: '300', extra: 'C' },
];

const fullData: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000', extra: 'A' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920', extra: 'B' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'C' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a', extra: 'D' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290', extra: 'E' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'F' },
];

const wideData: DataTableData = [
  { keyword: 'very long keyword text here', kd: '77.8', cpc: '$1,250.00', vol: '32,500,000,000', extra: 'Wide A' },
  { keyword: 'another extremely long keyword', kd: '11.2', cpc: '$3,400.00', vol: '65,457,920,000', extra: 'Wide B' },
  { keyword: 'www.ebay.com/very/long/path', kd: '10', cpc: '$0.65', vol: '47,354,640,000', extra: 'Wide C' },
  { keyword: 'short', kd: '-', cpc: '$0', vol: 'n/a', extra: 'D' },
  { keyword: 'medium keyword', kd: '75.89', cpc: '$0', vol: '21,644,290', extra: 'E' },
];

const Demo = (props: StickyHeaderDynamicDataProps) => {
  const [data, setData] = React.useState<DataTableData>(emptyData);

  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0', padding: '16px' }}>
        <p style={{ marginBottom: '8px' }}>
          Test dynamic data scenarios with sticky header:
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button data-testid='clear-data' onClick={() => setData(emptyData)}>
            Clear (empty)
          </button>
          <button data-testid='load-data' onClick={() => setData(fullData)}>
            Load data
          </button>
          <button data-testid='set-short' onClick={() => setData(shortData)}>
            Short rows
          </button>
          <button data-testid='set-wide' onClick={() => setData(wideData)}>
            Wide content
          </button>
        </div>
      </div>
      <DataTable
        data={data}
        aria-label='Sticky header dynamic data'
        wMax={props.wMax}
        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
        }}
        columns={columns}
      />
      <div style={{ height: '400px', background: '#f0f0f0' }}>Spacer below</div>
    </>
  );
};

export const defaultProps: StickyHeaderDynamicDataProps = {
  sticky: true,
  withScrollBar: true,
  wMax: '500px',
};

Demo.defaultProps = defaultProps;

export default Demo;
