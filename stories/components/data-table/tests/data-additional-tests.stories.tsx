
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import PerformanceTestExample from './examples/additional-tests/performmance-tooltips-ellipsis-test';
import PerformanceBaseTestExample from './examples/additional-tests/base-huge';
import ColoredMergedCellsExample from './examples/additional-tests/colored-merged-cells';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/AdditionalTests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const PerformanceTest: Story = {
  render: PerformanceTestExample,
};

export const PerformanceBaseTest: Story = {
  render: PerformanceBaseTestExample,
};


export const ColoredMergedCellsColumns: Story = {
  render: ColoredMergedCellsExample,
};