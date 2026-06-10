import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import React from 'react';

export type StickyHeaderLoadingFocusProps = {
  sticky?: boolean;
  withScrollBar?: boolean;
  wMax?: string;
};

const data: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
];

const Demo = (props: StickyHeaderLoadingFocusProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleToggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0', padding: '16px' }}>
        <p>
          Focus a cell in the table below, then click "Trigger loading" to verify that focus moves
          to the grid container during loading state.
        </p>
        <button data-testid='trigger-loading' onClick={handleToggleLoading} disabled={loading}>
          {loading ? 'Loading...' : 'Trigger loading (2s)'}
        </button>
      </div>
      <DataTable
        data={data}
        aria-label='Loading focus management'
        wMax={props.wMax}
        loading={loading}
        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
        }}
        columns={[
          { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
          { name: 'kd', children: 'KD,%', gtcWidth: '150px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
          { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
        ]}
      />
      <div style={{ height: '400px', background: '#f0f0f0' }}>Spacer below</div>
    </>
  );
};

export const defaultProps: StickyHeaderLoadingFocusProps = {
  sticky: true,
  withScrollBar: false,
  wMax: '800px',
};

Demo.defaultProps = defaultProps;

export default Demo;
