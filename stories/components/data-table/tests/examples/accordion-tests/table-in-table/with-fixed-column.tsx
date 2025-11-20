import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import React from 'react';

export type TableInTableFixedColumnProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  variant?: DataTableProps<typeof data, any, any>['variant'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar: boolean;
};
const Demo = (props: TableInTableFixedColumnProps) => {
  return (
    <DataTable
      data={data}
      aria-label='Parent'
      accordionMode={props.accordionMode}
      headerProps={{ sticky: props.sticky, withScrollBar: props.withScrollBar }}

      variant={props.variant}
      loading={props.loading}
      use={props.use}
      compact={props.compact}
      onAccordionToggle={(type, rowIndex) => {
        console.log(`Accordion ${type} for row #${rowIndex}`);
      }}
      h={200}
      w={400}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left' },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
      ]}
    />
  );
};

export const tableInTableFixedColumnDefaultProps: TableInTableFixedColumnProps = {
  accordionMode: 'independent',
  variant: undefined,
  use: undefined,
  compact: undefined,
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  withScrollBar: false,
  sticky: false,
};

Demo.defaultProps = tableInTableFixedColumnDefaultProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
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
    ],
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    [ACCORDION]: [
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
    ],
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

export default Demo;
