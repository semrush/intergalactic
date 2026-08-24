import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const columns = [
  { name: 'breed', children: 'Dog breed', fixed: 'left' as const, gtcWidth: 'max-content' },
  { name: 'id', children: 'ID', fixed: 'left' as const, gtcWidth: 'max-content' },

  { name: 'c1', children: 'Column 1', gtcWidth: '200px' },
  { name: 'c2', children: 'Column 2', gtcWidth: '200px' },
  { name: 'c3', children: 'Column 3', gtcWidth: '200px' },
  { name: 'c4', children: 'Column 4', gtcWidth: '200px' },
  { name: 'c5', children: 'Column 5', gtcWidth: '200px' },
  { name: 'c6', children: 'Column 6', gtcWidth: '200px' },
];

const makeData = (breed: string) =>
  Array.from({ length: 8 }, (_, i) => ({
    breed,
    id: `ID-${1000 + i}`,
    c1: 'some value 1',
    c2: 'some value 2',
    c3: 'some value 3',
    c4: 'some value 4',
    c5: 'some value 5',
    c6: 'some value 6',
  }));

const SHORT_DATA = makeData('Pug');
const LONG_DATA = makeData('Cavalier King Charles Spaniel');

const Demo = () => {
  const [long, setLong] = React.useState(false);
  const data = long ? LONG_DATA : SHORT_DATA;

  return (
    <Flex direction='column' gap={5} w={600}>
      <Box>
        <Button onClick={() => setLong((v) => !v)}>
          {long ? 'Restore short content' : 'Make the first column wider'}
        </Button>
      </Box>

      <Box>
        <DataTable
          data={data}
          columns={columns}
          aria-label='Stable columns identity — stale offset'
          w='100%'
        />
      </Box>
    </Flex>
  );
};
export default Demo;
