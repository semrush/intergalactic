import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Box } from '@semcore/flex-box';

const generateData = () =>
  Array.from({ length: 20 }, (_, i) => ({
    col_1: i,
    col_2: i,
    col_3: i,
    col_4: i,
    col_5: i,
    col_6: i,
    col_7: i,
    col_8: i,
    col_9: i,
    col_10: i,
  }));

export default function App() {
  const [data] = React.useState(generateData);

  return (
    <Box w={800}>
      <DataTable data={data} aria-label={'Table with fixed columns'} w={'700px'}
        columns={[
            {name: 'col_1', children: 'Column 1', fixed: 'left', borders: 'both', gtcWidth: '100px'},
            {name: 'col_2', children: 'Column 2', borders: 'both', gtcWidth: '100px'},
            {name: 'col_3', children: 'Column 3', borders: 'both', gtcWidth: '100px'},
            {name: 'col_4', children: 'Column 4', borders: 'both', gtcWidth: '100px'},
            {name: 'col_5', children: 'Column 5', borders: 'both', gtcWidth: '100px'},
            {name: 'col_6', children: 'Column 6', borders: 'both', gtcWidth: '100px'},
            {name: 'col_7', children: 'Column 7', borders: 'both', gtcWidth: '100px'},

            {name: 'col_8', children: 'Column 8', fixed: 'right', borders: 'both', gtcWidth: '75px'},
            {name: 'col_9', children: 'Column 9', fixed: 'right', borders: 'both', gtcWidth: '125px'},
            {name: 'col_10', children: 'Column 10', fixed: 'right', borders: 'both', gtcWidth: '100px'},
        ]}
      />
    </Box>
  );
}
