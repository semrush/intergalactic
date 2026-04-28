import { Box } from '@semcore/ui/base-components';
import { ACCORDION, DataTable } from '@semcore/ui/data-table';
import React, { useState } from 'react';

function App() {
  const [width, setWidth] = useState('100%');
  const [numRows, setNumRows] = useState(1);
  const [numColumns, setNumColumns] = useState(5);

  const safeNumColumns = Math.max(numColumns, 1);
  const safeNumRows = Math.max(numRows, 1);

  const variableColumns = arr(safeNumColumns, (i) => ({
    key: `variable_${i}`,
    children: `Variable Column ${i}`,
    name: `group${i}`,
    columns: [
      { name: `variable_${i}_a`, children: 'A' },
      { name: `variable_${i}_b`, children: 'B' },
    ],
  }));

  const columns = [
    {
      name: 'first',
      children: 'First, fixed',
      fixed: 'left' as const,
      gtcWidth: '480px',
    },
    ...variableColumns,
    {
      name: 'last',
      children: 'Last',
      fixed: 'right' as const,
      gtcWidth: 'minmax(180px, 1fr)',
    },
  ];

  const data = arr(safeNumRows, (i) => ({
    first: `Contents of the first column, row ${i}`,
    ...obj(safeNumColumns, (j) => [`variable_${j}_a`, `A${i}${j}`]),
    ...obj(safeNumColumns, (j) => [`variable_${j}_b`, `B${i}${j}`]),
    last: 'Last column',
    [ACCORDION]: <>Disclosed row content.</>,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <button onClick={() => setNumColumns((c) => Math.max(c - 1, 1))}>-</button>
        <button onClick={() => setNumColumns((c) => c + 1)}>+</button>
        Columns (
        {safeNumColumns}
        )
      </div>
      <div>
        <button onClick={() => setNumRows((c) => Math.max(Math.floor(c / 2), 1))}>-</button>
        <button onClick={() => setNumRows((c) => c * 2)}>+</button>
        Rows (
        {safeNumRows}
        )
      </div>
      <div>
        <select value={width} onChange={(e) => setWidth(e.target.value)}>
          <option value='100%'>🚫 w="100%"</option>
          <option value='calc(100%)'>✅ w="calc(100%)"</option>
        </select>
      </div>

      <Box
        p={4}
        h={800}
        style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          resize: 'both',
          overflow: 'auto',
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          headerProps={{
            sticky: true,
            withScrollBar: true,
          }}
          w={width}
          h='100%'
          defaultGridTemplateColumnWidth={'minmax(120px, 1fr)' as 'auto'}
          aria-label=''
        />
      </Box>
    </div>
  );
}

function arr<A>(n: number, fn: (i: number) => A): Array<A> {
  return Array.from({ length: n }, (_, i) => fn(i));
}

function obj<A>(n: number, fn: (i: number) => [string, A]): Record<string, A> {
  return Object.fromEntries(arr(n, fn));
}

export default App;
