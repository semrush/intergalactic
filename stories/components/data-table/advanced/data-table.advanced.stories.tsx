import { DataTable } from '@semcore/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccordionInMergedRowsExample, { accordionMergedProps } from './examples/accordion_in_merged_rows';
import AccordionWithStickyRowsExample, { accordionStickyProps } from './examples/accordion_with_sticky_rows';
import BigTableWithStickyHeaderExample from './examples/big_table_with_sticky_header';
import FakeMultiLineHeaderExample from './examples/fake-multi-level-header';
import FixedColumnsWithDiffWidthsExample from './examples/fixed_columns_with_diff_widths';
import LinkInTableExample from './examples/link_in_table';
import OverflowInCellsExample from './examples/overflow_in_cells';
import OverlapCellsExample from './examples/overlap_cells';
import RenderCellRawValueExample from './examples/render_cell_raw_data';
import RowCellStatesExample from './examples/row_cell_states';
import SideIndentsExample from './examples/side-indents';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Advanced',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const AccordionInMergedRows: StoryObj<typeof accordionMergedProps> = {
  render: AccordionInMergedRowsExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: accordionMergedProps,
};

export const AccordionWithStickyRows: StoryObj<typeof accordionStickyProps> = {
  render: AccordionWithStickyRowsExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: accordionStickyProps,
};

export const BigTableWithStickyHeader: Story = {
  render: BigTableWithStickyHeaderExample,
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

export const OverflowInCells: Story = {
  render: OverflowInCellsExample,
};

export const OverlapCells: Story = {
  render: OverlapCellsExample,
};

export const FakeMultiLineHeader: Story = {
  render: FakeMultiLineHeaderExample,
};

export const RenderCellRawValue: Story = {
  render: RenderCellRawValueExample,
};
