import type { BoxProps } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData, DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type FixedColumnScrollExampleProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;
} & BoxProps;

const Demo = (props: FixedColumnScrollExampleProps) => {
  return (
    <>

      <DataTable
        data={data}
        aria-label='Fixed columns'
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
        columns={[
          { name: 'keyword', children: 'Keyword', fixed: 'left', gtcWidth: '150px' },
          { name: 'kd', children: 'KD,%', fixed: 'left', gtcWidth: '200px' },
          { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '300px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '100px' },
          { name: 'vol', children: 'Vol.', gtcWidth: '80px', fixed: 'right' },
        ]}
      />

    </>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export const fixedColumnScrollExampleProps: FixedColumnScrollExampleProps = {
  sideIndents: undefined,
  use: undefined,
  compact: false,
  h: undefined,
  wMax: '600px',
  defaultGridTemplateColumnWidth: 'auto',
  loading: undefined,
  sticky: true,
  withScrollBar: false,
};

Demo.defaultProps = fixedColumnScrollExampleProps;

export default Demo;
