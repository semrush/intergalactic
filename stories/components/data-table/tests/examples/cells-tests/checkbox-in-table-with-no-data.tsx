import { DataTable } from '@semcore/data-table';
import React from 'react';

const Demo = () => {
  return (
    <>
      <DataTable
        data={[]}
        aria-label='Table example with selectable rows'
        defaultGridTemplateColumnWidth='auto'
        selectedRows={[]}
        columns={[
          { name: 'keyword', children: 'Keyword' },
          { name: 'kd', children: 'KD %' },
          { name: 'cpc', children: 'CPC' },
          { name: 'vol', children: 'Vol.' },
        ]}
        uniqueRowKey='id'
      />
    </>
  );
};

export default Demo;
