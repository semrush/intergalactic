import type { NSBox } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type ScrollInTableProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky?: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  multiLevel?: boolean;
} & NSBox.Props;

const flatColumns = [
  { name: 'keyword', children: 'Keyword' },
  { name: 'kd', children: 'KD,%' },
  { name: 'cpc', children: 'CPC' },
  { name: 'vol', children: 'Vol.' },
];

const flatColumnsFixed = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
  { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
  { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(20px, 50px)' },
  { name: 'vol', children: 'Vol.', gtcWidth: '100px' },
];

const multiLevelColumns = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '150px' },
  {
    name: 'group1',
    children: 'Organic Sessions',
    borders: 'both' as const,
    columns: [
      { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
      { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(100px, 150px)' },
      { name: 'vol', children: 'Vol.', gtcWidth: '100px' },
    ],
  },
];

const multiLevelColumnsFixed = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
  {
    name: 'group1',
    children: 'Organic Sessions',
    borders: 'both' as const,
    columns: [
      { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
      { name: 'cpc', children: 'CPC', gtcWidth: '80px' },
      { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
    ],
  },
];

const Demo = (props: ScrollInTableProps) => {
  const columns = props.multiLevel ? multiLevelColumns : flatColumns;
  const columnsFixed = props.multiLevel ? multiLevelColumnsFixed : flatColumnsFixed;
  const label = props.multiLevel ? 'Multi-level' : 'One-level';

  return (
    <Flex direction='column' gap={4}>
      <DataTable
        data={data}
        aria-label={`${label} scroll`}
        defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
        use={props.use}
        compact={props.compact}
        sideIndents={props.sideIndents}
        loading={props.loading}
        wMax={props.wMax}
        h={props.h}
        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
        }}
        columns={columns}
      />

      <DataTable
        data={data}
        aria-label={`${label} scroll with fixed column width`}
        defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
        use={props.use}
        compact={props.compact}
        sideIndents={props.sideIndents}
        loading={props.loading}
        wMax={props.wMax}
        h={props.h}
        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
        }}
        columns={columnsFixed}
      />
    </Flex>
  );
};

const data = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
];

export const defaultProps: ScrollInTableProps = {
  sideIndents: undefined,
  use: undefined,
  compact: false,
  h: '200px',
  wMax: '800px',
  defaultGridTemplateColumnWidth: 'auto',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
  multiLevel: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
