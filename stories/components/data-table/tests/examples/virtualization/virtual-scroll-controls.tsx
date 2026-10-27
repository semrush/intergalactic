import { Box } from '@semcore/ui/base-components';
import { ACCORDION, DataTable, ROW_GROUP } from '@semcore/ui/data-table';
import React from 'react';

export type VirtualScrollMode = 'boolean' | 'aproxRowsOnPage' | 'rowHeight' | 'rowsBufferOnly';

export type VirtualScrollControlsProps = {
  mode: VirtualScrollMode;
  useCustomBuffer: boolean;
  rowsBuffer: number;
  aproxRowsOnPage: number;
  rowHeight: number;
  withAccordion: boolean;
  withMergedRows: boolean;
};

export const virtualScrollControlsDefaultProps: VirtualScrollControlsProps = {
  mode: 'aproxRowsOnPage' as VirtualScrollMode,
  useCustomBuffer: true,
  rowsBuffer: 20,
  aproxRowsOnPage: 20,
  rowHeight: 45,
  withAccordion: false,
  withMergedRows: false,
};

declare global {
  interface Window {
    __dtRenders?: number;
    __dtRowRenders?: Record<string, number>;
  }
}

const keywords = ['ebay buy', 'www.ebay.com', 'ebay buy'];
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const getRow = (index: number) => ({
  id: `#${index + 1}`,
  keyword: keywords[index % keywords.length],
  kd: kd[index % kd.length],
  cpc: cpc[index % cpc.length],
  vol: vol[index % vol.length],
});

// every 10th row: #3, #13, ... has an accordion with a 300px component; #6, #16, ... is a group of 3 merged rows
const getData = (withAccordion: boolean, withMergedRows: boolean) =>
  Array(500)
    .fill(0)
    .map((_, index) => {
      const row = getRow(index);

      if (withAccordion && index % 10 === 2) {
        return {
          ...row,
          [ACCORDION]: <Box h={300} p={4}>Accordion content {row.id}, 300px</Box>,
        };
      }

      if (withMergedRows && index % 10 === 5) {
        return {
          id: row.id,
          keyword: row.keyword,
          [ROW_GROUP]: [index, index + 1, index + 2].map((i) => ({ kd: kd[i % kd.length], cpc: cpc[i % cpc.length], vol: vol[i % vol.length] })),
        };
      }

      return row;
    });

const Demo = ({
  mode,
  useCustomBuffer,
  rowsBuffer,
  aproxRowsOnPage,
  rowHeight,
  withAccordion,
  withMergedRows,
}: VirtualScrollControlsProps = virtualScrollControlsDefaultProps) => {
  const data = React.useMemo(() => getData(withAccordion, withMergedRows), [withAccordion, withMergedRows]);
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
      // counts row renders for data-table-performance browser tests
      renderCell={(props) => {
        if (props.columnName === 'id') {
          const rowId = String(props.row.id);
          window.__dtRenders = (window.__dtRenders ?? 0) + 1;
          window.__dtRowRenders = window.__dtRowRenders ?? {};
          window.__dtRowRenders[rowId] = (window.__dtRowRenders[rowId] ?? 0) + 1;
        }

        return props.defaultRender();
      }}
    />
  );
};

export default Demo;
