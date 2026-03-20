import { DataTable, SelectableRows } from '@semcore/ui/data-table';
import React from 'react';

export type DemoProps = {
  fixedColumns?: boolean;
};

const data = Array.from({ length: 50 }).map((_, index) => ({
  id: String(index + 1),
  name: `Row ${index + 1}`,
  kd: `${(Math.random() * 100).toFixed(1)}`,
  cpc: `$${(Math.random() * 10).toFixed(2)}`,
  vol: `${Math.floor(Math.random() * 100000)}`,
}));

const selectedRows = new SelectableRows<string>();

const Demo = ({ fixedColumns = false }: DemoProps) => {
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

  return (
    <div className='App'>
      <DataTable
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
};

Demo.defaultProps = defaultProps;

export default Demo;
