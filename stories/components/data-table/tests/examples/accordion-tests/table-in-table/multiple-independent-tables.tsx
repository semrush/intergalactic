import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import React from 'react';

// Mocked data for nested tables
const nestedData1 = [
  { id: 1, name: 'Nested Item 1.1', count: 5 },
  { id: 2, name: 'Nested Item 1.2', count: 8 },
  { id: 3, name: 'Nested Item 1.3', count: 3 },
];

const nestedData2 = [
  { id: 1, name: 'Nested Item 2.1', count: 12 },
  { id: 2, name: 'Nested Item 2.2', count: 6 },
];

const nestedData3 = [
  { id: 1, name: 'Nested Item 3.1', count: 15 },
  { id: 2, name: 'Nested Item 3.2', count: 9 },
  { id: 3, name: 'Nested Item 3.3', count: 4 },
];

// Nested table component
const NestedTable = ({ data }: { data: Array<{ id: number; name: string; count: number }> }) => {
  return (
    <DataTable
      aria-label='Nested Table'
      use='secondary'
      data={data}
      columns={[
        {
          name: 'name',
          children: 'Name',
        },
        {
          name: 'count',
          children: 'Count',
          justifyContent: 'flex-end',
        },
      ]}
    />
  );
};

// Main component with accordion
const MultipleIndependentTablesExample = () => {
  // Mocked data for parent table with accordion content
  const data = [
    {
      id: 1,
      name: 'Item 1',
      count: 10,
      [ACCORDION]: <NestedTable data={nestedData1} />,
    },
    {
      id: 2,
      name: 'Item 2',
      count: 20,
      [ACCORDION]: <NestedTable data={nestedData2} />,
    },
    {
      id: 3,
      name: 'Item 3',
      count: 30,
      [ACCORDION]: <NestedTable data={nestedData3} />,
    },
  ];

  const columns = [
    {
      name: 'name',
      children: 'Name',
    },
    {
      name: 'count',
      children: 'Count',
      justifyContent: 'flex-end' as const,
    },
  ];

  return (
    <DataTable
      aria-label='Parent Table'
      data={data}
      columns={columns}
      accordionMode='toggle'
      headerProps={{ sticky: true, top: 0 }}
    />
  );
};

export default MultipleIndependentTablesExample;
