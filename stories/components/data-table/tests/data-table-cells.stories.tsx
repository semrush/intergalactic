import { DataTable } from '@semcore/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardFlagInCellExample from './examples/cells-tests/card-flag-in-cell';
import CheckBoxExample from './examples/cells-tests/checkbox';
import DDSelectInCellExample from './examples/cells-tests/dd-select-in-cell';
import InteractiveCellsExample from './examples/cells-tests/interactive-elements-in-cells';
import LongTextCellsExample from './examples/cells-tests/long-text-in-cells';
import MiniChartsInCellsExample from './examples/cells-tests/mini-chart-inline-edit-in-cell';
import MergedScrolledRowExample from './examples/cells-tests/one-big-merged-row-and-scroll';
import OneMergedCellExample from './examples/cells-tests/one-merged-cell';
import RenderCellRawValueExample from './examples/cells-tests/render-cell-raw-data';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Cells',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const CardFlagInCell: Story = {
  render: CardFlagInCellExample,
};

export const CheckBox: Story = {
  render: CheckBoxExample,
};

export const RenderCellRawValue: Story = {
  render: RenderCellRawValueExample,
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
