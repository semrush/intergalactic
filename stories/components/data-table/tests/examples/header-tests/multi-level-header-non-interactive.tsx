import AmazonM from '@semcore/icon/color/Amazon/m';
import type { BoxProps } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type MultiLevelNonInteractiveProps = {
  compact?: DataTableProps<typeof data, any, any>['compact'];
  use?: DataTableProps<typeof data, any, any>['use'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;

} & BoxProps;

const columns = [
  { name: 'other', children: 'Other' },
  {
    name: 'group1',
    children: 'Group',
    columns: [
      {
        name: 'kd',
        children: (
          <Flex gap={2} alignItems='center'>
            <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </Flex>
        ),

      },
      { name: 'cpc', children: 'CPC' },
      { name: 'vol', children: 'Vol.' },

    ],
  },

  { name: 'keyword', children: 'Keyword' },
];

const Demo = (props: MultiLevelNonInteractiveProps) => {
  return (
    <>
      <DataTable
        data={data}
        aria-label='Multi level header non interactive'
        defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
        compact={props.compact}
        sideIndents={props.sideIndents}
        loading={props.loading}
        wMax={props.wMax}
        h={props.h}
        use={props.use}

        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
        }}
        columns={columns}
      />
    </>
  );
};
export const multiLevelNonInteractiveProps: MultiLevelNonInteractiveProps = {
  sideIndents: undefined,
  compact: undefined,
  h: '100%',
  wMax: '800px',
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
  use: 'primary',

};
Demo.defaultProps = multiLevelNonInteractiveProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'xs',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'xs',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'www.ebay.com',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'm',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'xxl',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
];

export default Demo;
