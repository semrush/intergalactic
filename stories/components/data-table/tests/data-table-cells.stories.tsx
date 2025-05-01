
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';





import InteractiveCellsExample from './examples/cells-tests/interactive-elements-in-cells';
import DDSelectInCellExample from './examples/cells-tests/dd-select-in-cell';
import LongTextCellsExample from './examples/cells-tests/long-text-in-cells';
import MergedScrolledRowExample from './examples/cells-tests/one-big-merged-row-and-scroll';
import OneMergedCellExample from './examples/cells-tests/one-merged-cell';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Cells',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;


export const OneMergedCell: Story = {
  render: OneMergedCellExample,
};

export const MergedScrolledRow: Story = {
  render: MergedScrolledRowExample,
};

export const DDSelectInCell: Story = {
  render: DDSelectInCellExample,
};

export const LongTextCells: Story = {
  render: LongTextCellsExample,
};

export const InteractiveCells: Story = {
  render: InteractiveCellsExample,
};
