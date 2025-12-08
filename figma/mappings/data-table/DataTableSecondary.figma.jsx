import figma from '@figma/code-connect/react';
import DataTable from '@semcore/ui/data-table';

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactored---%E2%9C%A8-Table-components?node-id=7144-8914&',
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
