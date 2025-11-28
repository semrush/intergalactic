import figma from '@figma/code-connect/react';
import DataTable from '@semcore/ui/data-table';

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=110-46851&',
  {
    example: () => (
      <DataTable
        data={/* Add your data here */}
        use='secondary'
        sort={/* Add your sort settings here */}
        aria-label='/* Add your aria-label here */'
        columns={/* Add your columns here */}
      />
    ) },
);
