import type { Meta, StoryObj } from '@storybook/react';

import DataTable from '@semcore/data-table';

import FixedColumnsWithDiffWidthsExample from './examples/fixed_columns_with_diff_widths';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Advanced',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const FixedColumnsWithDiffWidths: Story = {
  render: FixedColumnsWithDiffWidthsExample,
};
