import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, SelectableRows } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';
export type DemoProps = {
  fixedColumns?: boolean;
  limitMode?: boolean;
  rowsLimit?: number;
  columnsLimit?: number;
};

const data = Array.from({ length: 50 }).map((_, index) => ({
  id: String(index + 1),
  name: `Row ${index + 1}`,
  kd: `${(Math.random() * 100).toFixed(1)}`,
  cpc: `$${(Math.random() * 10).toFixed(2)}`,
  vol: `${Math.floor(Math.random() * 100000)}`,
}));

const selectedRows = new SelectableRows<string>();

const Demo = (props: DemoProps) => {
  const { rowsLimit, columnsLimit, fixedColumns, limitMode } = props;

  const columns = fixedColumns
    ? [
        { name: 'id', children: 'ID', fixed: 'left' as const, gtcWidth: '100px' },
        { name: 'name', children: 'Name', gtcWidth: '200px' },
        { name: 'kd', children: 'KD %', gtcWidth: '150px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
        { name: 'vol', children: 'Vol.', fixed: 'right' as const, gtcWidth: '120px' },
      ]
    : [
        { name: 'id', children: 'ID' },
        { name: 'name', children: 'Name' },
      ];

  const limit = limitMode
    ? {
        fromRow: rowsLimit,
        fromColumn: columnsLimit,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
              <Text size={300} fontWeight='bold' textAlign='center'>
                You've reached your report limit for today
              </Text>
              <Text size={200} textAlign='center'>
                To increase your daily report limit, upgrade to a Guru plan.
              </Text>
              <Button theme='success' use='primary'>
                Upgrade to Guru
              </Button>
              <Button theme='success' use='primary'>
                Upgrade to Guru
              </Button>
            </Flex>
          );
        },
      }
    : undefined;

  return (
    <div className='App'>
      <DataTable
        limit={limit}
        aria-label='Table'
        columns={columns}
        data={data}
        hMax={400}
        w={fixedColumns ? '500px' : undefined}
        headerProps={{ sticky: true }}
        selectedRows={selectedRows}
        uniqueRowKey='id'
      />
    </div>
  );
};

export const defaultProps: DemoProps = {
  fixedColumns: false,
  limitMode: false,
  columnsLimit: 1,
  rowsLimit: 1,
};

Demo.defaultProps = defaultProps;

export default Demo;
