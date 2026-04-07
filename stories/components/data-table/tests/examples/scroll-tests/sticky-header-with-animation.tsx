import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import React from 'react';

export type StickyHeaderWithAnimationProps = {
  sticky?: boolean;
  withScrollBar?: boolean;
  animationDuration?: number;
  top?: number;
  wMax?: string;
};

const data: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
];

const TOOLBAR_HEIGHT = 60;

const Demo = (props: StickyHeaderWithAnimationProps) => {
  const [toolbarVisible, setToolbarVisible] = React.useState(true);
  const top = toolbarVisible ? (props.top ?? TOOLBAR_HEIGHT) : 0;

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: toolbarVisible ? TOOLBAR_HEIGHT : 0,
          overflow: 'hidden',
          background: '#5028c8',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: toolbarVisible ? '0 16px' : '0',
          transition: `height ${props.animationDuration ?? 300}ms ease-out`,
        }}
      >
        Sticky toolbar ({TOOLBAR_HEIGHT}px)
      </div>

      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 99,
          background: '#f0f0f0',
          padding: '8px 16px',
          borderBottom: '1px solid #d3d3d3',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button onClick={() => setToolbarVisible((v) => !v)}>
          {toolbarVisible ? 'Hide toolbar' : 'Show toolbar'}
        </button>
        <span style={{ fontSize: '12px', color: '#666' }}>
          Header top: {top}px — scroll down to see the sticky header animate
        </span>
      </div>

      <div style={{ height: '200px', background: '#fafafa', padding: '16px' }}>
        Content above table — scroll down until the table header sticks, then toggle the toolbar
      </div>

      <DataTable
        data={data}
        aria-label='Sticky header with animation'
        wMax={props.wMax}
        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
          top,
          animationDuration: props.animationDuration,
        }}
        columns={[
          { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
          { name: 'kd', children: 'KD,%', gtcWidth: '150px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
          { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
        ]}
      />

      <div style={{ height: '600px', background: '#f0f0f0', padding: '16px' }}>Spacer below</div>
    </div>
  );
};

export const defaultProps: StickyHeaderWithAnimationProps = {
  sticky: true,
  withScrollBar: false,
  animationDuration: 300,
  top: TOOLBAR_HEIGHT,
  wMax: '800px',
};

Demo.defaultProps = defaultProps;

export default Demo;
