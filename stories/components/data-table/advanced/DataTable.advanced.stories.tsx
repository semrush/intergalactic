import type { Meta, StoryObj } from '@storybook/react';

import {DataTable } from '@semcore/data-table';

import FixedColumnsWithDiffWidthsExample from './examples/fixed_columns_with_diff_widths';
import LinkInTableExample from './examples/link_in_table';
import RowCellStatesExample from './examples/row_cell_states';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Advanced',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FixedColumnsWithDiffWidths: Story = {
  render: FixedColumnsWithDiffWidthsExample,
};

export const LinkInTable: Story = {
  render: LinkInTableExample,
};

export const RowCellStates: Story = {
  render: RowCellStatesExample,
};
