import { Box } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  return (
    <Box w='99%'>
      <DataTable
        data={data}
        aria-label='Fixed columns'
        w='100%'
        hMax={400}
        headerProps={{ sticky: true }}
        columns={[
          {
            name: 'keyword',
            children: 'keyword',
            gtcWidth: '100px',
            fixed: 'left',
          },
          {
            name: 'kd',
            children: 'KD %',
            gtcWidth: '100px',
          },
          {
            name: 'cpc',
            children: 'CPC',
            gtcWidth: '100px',
          },
          {
            name: 'vol',
            children: 'Vol.',
            gtcWidth: '100px',
            fixed: 'right',
          },
        ]}
      />
    </Box>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
];

export default Demo;

export const App = () => <Demo />;
