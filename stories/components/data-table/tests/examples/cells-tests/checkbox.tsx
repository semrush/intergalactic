import { DataTable, type DataTableSort } from '@semcore/data-table';
import React from 'react';

const data = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `Row ${index + 1}`,
}));

const columns = [
  { name: 'id', children: 'ID', sortable: true },
  { name: 'name', children: 'Name', sortable: true },
];

const Demo = () => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<DataTableSort<'id' | 'name'>>();

  return (
    <div className='App'>
      <DataTable
        aria-label='Table'
        columns={columns}
        data={data}
        hMax={400}
        headerProps={{ sticky: true }}
        sort={sort}
        selectedRows={selectedRows}
        onSortChange={setSort}
        onSelectedRowsChange={setSelectedRows}
      />
    </div>
  );
};

export default Demo;
