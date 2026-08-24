import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const SHORT_HEADER = 'Breed';
const LONG_HEADER = 'Dog breed — a much longer header that widens the column';

const data = Array.from({ length: 8 }, (_, i) => ({
  breed: 'Pug',
  id: `ID-${1000 + i}`,
  c1: 'some value 1',
  c2: 'some value 2',
  c3: 'some value 3',
  c4: 'some value 4',
  c5: 'some value 5',
  c6: 'some value 6',
}));

const Demo = () => {
  const [wide, setWide] = React.useState(false);
  const [rerenderCount, setRerenderCount] = React.useState(0);
  const columns = [
    {
      name: 'breed',
      children: wide ? LONG_HEADER : SHORT_HEADER,
      fixed: 'left' as const,
      gtcWidth: 'max-content',
    },
    { name: 'id', children: 'ID', fixed: 'left' as const, gtcWidth: 'max-content' },

    { name: 'c1', children: 'Column 1', gtcWidth: '200px' },
    { name: 'c2', children: 'Column 2', gtcWidth: '200px' },
    { name: 'c3', children: 'Column 3', gtcWidth: '200px' },
    { name: 'c4', children: 'Column 4', gtcWidth: '200px' },
    { name: 'c5', children: 'Column 5', gtcWidth: '200px' },
    { name: 'c6', children: 'Column 6', gtcWidth: '200px' },
  ];

  return (
    <Flex direction='column' gap={5} w={600}>
      <Flex gap={2}>
        <Button onClick={() => setWide((value) => !value)}>
          {wide ? 'Shrink the first column' : 'Widen the first column'}
        </Button>
        <Button onClick={() => setRerenderCount((value) => value + 1)}>
          Force re-render ({rerenderCount})
        </Button>
      </Flex>

      <Box>
        <DataTable
          data={data}
          columns={columns}
          aria-label='Changing columns identity — offset measured before commit'
          w='100%'
        />
      </Box>
    </Flex>
  );
};
export default Demo;
