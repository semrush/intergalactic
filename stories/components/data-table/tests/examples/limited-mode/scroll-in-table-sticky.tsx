import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type ScrollInTableProps = {
  loading?: boolean;
  rowsLimit?: number;
  columnsLimit?: number;
};

const Demo = (props: ScrollInTableProps) => {
  const { rowsLimit, columnsLimit } = props;

  return (
    <DataTable
      data={data}
      aria-label='Scroll inside'
      wMax={800}
      hMax={200}
      limit={{
        fromRow: rowsLimit,
        fromColumn: columnsLimit,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
              <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
              <Text size={200} textAlign='center'>
                To increase your daily report limit,upgrade to a Guru plan.
              </Text>
            </Flex>
          );
        },
      }}
      loading={props.loading}
      headerProps={{ sticky: true, withScrollBar: true }}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '300px' },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '400px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
      ]}
    />
  );
};
export const scrollInTableProps: ScrollInTableProps = {
  columnsLimit: 0,
  rowsLimit: 1,
  loading: undefined,
};

Demo.defaultProps = scrollInTableProps;
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
];

export default Demo;
