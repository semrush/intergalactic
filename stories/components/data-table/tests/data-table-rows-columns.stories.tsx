import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ColumnAlignmentExample from './examples/rows-columns-tests/column-alignment';
import ColumnExpandExample from './examples/rows-columns-tests/column-expand';
import RowColumnMergeExample from './examples/rows-columns-tests/row-and-column-merging';

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

export const ColumnExpand: Story = {
  render: ColumnExpandExample,
};
