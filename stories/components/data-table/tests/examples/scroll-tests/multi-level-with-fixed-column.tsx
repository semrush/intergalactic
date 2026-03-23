import type { BoxProps } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData, DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type FixedColumnMultiLevelScrollExampleProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;
} & BoxProps;

const Demo = (props: FixedColumnMultiLevelScrollExampleProps) => {
  return (
    <>

      <DataTable
        data={data}
        aria-label='Fixed multi level header with 1 scroll'
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
          {
            name: 'group1',
            children: 'Borders right Fixed left',
            borders: 'right',
            fixed: 'left',
            columns: [
              { name: 'keyword', children: 'Keyword', gtcWidth: '150px' },
              { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
            ],
          },
          { name: 'cpc', children: 'CPC', gtcWidth: '350px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '350px' },

          {
            name: 'group2',
            children: 'Borders left Fixed right',
            borders: 'left',
            fixed: 'right',
            columns: [
              { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
              { name: 'vol1', children: 'Vol.', gtcWidth: '150px' },

            ],
          },
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

export const fixedColumnMultiLevelScrollExampleProps: FixedColumnMultiLevelScrollExampleProps = {
  sideIndents: undefined,
  use: undefined,
  compact: false,
  h: '300px',
  wMax: '800px',
  defaultGridTemplateColumnWidth: 'auto',
  loading: undefined,
  sticky: true,
  withScrollBar: false,
};

Demo.defaultProps = fixedColumnMultiLevelScrollExampleProps;

export default Demo;
