import React from 'react';
import { DataTable } from '@semcore/data-table';

const data = [
    {
      'keyword/kd/cpc/vol': 'One merged ',
    },
  ];
  const Demo = () => {
    return (
      <DataTable
        data={data}
        // @ts-ignore
        sort={['keyword', 'desc']}
        aria-label="Sorting"
        columns={[
          { name: 'keyword', children: 'Keyword', sortable: true },
          { name: 'kd', children: 'KD,%', sortable: true },
          { name: 'cpc', children: 'CPC', sortable: true },
          { name: 'vol', children: 'Vol.', sortable: true },
        ]}
      />
    );
};

export default Demo;
