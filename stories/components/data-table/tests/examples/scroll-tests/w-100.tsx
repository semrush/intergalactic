import { ACCORDION, DataTable } from '@semcore/data-table';
import React, { useState } from 'react';

function App() {
  const [width, setWidth] = useState('100%');
  const [numRows, setNumRows] = useState(1);
  const [numColumns, setNumColumns] = useState(5);

  const variableColumns = arr(numColumns, (i) => ({
    key: `variable_${i}`, // Comment out to see React complaining about dupe empty keys
    children: `Variable Column ${i}`,
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

  const data = arr(numRows, (i) => ({
    first: `Contents of the first column, row ${i}`,
    ...obj(numColumns, (j) => [`variable_${j}_a`, `A${i}${j}`]),
    ...obj(numColumns, (j) => [`variable_${j}_b`, `B${i}${j}`]),
    last: 'Last column',
    [ACCORDION]: <>Disclosed row content.</>,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <button onClick={() => setNumColumns((c) => c - 1)}>-</button>
        <button onClick={() => setNumColumns((c) => c + 1)}>+</button>
        Columns
      </div>
      <div>
        <button onClick={() => setNumRows((c) => Math.max(c / 2, 1))}>-</button>
        <button onClick={() => setNumRows((c) => c * 2)}>+</button>
        Rows
      </div>
      <div>
        <select onChange={(e) => setWidth(e.target.value)}>
          <option value='100%'>🚫 w="100%"</option>
          {/* Other values like '100.0%', work fine as well, just not the literal '100%' */}
          <option value='calc(100%)'>✅ w="calc(100%)"</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={data}
        headerProps={{
          sticky: true,
          withScrollBar: true,
        }}
        w={width}
        defaultGridTemplateColumnWidth={'minmax(120px, 1fr)' as 'auto'}
        aria-label=''
      />
    </div>
  );
}

function arr<A>(n: number, fn: (i: number) => A): Array<A> {
  return Array(n)
    .fill(0)
    .map((_, i) => fn(i));
}

function obj<A>(n: number, fn: (i: number) => [string, A]): Record<string, A> {
  return Object.fromEntries(arr(n, fn));
}

export default App;
