import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

export type VirtualScrollMode = 'boolean' | 'aproxRowsOnPage' | 'rowHeight' | 'rowsBufferOnly';

export type VirtualScrollControlsProps = {
  mode: VirtualScrollMode;
  useCustomBuffer: boolean;
  rowsBuffer: number;
  aproxRowsOnPage: number;
  rowHeight: number;
};

export const virtualScrollControlsDefaultProps: VirtualScrollControlsProps = {
  mode: 'aproxRowsOnPage' as VirtualScrollMode,
  useCustomBuffer: true,
  rowsBuffer: 20,
  aproxRowsOnPage: 20,
  rowHeight: 45,
};

const keywords = ['ebay buy', 'www.ebay.com', 'ebay buy'];
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(500)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keywords[index % keywords.length],
    kd: kd[index % kd.length],
    cpc: cpc[index % cpc.length],
    vol: vol[index % vol.length],
  }));

const Demo = ({
  mode,
  useCustomBuffer,
  rowsBuffer,
  aproxRowsOnPage,
  rowHeight,
}: VirtualScrollControlsProps = virtualScrollControlsDefaultProps) => {
  const buffer = useCustomBuffer ? rowsBuffer : undefined;

  const virtualScroll =
    mode === 'boolean'
      ? true
      : mode === 'rowHeight'
        ? (buffer !== undefined ? { rowHeight, rowsBuffer: buffer } : { rowHeight })
        : mode === 'rowsBufferOnly'
          ? { rowsBuffer: buffer }
          : (buffer !== undefined ? { rowsBuffer: buffer, aproxRowsOnPage } : { aproxRowsOnPage });

  return (
    <DataTable
      data={data}
      totalRows={data.length}
      aria-label='Virtual scroll controls'
      h={400}
      virtualScroll={virtualScroll}
      headerProps={{ sticky: true }}
      columns={[
        { name: 'id', children: 'ID', gtcWidth: '60px' },
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
        { name: 'kd', children: 'KD %' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.' },
      ]}
    />
  );
};

export default Demo;
