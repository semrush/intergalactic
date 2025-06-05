import Button from '@semcore/button';
import { DataTable } from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';
import React from 'react';

const data = [
  {
    'keyword/kd/cpc/vol': '',
  },
];

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Empty table example'
      columns={[
        { name: 'keyword', children: 'keyword' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.' },
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
