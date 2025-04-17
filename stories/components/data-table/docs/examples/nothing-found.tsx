import React from 'react';
import { DataTable } from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';
import Button from '@semcore/button';

const data = [
  {
    'keyword/kd/cpc/vol': '',
  },
];

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Empty table example'}>
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Keyword' />
        <DataTable.Head.Column name='kd' children='KD,%' />
        <DataTable.Head.Column name='cpc' children='CPC' />
        <DataTable.Head.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body
        renderCell={() => (
          <NoData type='nothing-found' my={7} mx='auto'>
            <Button mt={4}>Clear filters</Button>
          </NoData>
        )}
      />
    </DataTable>
  );
};

export default Demo;
