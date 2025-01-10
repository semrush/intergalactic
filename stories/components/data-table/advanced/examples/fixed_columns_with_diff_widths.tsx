import React from 'react';
import DataTable from '@semcore/data-table';
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
      <DataTable data={data}>
        <DataTable.Head>
          <DataTable.Column
            vBorders
            wMax={100}
            w={100}
            name='col_1'
            children='Column 1'
            fixed='left'
          />
          <DataTable.Column vBorders wMax={100} w={100} name='col_2' children='Column 2' />
          <DataTable.Column vBorders wMax={100} w={100} name='col_3' children='Column 3' />
          <DataTable.Column vBorders wMax={100} w={100} name='col_4' children='Column 4' />
          <DataTable.Column vBorders wMax={100} w={100} name='col_5' children='Column 5' />
          <DataTable.Column vBorders wMax={100} w={100} name='col_6' children='Column 6' />
          <DataTable.Column vBorders wMax={100} w={100} name='col_7' children='Column 7' />
          <DataTable.Column
            vBorders
            wMax={75}
            w={75}
            name='col_8'
            children='Column 8'
            fixed='right'
          />
          <DataTable.Column
            vBorders
            wMax={125}
            w={125}
            name='col_9'
            children='Column 9'
            fixed='right'
          />
          <DataTable.Column
            vBorders
            wMax={100}
            w={100}
            name='col_10'
            children='Column 10'
            fixed='right'
          />
        </DataTable.Head>
        <DataTable.Body />
      </DataTable>
    </Box>
  );
}
