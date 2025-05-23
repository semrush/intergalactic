import type { Meta, StoryObj } from '@storybook/react';

import {DataTable } from '@semcore/data-table';

import AccordionInMergedRowsExample from './examples/accordion_in_merged_rows';
import FixedColumnsWithDiffWidthsExample from './examples/fixed_columns_with_diff_widths';
import LinkInTableExample from './examples/link_in_table';
import RowCellStatesExample from './examples/row_cell_states';
import SideIndentsExample from './examples/side-indents';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Advanced',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const AccordionInMergedRows: Story = {
  render: AccordionInMergedRowsExample,
};

export const FixedColumnsWithDiffWidths: Story = {
  render: FixedColumnsWithDiffWidthsExample,
};

export const LinkInTable: Story = {
  render: LinkInTableExample,
};

export const RowCellStates: Story = {
  render: RowCellStatesExample,
};

export const SideIndents: Story = {
  render: SideIndentsExample,
};
