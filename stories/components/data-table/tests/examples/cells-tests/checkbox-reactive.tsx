import { DataTable, SelectableRows } from '@semcore/ui/data-table';
import React from 'react';

const data = Array.from({ length: 50 }).map((_, index) => ({
  id: String(index + 1),
  name: `Row ${index + 1}`,
}));

const columns = [
  { name: 'id', children: 'ID' },
  { name: 'name', children: 'Name' },
];

const selectedRows = new SelectableRows<string>();

const Demo = () => {
  return (
    <div className='App'>
      <DataTable
        aria-label='Table'
        columns={columns}
        data={data}
        hMax={400}
        headerProps={{ sticky: true }}
        selectedRows={selectedRows}
        uniqueRowKey='id'
      />
    </div>
  );
};

export default Demo;
