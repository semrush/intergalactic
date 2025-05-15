import React from 'react';
import { DataTable, DataTableSort } from '@semcore/data-table';

type DataRow = {
  keyword: string;
  kd: string;
  cpc: string;
  vol: string;
};


type SortableColumn = Exclude<keyof DataRow, never>; 

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof DataRow>>(['keyword', 'desc']);

  return (
    <DataTable
      data={[]}
      sort={sort}
     
      aria-label="Sorting"
      columns={[
        { name: 'keyword', children: 'Keyword', sortable: true },
        { name: 'kd', children: 'KD,%', sortable: true },
        { name: 'cpc', children: 'CPC', sortable: true },
        { name: 'vol', children: 'Vol.' },
      ]}
    />
  );
};

export default Demo;
