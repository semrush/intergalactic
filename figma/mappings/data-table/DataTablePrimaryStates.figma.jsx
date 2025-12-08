import figma from '@figma/code-connect/react';
import DataTable from '@semcore/ui/data-table';


// DataTable example with initial loading state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-14998&',
    {
      example: () => (
        <DataTable
        {{/* Refer to the DataTable example with Initial loading in the documentation */}}
        />
      ) },
  );

  // DataTable example with ProgressBar

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactored---%E2%9C%A8-Table-components?node-id=7005-15646&',
  {
    example: () => (
      <DataTable />
    ) },
);

// DataTable example with loading state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-16065&',
    {
      example: () => (
        <DataTable
        {{/* Refer to the DataTable example with Updating table in the documentation */}}
        />
      ) },
  );

// DataTable example with limited data

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-18452&',
    {
      example: () => (
        <DataTable
        limit={/* Add your limit block here */}
        {{/* Refer to the DataTable example with Limited data in the documentation */}}
        />
      ) },
  );

// Limit overlay

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=2898-3040&',
    {
      example: () => (
        <DataTable
        limit={/* Add your limit block here */}
        {{/* Refer to the DataTable example with Limited data in the documentation */}}
        />
      ) },
  );


// DataTable example with No data state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-19610&',
    {
      example: () => (
        <DataTable
        {{/* Refer to the DataTable example with Empty state in the documentation */}}
        />
      ) },
  );

// DataTable example with Nothing found state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-20094&',
    {
      example: () => (
        <DataTable
        {{/* Refer to the DataTable example with Empty state in the documentation */}}
        />
      ) },
  );

  // DataTable example with Error state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-20409&',
    {
      example: () => (
        <DataTable
        {{/* Refer to the DataTable example with Empty state in the documentation */}}
        />
      ) },
  );

    // DataTable example with Empty message

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-20636&',
    {
      example: () => (
        <DataTable />
      ) },
  );