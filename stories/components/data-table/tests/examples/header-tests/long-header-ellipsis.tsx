import AmazonM from '@semcore/icon/color/Amazon/m';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import type { NSBox } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type LongHeaderEllipsisProps = {
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;
} & NSBox.Props;
const columns = [
  {
    name: 'keyword', gtcWidth: '65px', sortable: true,
    children: (
      <Text ellipsis:cropPosition='middle'>
        Keyword
        <Text color='text-secondary'>(Keyword 1-100)</Text>
      </Text>
    ),
  },
  {
    name: 'kd',
    gtcWidth: '85px',
    children: (
      <Text>
        Difficulty Difficlty 123
        <ButtonLink size={100} addonLeft={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
        <ButtonLink size={100} addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
      </Text>
    ),
  },
  {
    name: 'cpc', gtcWidth: '85px',
    children: (
      <>
        <Text ellipsis={true}>Difficulty Difficulty</Text>
        <ButtonLink size={100} addonLeft={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
        <ButtonLink size={100} addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
      </>
    ),
  },
  { name: 'cpc', gtcWidth: '90px', children: 'CPC CPC CPC CPC CPC' },
  { name: 'vol', children: 'Vol.', gtcWidth: 'minmax(0, 300px)' },
  {
    name: 'md',
    gtcWidth: '90px',
    children: (
      <Text>
        Marketing SEO
        <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
      </Text>
    ),
  }, {
    name: 'md',
    gtcWidth: '90px',
    children: (
      <Text>
        Marketing SEO
        <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
      </Text>
    ),
  },
];
const Demo = (props: LongHeaderEllipsisProps) => {
  return (

    <>
      <DataTable
        data={data}
        aria-label='Header with different content'
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

    </>
  );
};

export const longHeaderEllipsisProps: LongHeaderEllipsisProps = {
  sideIndents: undefined,
  use: undefined,
  compact: false,
  h: undefined,
  wMax: '600px',
  defaultGridTemplateColumnWidth: 'auto',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
};

Demo.defaultProps = longHeaderEllipsisProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    md: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    md: '221',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    md: '221',
  },
];

export default Demo;
