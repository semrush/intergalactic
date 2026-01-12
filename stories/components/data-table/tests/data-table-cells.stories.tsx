import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CardFlagInCellExample from './examples/cells-tests/card-flag-in-cell';
import CheckBoxExample from './examples/cells-tests/checkbox';
import CheckboxInTableWithNoDataExample from './examples/cells-tests/checkbox-in-table-with-no-data';
import DDSelectInCellExample from './examples/cells-tests/dd-select-in-cell';
import InteractiveCellsExample from './examples/cells-tests/interactive-elements-in-cells';
import LongTextCellsExample from './examples/cells-tests/long-text-in-cells';
import MergedRowForMultiLevelHeaderExample from './examples/cells-tests/merged-row-for-multi-level-header';
import MiniChartsInlineEditInCellsExample from './examples/cells-tests/mini-chart-inline-edit-in-cell';
import OneBigMergedRowAndScrollExample from './examples/cells-tests/one-big-merged-row-and-scroll';
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

export const CheckBox: Story = {
  render: CheckBoxExample,
};

export const CheckboxInTableWithNoData: Story = {
  render: CheckboxInTableWithNoDataExample,
};

export const MergedRowForMultiLevelHeader: Story = {
  render: MergedRowForMultiLevelHeaderExample,
};

export const MiniChartsInlineEditInCells: Story = {
  render: MiniChartsInlineEditInCellsExample,
};

export const OneMergedCell: Story = {
  render: OneMergedCellExample,
};

export const OneBigMergedRowAndScroll: Story = {
  render: OneBigMergedRowAndScrollExample,
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
