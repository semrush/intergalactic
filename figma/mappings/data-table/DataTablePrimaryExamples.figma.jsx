import figma from '@figma/code-connect/react';
import DataTable from '@semcore/ui/data-table';

// DataTable example with Multi-level header

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=110-46948',
  {
    example: () => (
      // Refer to the DataTable example with Multi-level header in the documentation
      <DataTable />
    ) },
);

// DataTable example with Accordion

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=110-46492',
  {
    example: () => (
      // Refer to the DataTable example with Accordion in table in the documentation
      <DataTable />
    ) },
);

// DataTable example with horizontal scroll

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=110-46562',
  {
    example: () => (
      // Refer to the DataTable example for Header in the documentation
      <DataTable />
    ) },
);

// Simple DataTable example with several lines of text

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=110-46567',
  {
    example: () => (
      <DataTable
        data={/* Add your data here */}
        aria-label='/* Add your aria-label here */'
        defaultGridTemplateColumnWidth='auto'
        wMax='/* Add your wMax here */'
        headerProps={/* Add your headerProps here */}
        columns={/* Add your columns here */}
      />
    ) },
);

// DataTable example with fixed column

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactored---%E2%9C%A8-Table-components?node-id=7139-16321',
  {
    example: () => (
      // Refer to the DataTable example for Fixed column in the documentation
      <DataTable />
    ) },
);
