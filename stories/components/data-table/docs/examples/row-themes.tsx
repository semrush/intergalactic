import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Box } from '@semcore/flex-box';

const styles = ['success', 'info', 'muted', 'warning', 'danger'];

const Demo = () => {
  const [data] = React.useState(generateData);

  return (
    <Box wMax={800}>
      <DataTable
        data={data}
        aria-label={'Example with themed rows'}
        columns={[
          { name: 'col_1', children: 'Theme', gtcWidth: '100px' },
          { name: 'col_2', children: 'Column 2', gtcWidth: '100px' },
          { name: 'col_3', children: 'Column 3', gtcWidth: '100px' },
          { name: 'col_4', children: 'Column 4', gtcWidth: '100px' },
          { name: 'col_5', children: 'Column 5', gtcWidth: '100px' },
        ]}
        // @ts-ignore
        rowProps={(_, index) => {
          return {
            theme: styles[index],
          };
        }}
      />
    </Box>
  );
};

const generateData = () =>
  Array.from({ length: 5 }, (_, i) => ({
    col_1: styles[i],
    col_2: i,
    col_3: i,
    col_4: i,
    col_5: i,
  }));

export default Demo;
