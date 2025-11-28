import figma from '@figma/code-connect/react';
import DataTable from '@semcore/ui/data-table';


// DataTable example with initial loading state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-14998&t=ZOAFIVpfMAWydBLA-4',
    {
      example: () => (
        <DataTable
        {{/* Refer to the DataTable example with Initial loading in the documentation */}}
        />
      ) },
  );

// DataTable example with loading state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-16065&t=ZOAFIVpfMAWydBLA-4',
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
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-18452&t=ZOAFIVpfMAWydBLA-4',
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
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=2898-3040&t=ZOAFIVpfMAWydBLA-4',
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
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-19610&t=ZOAFIVpfMAWydBLA-4',
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
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-20094&t=ZOAFIVpfMAWydBLA-4',
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
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-20409&t=ZOAFIVpfMAWydBLA-4',
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
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7005-20636&t=ZOAFIVpfMAWydBLA-4',
    {
      example: () => (
        <DataTable />
      ) },
  );