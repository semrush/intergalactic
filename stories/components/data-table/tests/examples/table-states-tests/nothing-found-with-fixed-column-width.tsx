import Button from '@semcore/button';
import { DataTable } from '@semcore/data-table';
import { Box } from '@semcore/ui/base-components';
import { NoData } from '@semcore/widget-empty';
import React from 'react';

const data = [
  {
    'keyword/kd/cpc/vol': '',
  },
];

const Demo = () => {
  return (
    <Box w='100vw' position='absolute' left={0} top={0}>
      <DataTable
        data={[]}
        aria-label='Empty table example'
        w='100%'
        columns={[
          { name: 'keyword', children: 'keyword', gtcWidth: 'minmax(150px, 1fr)' },
          { name: 'kd', children: 'KD,%', gtcWidth: 'minmax(150px, 1fr)' },
          { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(150px, 1fr)' },
          { name: 'vol', children: 'Vol.', gtcWidth: 'minmax(150px, 1fr)' },
        ]}
        renderEmptyData={() => (
          <NoData type='nothing-found' my={7} mx='auto'>
            <Button mt={4}>Clear filters</Button>
          </NoData>
        )}
      />
    </Box>
  );
};

export default Demo;
