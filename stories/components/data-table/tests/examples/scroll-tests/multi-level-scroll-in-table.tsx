import type { BoxProps } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData, DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type MultiLevelScrollIntableProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;
} & BoxProps;

const Demo = (props: MultiLevelScrollIntableProps) => {
  return (
    <Flex direction='column' gap={4}>

      <DataTable
        data={data}
        aria-label='Fixed multi level header scroll'
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
          { name: 'keyword', children: 'Keyword', gtcWidth: '150px' },
          {
            name: 'group1',
            children: 'Organic Sessions',
            borders: 'both',
            columns: [
              { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
              { name: 'cpc', children: 'CPC' },
              { name: 'vol', children: 'Vol.' },
            ],
          },
        ]}
      />

      <DataTable
        data={data}
        aria-label='Fixed multi level header  with fixed column width'
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
          { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
          {
            name: 'group1',
            children: 'Organic Sessions',
            borders: 'both',
            columns: [
              { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
              { name: 'cpc', children: 'CPC', gtcWidth: '80px' },
              { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
            ],
          },
        ]}
      />

    </Flex>
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

];

export const multiLevelScrollIntableProps: MultiLevelScrollIntableProps = {
  sideIndents: undefined,
  use: undefined,
  compact: false,
  h: '200px',
  wMax: '800px',
  defaultGridTemplateColumnWidth: 'auto',
  loading: undefined,
  sticky: true,
  withScrollBar: false,
};

Demo.defaultProps = multiLevelScrollIntableProps;

export default Demo;
