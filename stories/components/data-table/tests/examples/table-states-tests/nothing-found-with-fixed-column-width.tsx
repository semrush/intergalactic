import { Box } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

const Demo = () => {
  return (
    <Box w='100%' position='absolute' left={0}>
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
