import figma from '@figma/code-connect/react';
import DataTable from '@semcore/ui/data-table';


// DataTable example with initial loading state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7070-10401&',
    {
      example: () => (
        <DataTable
        use='secondary'
        sort={/* Add your sort settings here */}
        aria-label='/* Add your aria-label here */'
        columns={/* Add your columns here */}
        {{/* Refer to the DataTable example with Initial loading in the documentation */}}
        />
      ) },
  );

// DataTable example with No data state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7070-13974&',
    {
      example: () => (
        <DataTable
        use='secondary'
        sort={/* Add your sort settings here */}
        aria-label='/* Add your aria-label here */'
        columns={/* Add your columns here */}
        {{/* Refer to the DataTable example with Empty state in the documentation */}}
        />
      ) },
  );

// DataTable example with Nothing found state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7070-14079&',
    {
      example: () => (
        <DataTable
        use='secondary'
        sort={/* Add your sort settings here */}
        aria-label='/* Add your aria-label here */'
        columns={/* Add your columns here */}
        {{/* Refer to the DataTable example with Empty state in the documentation */}}
        />
      ) },
  );

  // DataTable example with Error state

figma.connect(
    DataTable,
    'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=7070-14184&',
    {
      example: () => (
        <DataTable
        use='secondary'
        sort={/* Add your sort settings here */}
        aria-label='/* Add your aria-label here */'
        columns={/* Add your columns here */}
        {{/* Refer to the DataTable example with Empty state in the documentation */}}
        />
      ) },
  );
