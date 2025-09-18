import type { DataTableData } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import { Text } from '@semcore/typography';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import React from 'react';

export type LimitedModeExampleProps = {
  limitedRows?: number;
  limitedColumns?: number;
};

const Demo = (props: LimitedModeExampleProps) => {
  const { limitedRows, limitedColumns } = props;

  return (
    <DataTable
      data={data}
      aria-label='Limited table example'
      defaultGridTemplateColumnWidth='auto'
      wMax='800px'
      limit={{
        fromRow: limitedRows,
        fromColumn: limitedColumns,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
              <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
              <Text size={200} textAlign='center'>
                To increase your daily report limit,upgrade to a Guru plan.
              </Text>
              <Button
                theme='success'
                use='primary'
              >
                Upgrade to Guru
              </Button>
            </Flex>
          );
        },
      }}
      headerProps={{
        sticky: true,
      }}
      columns={[
        {
          name: 'keyword',
          children: 'Keyword',
        },
        {
          name: 'kd',
          children: 'KD %',
        },
        {
          name: 'cpc',
          children: 'CPC',
        },
        {
          name: 'hiddenColumn',
          children: 'Empty',
        },
        {
          name: 'vol',
          children: 'Vol.',
        },
      ]}
    />
  );
};

const data: DataTableData = [
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
    kd: null,
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: '$0',
    vol: '21,644,290',
  },
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
    kd: null,
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

export const limitedModeDefaultProps: LimitedModeExampleProps = {
  limitedRows: 3,
  limitedColumns: undefined,
};

Demo.defaultProps = limitedModeDefaultProps;

export default Demo;
