import { DataTable, type DataTableSort } from '@semcore/ui/data-table';
import React from 'react';

export type DemoProps = {
  fixedColumns?: boolean;
};

const baseData = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `Row ${index + 1}`,
}));

const extendedData = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `Row ${index + 1}`,
  kd: `${(Math.random() * 100).toFixed(1)}`,
  cpc: `$${(Math.random() * 10).toFixed(2)}`,
  vol: `${Math.floor(Math.random() * 100000)}`,
}));

const baseColumns = [
  { name: 'id', children: 'ID', sortable: true },
  { name: 'name', children: 'Name', sortable: true },
];

const fixedColumns = [
  { name: 'id', children: 'ID', sortable: true, fixed: 'left' as const, gtcWidth: '100px' },
  { name: 'name', children: 'Name', sortable: true, gtcWidth: '200px' },
  { name: 'kd', children: 'KD %', sortable: true, gtcWidth: '150px' },
  { name: 'cpc', children: 'CPC', sortable: true, gtcWidth: '150px' },
  { name: 'vol', children: 'Vol.', sortable: true, fixed: 'right' as const, gtcWidth: '120px' },
];

const Demo = ({ fixedColumns: useFixedColumns = false }: DemoProps) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<DataTableSort<'id' | 'name' | 'kd' | 'cpc' | 'vol'>>();

  return (
    <div className='App'>
      <DataTable
        aria-label='Table'
        columns={useFixedColumns ? fixedColumns : baseColumns}
        data={useFixedColumns ? extendedData : baseData}
        hMax={400}
        w={useFixedColumns ? '500px' : undefined}
        headerProps={{ sticky: true }}
        sort={sort}
        selectedRows={selectedRows}
        onSortChange={setSort}
        onSelectedRowsChange={setSelectedRows}
      />
    </div>
  );
};

export const defaultProps: DemoProps = {
  fixedColumns: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
