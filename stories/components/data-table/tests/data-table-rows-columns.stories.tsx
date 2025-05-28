
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';


import RowColumnMergeExample from './examples/rows-columns-tests/row-and-column-merging';
import ColumnAlignmentExample from './examples/rows-columns-tests/column-alignment';
import DefaultColumnWidthsExample from './examples/rows-columns-tests/column-expand';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Rows-Columns',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;


export const RowColumnMerge: Story = {
  render: RowColumnMergeExample,
};

export const ColumnAlignment: Story = {
  render: ColumnAlignmentExample,
};

export const DefaultColumnWidth: Story = {
  render: DefaultColumnWidthsExample,
};