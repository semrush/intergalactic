import type { BoxProps } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type WithFixedColumnProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky?: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  multiLevel?: boolean;
} & BoxProps;

const oneLevelColumns = [
  { name: 'keyword', children: 'Keyword', fixed: 'left' as const, gtcWidth: '150px' },
  { name: 'kd', children: 'KD,%', fixed: 'left' as const, gtcWidth: '200px' },
  { name: 'kd2', children: 'KD,%', gtcWidth: '200px' },
  { name: 'cpc', children: 'CPC', gtcWidth: '300px' },
  { name: 'cpc2', children: 'CPC', gtcWidth: '100px' },
  { name: 'vol', children: 'Vol.', gtcWidth: '80px', fixed: 'right' as const },
];

const multiLevelColumns = [
  {
    name: 'group1',
    children: 'Borders right Fixed left',
    borders: 'right' as const,
    fixed: 'left' as const,
    columns: [
      { name: 'keyword', children: 'Keyword', gtcWidth: '150px' },
      { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
    ],
  },
  { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
  { name: 'cpc2', children: 'CPC', gtcWidth: '250px' },
  { name: 'vol', children: 'Vol.', gtcWidth: '100px', fixed: 'right' as const },
];

const Demo = (props: WithFixedColumnProps) => {
  const columns = props.multiLevel ? multiLevelColumns : oneLevelColumns;

  return (
    <DataTable
      data={data}
      aria-label={props.multiLevel ? 'Fixed multi level header with fixed columns' : 'Fixed columns'}
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
  );
};

const data = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290' },
];

export const defaultProps: WithFixedColumnProps = {
  sideIndents: undefined,
  use: undefined,
  compact: false,
  h: '300px',
  wMax: '600px',
  defaultGridTemplateColumnWidth: 'auto',
  loading: undefined,
  sticky: true,
  withScrollBar: false,
  multiLevel: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
