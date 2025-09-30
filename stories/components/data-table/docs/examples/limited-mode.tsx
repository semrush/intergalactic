import { Text } from '@semcore/typography';
import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import React from 'react';

export type LimitedModeExampleProps = {
  rowsLimit?: number;
  columnsLimit?: number;
};

const Demo = (props: LimitedModeExampleProps) => {
  const { rowsLimit, columnsLimit } = props;

  return (
    <DataTable
      data={data}
      aria-label='Limited table example'
      defaultGridTemplateColumnWidth='auto'
      wMax='800px'
      limit={{
        fromRow: rowsLimit,
        fromColumn: columnsLimit,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320} style={{ textWrap: 'balance' }}>
              <Text size={300} fontWeight='bold' textAlign='center' id='limited_rows_title'>You've reached your report limit for today</Text>
              <Text size={200} textAlign='center' id='limited_rows_description'>
                To increase your daily report limit,upgrade to a Guru plan.
              </Text>
              <Button
                theme='success'
                use='primary'
                aria-describedby='limited_rows_title limited_rows_description'
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
  rowsLimit: 3,
  columnsLimit: undefined,
};

Demo.defaultProps = limitedModeDefaultProps;

export default Demo;
