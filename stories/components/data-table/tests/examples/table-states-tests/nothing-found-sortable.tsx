import React from 'react';
import { NoData } from '@semcore/widget-empty';
import Button from '@semcore/button';
import { DataTable, DataTableSort } from '@semcore/data-table';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;
const data = [
    {
      'keyword/kd/cpc/vol': '',
    },
  ];

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['keyword/kd/cpc/vol','desc']);

  return (

    <DataTable  data={[]} sort={sort}  aria-label={'Sorting'}
    columns={[
        {name: 'keyword', children: 'keyword', sortable: true},
        {name: 'kd', children: 'KD,%', sortable: true},
        {name: 'cpc', children: 'CPC', sortable: true},
        {name: 'vol', children: 'Vol.'}
    ]}
    renderCell={() => (
      <NoData type='nothing-found' my={7} mx='auto'>
        <Button mt={4}>Clear filters</Button>
      </NoData>
    )}
  />
  );
};

export default Demo;
