import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

const Demo = () => {
  return (
    <DataTable
      data={[]}
      renderEmptyData={() => (
        <NoData type='nothing-found' my={7} mx='auto'>
          <Button mt={4}>Clear filters</Button>
        </NoData>
      )}
      aria-label='Empty table example'
      defaultGridTemplateColumnWidth='auto'
      wMax='800px'
      headerProps={{
        sticky: true,
      }}
      columns={[
        {
          name: 'keyword',
          children: 'keyword',
        },
        {
          name: 'kd',
          children: 'KD %',
        },
        {
          name: 'cpc',
          children: 'CPC',
        },
        {
          name: 'hiddenColumn',
          children: 'HC',
        },
        {
          name: 'vol',
          children: 'Vol.',
        },
      ]}
    />
  );
};

export default Demo;
