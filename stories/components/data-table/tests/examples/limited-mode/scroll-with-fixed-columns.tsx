import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type FixedColumnDiffWidthProps = {
  rowsLimit?: number;
  columnsLimit?: number;
};
const Demo = (props: FixedColumnDiffWidthProps) => {
  const { rowsLimit, columnsLimit } = props;

  return (
    <>

      <DataTable
        data={data}
        aria-label='Fixed columns'
        wMax={700}
        h={300}
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

export const fixedColumnDiffWidthProps: FixedColumnDiffWidthProps = {
  columnsLimit: 1,
  rowsLimit: 1,
};

Demo.defaultProps = fixedColumnDiffWidthProps;

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

export default Demo;
