
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import InteractiveCellsExample from './examples/cells-tests/interactive-elements-in-cells';
import MiniChartsInCellsExample from './examples/cells-tests/mini-chart-inline-edit-in-cell';
import CardFlagInCellExample from './examples/cells-tests/card-flag-in-cell';

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

export const CardFlagInCell: Story = {
  render: CardFlagInCellExample,
};

export const MiniChartsInCells: Story = {
  render: MiniChartsInCellsExample,
};

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
