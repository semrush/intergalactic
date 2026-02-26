import figma from '@figma/code-connect/react';
import { Box } from '@semcore/ui/base-components';
import DataTable from '@semcore/ui/data-table';

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=3089-153990&',
  {
    variant: { 'action bar': 'false', 'built with': 'autolayout' },
    example: () => (
      <DataTable
        data={/* Add your data here */}
        aria-label='/* Add your aria-label here */'
        wMax='/* Add your wMax here */'
        headerProps={/* Add your headerProps here */}
        columns={/* Add your columns here */}
      />
    ) },
);

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=3089-153990&',
  {
    variant: { 'action bar': 'true', 'built with': 'autolayout' },

    example: () => (
      <>
        <Box
          // need this for FF
          tabIndex={-1}
          wMax={800}
          h={250}
          style={{ overflow: 'auto', scrollPaddingTop: selectedRows.length ? '44px' : undefined }}
        >
          {/* Add  ScreenReaderOnly component for the action bar here, refer to the Checkboxes and action bar example in the documentation */}
          {/* Add Collapse component for the action bar here, refer to the Checkboxes and action bar example in the documentation */}
          <DataTable
            data={/* Add your data here */}
            aria-label='/* Add your aria-label here */'
            selectedRows={/* Add your selectedRows here */}
            onSelectedRowsChange={/* Add your onSelectedRowsChange here */}
            ref={/* Add your ref here */}
            sideIndents={/* Add your sideIndents here */}
            loading={/* Add your loading here */}
            compact={/* Add your compact here */}
            headerProps={/* Add your headerProps here */}
            columns={/* Add your columns here */}
            uniqueRowKey={/* Add your uniqueRowKey here */}
          />
        </Box>
      </>
    ) },
);

// DataTable for Cards

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=3089-153990&',
  {
    variant: { 'built with': 'autolayout (card layout)' },
    example: () => (
      <DataTable
        data={/* Add your data here */}
        aria-label='/* Add your aria-label here */'
        variant='card'
        columns={/* Add your columns here */}
      />
    ) },
);

figma.connect(
  DataTable,
  'https://www.figma.com/design/hwYZpLVEg6TU1AFwpBvYXA/-Refactoring-WIP---%E2%9C%A8-Table-components?node-id=3089-153990&',
  {
    variant: { 'built with': 'grid (card layout)' },
    example: () => (
      <DataTable
        data={/* Add your data here */}
        aria-label='/* Add your aria-label here */'
        variant='card'
        columns={/* Add your columns here */}
      />
    ) },
);
