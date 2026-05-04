import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import PerformanceBaseTestExample from './examples/additional-tests/base-huge';
import ColoredMergedCellsExample from './examples/additional-tests/colored-merged-cells';
import PerformanceTestExample from './examples/additional-tests/performmance-tooltips-ellipsis-test';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/AdditionalTests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const PerformanceTest: Story = {
  render: PerformanceTestExample,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const PerformanceBaseTest: Story = {
  render: PerformanceBaseTestExample,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const ColoredMergedCellsColumns: Story = {
  render: ColoredMergedCellsExample,
};
